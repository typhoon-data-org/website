---
layout: post
title: Why Typhoon?  
category: article
author: biellls
tags:
    - typhoon
    - serverless
    - article
    - history

heading-img: https://raw.githubusercontent.com/typhoon-data-org/typhoon-orchestrator/main/docs/img/readme_montage.gif
heading-img-local: true
heading-bg-color: "#FFF"
heading-bg-text: "#000"

---

# History of Typhoon 

Long before I ever wrote the first line of code, the kernel of the idea that would eventually grow into Typhoon had been planted in my mind. It was 2017 and I was working as a data engineer in a large travel tech company. We were working with almost every kind of data engineering project you can imagine:
- batch processes using Hadoop on Amazon EMR, AWS Lambdas
- moving gigabytes of data per hour on real time workflows with Spark, Kinesis and Kafka
- visual tools like Talend and Data Services
- landing data in an S3 data lake
- ingesting into cloud data warehouse like Redshift and eventually Snowflake. 

Throughout all this change, one thing remained constant though: **Airflow**.

Airflow remained in heavy use since the beginning and it proved to be the most versatile tool in our toolbox. We ended up using it to orchestrate all of our flows except for the few real time ones. The ability to easily write ETL/ELT in Python which was increasingly becoming the language of data, coupled with good visualization and monitoring capabilities was hard to beat. And yet for all its strengths, I still found myself frequently wondering if there could be a better way to do things.

# Is there a better way than Airflow? 

After giving it much thought and having many lunch time conversations with my coworkers I became convinced that all my issues with Airflow stemmed from the same root cause: task isolation. What in theory looked like a good thing endes up hindering good software practices. When tasks don't share data, separation of concerns is not possible. This means that what should be two separate tasks, like for example reading from a source and writing to a destination, end up coupled into a single one. This greatly minimizes the reusability of your operators. Worse than that, it forces your DAG structure to be static, and we found more than a few use cases that needed dynamic workflows forcing us to work around Airflow's limitations. One thing I did know from the beginning is that whatever framework eventually replaces Airflow (if any) needs to be open source and easy to extend in python.

Drawing inspiration from Golang's channels, I envisioned data flows where each task would be truly independent and send batches of data through to downstream tasks as soon as it was available. This would mean that a DAG would no longer be a strictly sequential entity where task A needs to execute fully before task B can start. Instead all tasks could be running at once, and batches of data would flow freely between them at all times. This is not unlike a conveyor belt in a factory delivering each finished piece and keeping everyone busy [1].

# Vision for Serverless Orchestration

By the start of 2019 the idea was clear enough in my mind that I wrote a proof of concept using python generators and a queue between processes. The end result was more complicated than it needed to be and not very user friendly, but I could see the potential in my mind and started to iterate.

One of the big turning points came after reading the Zappa [2] readme and realizing that the framework could be used to schedule tasks in lambda.  Even more interesting, by decorating a function with `@async` you could make it call a new instance of itself and run in parallel. All of this coupled with the fact that AWS has its own scheduler to trigger a function on a schedule made me wonder... could Zappa be the perfect backend for an orchestrator? I set out to modify my code to create a new POC removing all queues and using Zappa, and while the framework ended up having some limitations that forced me pull it out and rewrite my own backend, the idea of deploying to lambda was a breakthrough that was here to stay.

<blockquote>
Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away.
</blockquote>

Fast forward to now and although the core ideas have not changed at all, Typhoon in its current form is much more user friendly and less complex than it used to be. Every concept that did not add value was removed until we were left with a much simpler framework, without sacrificing power. In the concepts that stayed we tried not to break conventions without good reason, so many things should be immediately familiar to anyone that has worked with Airflow. We believe the best products are the ones that innovate in execution without forcing you to learn a completely new paradigm. A good example is Snowflake which is radically different to a classical data warehouse, but still has a shallow learning curve. They would likely not have been as successful if they had reinvented SQL.

Once the basic framework was built and proved to be versatile enough, the rest was just adding icing on the cake:

- Rich CLI
- Extremely easy to extend functions in plain python
- Grouping tasks into components
- Generating terraform scripts for deployment

# Where first? Airflow! 

But even though we firmly believe our product is an big evolutary step over Airflow, we also recognise how ubiquitous Airflow is. It's the industry standard and has a huge user base. More than any other tool, every data engineering department seems to have an Airflow instance running somewhere. Even if we could succeed in providing a better experience, was it realistic to expect that many people to rewrite their pipelines in a new tool? Our conclusion was that it's just *not realistic* for most as it would be too costly. So what could we do? Well **if you can't beat them, join them**!

This is when having the DAG layer in YAML really paid dividends. As we were already compiling into Lambda compatible python, the workflow logic was already separate from the execution backend. It couldn't be too hard to compile into Airflow DAGs. You would sacrifice the parallelism that Lambda can provide, but in exchange you could slowly migrate into Typhoon while keeping old flows still working in pure Airflow. The end result was a level of integration far beyond what we've seen in other tools, which commonly just create a DAG with one task that then calls their framework. Typhoon actually translates each task into an Airflow one, can join two tasks together if they'll be sharing data that you don't want to send over the network, and can intelligently split branches. Moreover, Typhoon's variables and connections directly integrate with Airflow's ones so they're easy to manage. Typhoon on Airflow is a first class citizen that doesn't feel alien.

In fact this was our chosen method when we deployed Typhoon in production for the first time at a medium sized hotel chain. It has been running on Airflow **in production for over a year with no maintenance or hiccups**, and we have only had to modify the code each time a new data source was requested.

# So, what do you think?

Although we have hundreds of ideas of features we could implement (web UI, new triggers apart from schedules like S3 events or Kafka messages, monitoring and smart alerting etc.) we feel that we are at a stage where the product is mature enough that we would benefit from feedback while moving forward, while still being early stage enough to influence the direction. We are very excited for you to give it a try and hear your thoughts! 

Start a conversation with us -  @DataTyphoon.


### Footnotes

- [1] [Apache Beam](https://beam.apache.org/) is built on similar ideas but went in a very different direction
- [2] [Miserlou Zappa Github](https://github.com/Miserlou/Zappa)