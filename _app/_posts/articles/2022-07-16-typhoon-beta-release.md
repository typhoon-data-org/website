---
layout: post
title: Introducing Typhoon beta 🎊 
category: article
author: biellls
tags:
    - typhoon
    - release
    - beta
    - article
    - history

heading-img: https://raw.githubusercontent.com/typhoon-data-org/typhoon-orchestrator/main/docs/img/readme_montage.gif
heading-img-local: true
heading-bg-color: "#FFF"
heading-bg-text: "#000"

---

# Introducing Typhoon

We are pleased to introduce Typhoon Orchestrator! It’s Open Source and ready to use.  We hope you like the elegant YAML, and how simple and productive it is to use! 

Our key takeaways are:
- Easily extend with pure python. Framework-less, with no dependencies.
- Deploy to your existing Airflow. **No risk migration!**
- Deploy to AWS Lambda. **Serveless is the future!** 

[See our blog on making a Telegram bot with AWS Lambda and Typhoon.](https://typhoon-data-org.github.io/website/serverless-telegram-bot-jokes.html) 

# Our vision 

We are fully Open Source, including plugins, and are committed to good Open Source practices. 

Our vision is to make Data Engineering 10x more productive. Our approach has been to try not to break conventions without good reason. Many things should be immediately familiar to anyone that has worked with **Airflow**. Just like Snowflake did not reinvent SQL, we want to make you more productive without the pain of a steep learning curve. 

We wanted to make a next generation, cloud native, and asynchronous Orchestrator that can handle highly dynamic workflows with ease. We crafted Typhoon from the ground up to work towards this vision. It's designed to feel familiar while still making very different design decisions where it matters.

More on [why Typhoon](https://typhoon-data-org.github.io/website/typhoon-orchestrator-vision.html).

### Key features

- **Pure python** - Easly create functions to be used in tasks. 
- **Testable Python** - Write tests for your tasks in PyTest. Automate DAG testing. 
- **Composability** - Functions and connections combine like Lego. Very easy to extend.
- **Data sharing** - data flows between tasks making it intuitive to build tasks.
- **Elegant: YAML** - low-code and easy to learn.
- **Code-completion** - Fast to compose. (VS Code recommended).
- **Components** - reduce complex tasks (e.g. CSV → S3 → Snowflake) to 1 re-usable task.
- **Components UI** -  Share your pre-built automation with your team. teams. :raised_hands:
- **Rich Cli & Shell** - Inspired by other great command line interfaces and instantly familiar. Intelligent bash/zsh completion.
- **Flexible deployment** - Deploy to Airflow. Large reduction in effort, without breaking existing production.

# Example YAML DAG
    
{% highlight YAML linenos %}
name: favorite_authors
schedule_interval: rate(1 day)

tasks:
  choose_favorites:
    function: typhoon.flow_control.branch
    args:
      branches:
        - J. K. Rowling
        - George R. R. Martin
        - James Clavell

  get_author:
    input: choose_favorites
    function: functions.open_library_api.get_author
    args:
      author: !Py $BATCH
{% endhighlight %}

# Production use cases 

Typhoon with Airflow has been in production at a medium sized hotel chain since 2021. It has been running on Airflow **in production for over a year with no maintenance or hiccups**. We have only modified the code each time we added a new data source.

# Roadmap

We are working on gathering feedback on our current release. Please do reach out to us and start a conversation at @DataTyphoon. 

Next, we are working on making it even easier to deploy to AWS Lambda and to make better documentation and auto-completion for the plugins. This will make using it even easier without needing to refer to the functions. 

You can find out more about the project at: 

[Github Readme](https://github.com/typhoon-data-org/typhoon-orchestrator)

[Docs](https://typhoon-data-org.github.io/typhoon-orchestrator/getting-started/installation/)
