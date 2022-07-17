---
layout: post
title: Modern data warehouse patterns. ELT with Snowflake variants  
category: article
author: biellls
tags:
    - typhoon
    - Snowflake
    - Modern data stack
    - article
    - ETL

heading-bg: https://res.cloudinary.com/practicaldev/image/fetch/s--HQh30rs7--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/o1zxpq2orcx5c727lul4.jpeg
heading-bg-local: false
heading-bg-color: "#FFF"
heading-bg-text: "#000"
heading-bg-repeat: "no-repeat"

---
#### Table of contents
- TOC
{:toc}

## Leveraging semi-structured data for resilience against schema changes

As data warehouse technologies get cheaper and better, ELT is gaining momentum over ETL. In this article we will show you how to leverage Snowflake's semi-structured data to build integrations that are highly resistant to changes in schema while staying performant. Schema changes are one of the most common things that can break a data pipeline (adding and removing fields, changes in types or length of the data etc.) so it is extremely useful to protect yourself against them.

## Real world example- Personal information

Let's assume we have a table with basic information about our clients. The goal is to load the information into snowflake unchanged.

| name    | surname  | age |
|---------|----------|-----|
| Anne    | Houston  | 38  |
| John    | Doe      | 22  |
| William | Williams | 27  |

We would usually create the following table in Snowflake:

```sql
CREATE TABLE clients (name VARCHAR, surname VARCHAR, age NUMBER);
```

Notice how we don't specify the varchar's length or the number's precision and scale. This is preferable because snowflake will automatically use the minimum size needed to store the data efficiently, and if the source system changes the length of a varchar, or the precision of a number your flows won't break. An exception is when a number has decimals we will need to specify a precision and scale.

But if we do that, our integration will fail if a field is removed, and if a field is added we won't notice. We are not resilient to schema changes. To solve that we will instead create a table with just one variant field where we will load all the data, no matter what fields it has.

```sql
CREATE TABLE clients_raw (src VARIANT);
```

In order to load the data we can dump it as JSON into a stage.

```sql
CREATE OR REPLACE FILE FORMAT json_format TYPE = JSON;
CREATE OR REPLACE STAGE mystage FILE_FORMAT = json_format;
```

Let's create a file with some JSON data to load into the table. Run the following in a shell:

```bash
echo '{"name": "Anne", "surname": "Houston", "age": 37}' > /tmp/data.json
echo '{"name": "John", "surname": "Doe", "age": 21}' >> /tmp/data.json
echo '{"name": "William", "surname": "Williams", "age": 26}' >> /tmp/data.json
```

Next we run this in snowflake to upload the data to a stage and then load the data into the table:

```sql
put file:///tmp/data.json @mystage
COPY INTO clients_raw FROM @mystage/data.json FILE_FORMAT = json_format;
```

We can now query the data as:

```sql
SELECT min(src:age) as age from clients_raw;
```

### Creating a view

It is easy to query the data, but it can be verbose and a little confusing to analysts who have never worked with unstructured data. In order to make it transparent to the end user we can create a view that turns it into structured data.

```sql
CREATE VIEW clients AS
SELECT
src:name::VARCHAR AS name,
src:surname::VARCHAR AS surname,
src:age::NUMERIC AS age
FROM clients_raw;
```

The same query from before would now be:

```sql
SELECT min(age) as age from clients;
```

And now it's indistinguishable from a structured table from the user’s point of view.

### Removing a column, adding a column

Suppose that database admins realized that storing age in a column is not ideal, since it needs to be updated every time a client has a birthday. Instead he decides to drop the age column and store a date with their birthday. The new table is as follows:

| name    | surname  | birthday   |
|---------|----------|------------|
| Anne    | Houston  | 1984-03-12 |
| John    | Doe      | 2000-01-03 |
| William | Williams | 1995-02-04 |

Let's create the new data:

```bash
echo '{"name": "Anne", "surname": "Houston", "birthday": "1984-03-12"}' > /tmp/data.json
echo '{"name": "John", "surname": "Doe", "birthday": "2000-01-03"}' >> /tmp/data.json
echo '{"name": "William", "surname": "Williams", "birthday": "1995-02-04"}' >> /tmp/data.json
```

We would usually append the data, but to make this tutorial simple we will just replace the old data with the new one.

```sql
TRUNCATE TABLE clients_raw;
COPY INTO clients_raw FROM @mystage/data.json FILE_FORMAT = json_format;
put file:///tmp/data.json @mystage;
```

