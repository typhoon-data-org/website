---
layout: post
title: How to create a Serverless Telegram Bot to send daily jokes to your friends
category: article
author: biellls
tags:
    - typhoon
    - serverless
    - telegram
    - tutorial
    - article

heading-bg: img/telegram_botfather.png
heading-bg-local: true
heading-bg-color: "#FFF"
heading-bg-size: "900px"
heading-bg-position: "right bottom"
heading-bg-text: "#000"
heading-bg-repeat: "no-repeat"

---
#### Table of contents
- TOC
{:toc}

#### Summary

[Typhoon Orchestrator](https://github.com/typhoon-data-org/typhoon-orchestrator) is a great way to deploy ETL workflow on AWS Lambda. In this tutorial we intend to show how easy to use and versatile it is by deploying code to Lambda that gets a random joke from [https://jokeapi.dev](https://jokeapi.dev) once a day and sends it to your telegram group.

## Getting started

The first thing you need to do is install typhoon and the rest of the dependencies needed for this tutorial, preferrably in a virtual environment.

```bash
pip install typhoon-orchestrator[dev]
pip install python-telegram-bot
pip install requests
```

Next we create our project, we will call our project jester (we could call it anything).

```bash
typhoon init jester --template minimal
cd jester
typhoon status
```

Notice that the status command gives us the following warning: `Connections YAML not found. To add connections create connections.yml`. This is normal because typhoon normally uses a metadata database where you can store connections and variables, but we don’t want to create and use any DynamoDB tables for this tutorial so we used the minimal template that doesn’t include anything related to the metadata database. If you see any warnings about the metadata database during the course of the tutorial don’t worry, it’s for the same reason.

## Tell me a joke!

Before we worry about telegram, let’s create a workflow that calls the joke API and prints the joke on your CLI. Create the file: `dags/send_me_a_joke.yml`:

```yaml
name: send_me_a_joke
schedule_interval: '@daily'

tasks:
  get_joke:
    function: typhoon.http.get_raw
    args:
      url: https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single
  
  select_joke_text:
    input: get_joke
    function: typhoon.json.search
    args:
      data: !Py $BATCH.response.json()
      expression: joke

  tell_joke:
    input: select_joke_text
    function: typhoon.debug.echo
    args:
      joke: !Py $BATCH
```

This workflow has three tasks using built-in functions:

- **get_joke**: Calls the joke API and gets a response like to the following:
    
    ```json
    {
        "error": false,
        "category": "Programming",
        "type": "single",
        "joke": "A man is smoking a cigarette and blowing smoke rings into the air. His girlfriend becomes irritated with the smoke and says \"Can't you see the warning on the cigarette pack? Smoking is hazardous to your health!\" to which the man replies, \"I am a programmer.  We don't worry about warnings; we only worry about errors.\"",
        "flags": {
            "nsfw": false,
            "religious": false,
            "political": false,
            "racist": false,
            "sexist": false,
            "explicit": false
        },
        "id": 38,
        "safe": true,
        "lang": "en"
    }
    ```
    
- **select_joke_text**: Uses a [JMESPath](https://jmespath.org/) expression to select data from the JSON text.
- **tell_joke**: Prints the joke text.

The `!Py` tag means that instead of passing it a YAML object, you are passing it a string representing python code to run. For example, `foo: 4` is equivalent to `foo: !Py 2+2`.  `$BATCH` is a special variable that holds whatever the previous function returned or yielded. In the case of the `select_joke_test` task where the input is the `get_joke` task, its function returned a NamedTuple with a response and some metadata, so that `$BATCH.response`is a requests.Response object.

Lets run to see a joke in our terminal

```bash
typhoon dag run --dag-name send_me_a_joke
```

Piece of cake! But here comes the interesting part...

## I want the joke on telegram

There is no built-in function in Typhoon to send a text to a telegram chat. Fortunately it’s very easy to extend Typhoon, so let’s make it ourselves.

Create the following file `functions/msg.py`:

```python
import telegram

def send_message_telegram(token: str, message: str, chat_id: str) -> str:
    """Given a telegram bot token, chat_id and message,
       send the message to that chat"""
    bot = telegram.Bot(token=token)
    print(f'Sending message {message} to {chat_id}')
    bot.send_message(chat_id=chat_id, text=message)
    return message
```

And update the DAG file we created before at `dags/send_me_a_joke.yml`:

```yaml
name: send_me_a_joke
schedule_interval: 0 10 * * *  # Send the joke at 10am every day

tasks:
  get_joke:
    function: typhoon.http.get_raw
    args:
      url: https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single
  
  select_joke_text:
    input: get_joke
    function: typhoon.json.search
    args:
      data: !Py $BATCH.response.json()
      expression: joke

  tell_joke:
    input: select_joke_text
    function: functions.msg.send_message_telegram
    args:
      message: !Py $BATCH
      token: !Var telegram_token
      chat_id: !Var chat_id

requirements:
  - python-telegram-bot
  - requests
```

Notice that for the token and chat id we have the `!Var` tag. This is because we don’t want to include a secret like a token in the code, so we will read it from a variable. If you are really perceptive you may be thinking: “Didn’t you say that we are using a minimal deployment where there is no metadata database to store variables on?” Yes, that’s 100% correct. Usually we would store variables in the metadata database. However, we will use the alternate method of storing variables which is using an environment variable that starts with `TYPHOON_VARIABLE_`.

- To create a bot with the botfather and **get a token** follow the official tutorial [https://core.telegram.org/bots#creating-a-new-bot](https://core.telegram.org/bots#creating-a-new-bot)
- To **find out your chat ID** check out [https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id](https://stackoverflow.com/questions/32423837/telegram-bot-how-to-get-a-group-chat-id). Keep in mind that **you can only add the bot to group chats, not private conversations**.

```bash
export TYPHOON_VARIABLE_telegram_token="MY_SECRET_TELEGRAM_TOKEN"
export TYPHOON_VARIABLE_chat_id="128332492187641"
```

Now that we have everything ready, let’s send some jokes.

```bash
typhoon dag run --dag-name send_me_a_joke
```

If everything was correctly set up you should get the notification with a random programmer joke!

## Aiming for the clouds

### Build and upload the workflow

This is all well and good, but we want the bot to tell us a joke every day without needing to run the code locally. First of all let’s compile our code into a zip and upload it to S3 so that Lambda can use it. This can be a little tedious, but luckily Typhoon takes care of that for us. We need to tell it to which S3 bucket we want to deploy to. **You will also need a configured [AWS profile](https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-profiles.html#cli-configure-profiles-create)**. Open the `.typhoonremotes` file and modify it to use your profile and S3 bucket.

```
[test]
aws-profile=myaws
s3-bucket=typhoon-orchestrator
```

Now that we have a remote called `test` we are ready to create the zip files and push them to S3. You will need to have docker installed for this step because the dependencies need to be built in an OS that is compatible with the one Lambda is using, otherwise they won’t work. This is a very common source of problems that Typhoon helps you avoid. If you are sure that your OS is compatible you can add the flag `--build-deps-locally`, but **it is generally not recomended**.

```
typhoon dag push --dag-name send_me_a_joke test
```

This will have taken a very long time because Typhoon built all of the dependencies, but don’t worry **updating the workflow code is much much faster since the dependencies are separated into a layer and don’t need to be re-deployed unless they change**.

The `test` at the end tells it what remote to deploy to. In the future we could add a different production environment with its own remote.

If you check your S3 bucket now you’ll find two files:

- **The lambda code:** `typhoon_dag_builds/send_me_a_joke/lambda.zip`
- **All the necessary dependencies**: `typhoon_dag_builds/send_me_a_joke/layer.zip`

![S3 objects](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gfjtgfcfs5q19ay8jvrp.png) 

### Deploying infrastructure

For this part you will need to [install and set up terraform](https://learn.hashicorp.com/tutorials/terraform/install-cli). Learn more about infrastructure as code [here](https://learn.hashicorp.com/tutorials/terraform/infrastructure-as-code?in=terraform/aws-get-started).

**Typhoon automatically creates some terraform files that describe all the necessary infrastructure** to create in order to deploy our workflow to AWS Lambda. This greatly simplifies the creation of all the necessary resources that you would otherwise need to create manually. More importantly, it provides you a starting point while also giving you full control to change the terraform files until you have the desired configuration.

For this tutorial you just need to **update the test variables file to include the S3 bucket name and some DAG info**. We can get the info for all the dags by running `typhoon dag info --json-output --indent 2`, but in this case we will need to adapt it to include the necessary environment variables. This means that you will need to add the following to the file `terraform/test.tfvars`.

```
dag_info = {
    "send_me_a_joke": {
        "schedule_interval": "cron(0 10 * * ? *)",
        "environment": {
            "TYPHOON_VARIABLE_telegram_token": "MY_SECRET_TELEGRAM_TOKEN",
            "TYPHOON_VARIABLE_chat_id": "128332492187641"
        }
    }
}
```

Notice how the schedule interval is in a different format than the one we defined. This is because Terraform maps to AWS resources, and AWS uses its own flavor of cron expressions which is incompatible with the standard Unix cron expressions used by tools like cron, crontab, Airflow and many more. Typhoon aims to be a framework that can deploy to many platforms (currently supports AWS Lambda and Airflow) so we decided to follow the industry standard instead of AWS’s. Luckily, when we run `typhoon dag info ...` **Typhoon converts it to AWS’s standard so you don’t need to do that yourself!**

Now we are ready to create the infrastructure with terraform.

```bash
export AWS_PROFILE=my-aws-profile
export AWS_DEFAULT_REGION=eu-west-1
cd terraform
terraform init
terraform plan -var-file=test.tfvars -out=tfplan
terraform apply tfplan
```

And voila! You can check all of the resources that have been created in AWS and take a moment to appreciate how much time we’ve saved.

![AWS Lambda Function](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ymarmji5bglvr7axo16r.png)
 

## Let’s take it for a spin

If everything worked correctly you will get a joke in your telegram chat at 10am, but we don’t want to wait that long, we want to hear one now! You could invoke the Lambda from the AWS console, but we will invoke it with Typhoon.

```bash
typhoon dag run --dag-name send_me_a_joke test
```

Hopefully you got a hilarious joke sent right to your group chat.

This is the same command we used earlier to run the workflow locally, but with `test`at the end specifying that we want to run it in the remote environment. This has invoked a lambda and shown you the logs. Actually, to be more precise, it has invoked a Lambda that has then invoked another Lambda and then invoked another Lambda. Why? Because Typhoon is asynchronous by default which means that as soon as a function returns or yields a batch we invoke a new Lambda to process it. This is useful because you can have a lot of tasks performing work in parallel. For example, imagine you have a workflow that reads FTP CSV files, zips them up and uploads to S3. The first task could list all the CSV files in the FTP and yields each path as a batch. Then the next task will compress them which can take a long time, but we actually invoked a new Lambda instance for each batch so we are processing them all in parallel!

Notice how even though the workflow ran across three lambdas, you still got the full log in your terminal. Lambdas can be hard to monitor and debug, but Typhoon tries to make this process easier. This is why when you run a Typhoon DAG manually, it waits for a response so that it can print the logs. Every invocation will in turn also wait for the response of any Lambdas it invokes so you will end up with the full log no matter how many Lambda invocations the workflow ran on. It’s extremely useful to be able to see if the DAG is working correctly, but it does introduce synchronicity so the DAG will run slower. We believe it’s a worthwile tradeoff for manual invocations. **Rest assured that when the workflow is triggered on schedule it will run at full speed**.

## Why can’t I just run everything in one lambda?

Great question, and there’s no reason not to since our worflow is very light and doesn’t benefit from parallelism. You just need to modify the first two tasks to make them synchronous with `asynchronous: False`. This is the relevant part of the code:

```yaml
tasks:
  get_joke:
    function: typhoon.http.get_raw
    asynchronous: false
    args:
      url: https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=single
  
  select_joke_text:
    input: get_joke
    function: typhoon.json.search
    asynchronous: false
    args:
      data: !Py $BATCH.response.json()
      expression: joke
```

Lets build and deploy the code, this time without dependencies by using the flag `--code`.

```bash
typhoon dag push --dag-name send_me_a_joke test --code
```

Wow, that was much faster! You can see that once the workflow has been deployed one time with all the dependencies, **making changes and deploying them is very fast and easy**. Feel free to run the DAG again to check out how only one Lambda will be invoked now.

## This is good to be true, can I really build all my ETLs like this?

Yes and no... Depending on your use case Lambda can be a good fit, but there are currently some limitations to this approach:

- **Lambdas can only run for 15 minutes**. If you have a long running task this will not work for you. In the future **we intend to support Fargate to run heavier tasks** and solve this issue.
- **Can we really do away with the scheduler?** We have shown you a utopian vision of the future of ETLs. It still remains to be seen if we can fully avoid running a scheduler, and we may run into the harsh reality that if you want to be able to implement sensors, rate-limit tasks, etc. we may need a scheduler. Even if that turns out to be true, it would always be opt-in and much simpler than a traditional one.

## Does that mean that Typhoon is not ready for prime time?

**Absolutely not!** We may have a long (albeit exciting) path ahead to realize our vision of a battle tested, fully serverless, asynchronous workflow orchestrator, but AWS is not the only target. **Typhoon supports compilation to native Airflow code**, the most popular orchestrator around today. This feature can bridge the gap between the simplicity of our vision and the complex reality we currently live in as Data Engineers.

Our hope is that you will use Typhoon and fall in love with the simplicity of our vision, and deploy to Airflow if the current state of AWS deployment can’t meet your needs.

## Cleaning up

If you want to clean up all the resources that were created on this tutorial run the following command:

```bash
terraform plan -var-file=test.tfvars -out=tfplan -destroy
terraform apply -destroy tfplan
```

## Thanks for following along!

If you enjoyed this tutorial we hope to see you soon at [https://github.com/typhoon-data-org/typhoon-orchestrator](https://github.com/typhoon-data-org/typhoon-orchestrator). Check out the code, leave a star, open an issue or come say hi on our discord!