Since we store all available data as a variant our integration will not break. The view would not break either, but the age would show as null (try `SELECT * FROM clients`). The only thing we need to do to take advantage of the new field is to update the view. For backwards compatibility we will still include the age as a calculation.

```sql
CREATE OR REPLACE VIEW clients AS
SELECT
src:name::VARCHAR as name,
src:surname::VARCHAR as surname,
src:birthday::DATE as birthday,
DATEDIFF('years', src:birthday, CURRENT_DATE()) as age
FROM clients_raw;
```

That's it, our pipelines never broke and there’s no need to change our data flows or source table definitions!

If a new field gets added to the table and no one notices it's still getting staged into snowflake in the variant so the moment someone requests the field in the view we'll be able to see it, without needing to backfill the data.

### Doesn't this take up more space than regular tables? Isn't it slower to query?

This excerpt from [Snowflake's docs](https://docs.snowflake.com/en/user-guide/semistructured-considerations.html#storing-semi-structured-data-in-a-variant-column-vs-flattening-the-nested-structure) answers the question:

> For data that is mostly regular and uses only native types (strings and integers), the storage requirements and query performance for operations on relational data and data in a VARIANT column is very similar.
For better pruning and less storage consumption, we recommend flattening your object and key data into separate relational columns if your semi-structured data includes:

- Dates and timestamps, especially non-ISO 8601dates and timestamps, as string values
- Numbers within strings
- Arrays

Non-native values such as dates and timestamps are stored as strings when loaded into a VARIANT column, so operations on these values could be slower and also consume more space than when stored in a relational column with the corresponding data type.
>

So in terms of performance and storage it should be really similar albeit a little slower. An exception would be if we need to query the birthday because it's stored as a string, as we will see in the following section.

### Improving performance

Because variants store dates as strings, they are not as efficient to filter by. This is only an issue if the table is large and you intend to query the table by that date. Let's see an example of how to improve performance in that case:

```sql
CREATE OR REPLACE TABLE clients_raw (src VARIANT, birthday DATE);
COPY INTO clients_raw FROM (
select
$1 as src,
to_date($1:birthday)::DATE AS birthday
FROM @mystage/data.json
) FILE_FORMAT = json_format;
```

And modify the view:

```sql
CREATE OR REPLACE VIEW clients
SELECT
src:name::VARCHAR as name,
src:surname::VARCHAR as surname,
birthday,     // <-- We changed this to get the column directly
DATEDIFF('years', birthday, CURRENT_DATE()) as age  // <-- Here too
FROM clients_raw;
```

Now queries filtering by birthday (or getting `MAX(birthday)` for example) will be much faster.

## What is the best way to load the data?

The most efficient way to load the data into a table is by using a COPY command since Snowflake can optimize a bulk load. It can't do that with insert statements. Here are some of the most popular ways to load the data into snowflake, each with their advantges and disadvantages:

- CSV: A gzipped CSV is the fastest way to load structured data into snowflake. It takes more space than parquet. It can also be loaded into a variant column with the right casting (see example later). The data can not be loaded easily into a variant.
- JSON: Can be easily loaded into a variant, but it takes a lot of space in your data lake.
- Avro: Built-in schema, easily loaded into a variant or into a structured table. Takes more space than parquet.
- Parquet: Columnar storage that has a better compression than the other options and can easily be loaded into a structured or unstructured table. It is slower than CSV to load into a structured table.

## Bottom Line

Loading data into Snowflake using this method is a great way to save you a lot of headaches and minimise data pipeline failures. It is a good rule of thumb to always use this method unless you will be loading an extremely large amount of data and need the extra 20% performance that a  structured table will give you. If you decide to create a structured table instead of using this method be aware that the pipelines will break on any schema change.

## What are the best tools to load data like this?

Any ETL/ELT tool that is flexible enough, for instance Airflow can be adapted to use this method. You can also check out our ETL tool, [Typhoon](/), that encourages this pattern and other modern best practices for data engineering.

## Sources

[https://www.snowflake.com/wp-content/uploads/2015/06/Snowflake_Semistructured_Data_WP_1_0_062015.pdf](https://www.snowflake.com/wp-content/uploads/2015/06/Snowflake_Semistructured_Data_WP_1_0_062015.pdf)

[https://docs.snowflake.com/en/user-guide/semistructured-considerations.html#storing-semi-structured-data-in-a-variant-column-vs-flattening-the-nested-structure](https://docs.snowflake.com/en/user-guide/semistructured-considerations.html#storing-semi-structured-data-in-a-variant-column-vs-flattening-the-nested-structure)