---
layout: post
title: 'Starting Python Development'
description: ""
date: May 28, 2021
code: true
tags: dev
---

First, I’m currently running an Intel Mac.

I’ve done a few small python scripts before but I don’t remember a key thing. How do you even use python?

Mac comes with python–but you’ll want to install a separate and newer version. This means you’ll have two different (but functional) Python installs on your computer, so consistent paths and usages are important.

[Installing Python 3 on Mac OS X](https://docs.python-guide.org/starting/install3/osx/)

We can install python using the Mac package manager [Homebrew](https://brew.sh/#install).

But we’ll want to set the path for it in our terminal profile.

Mac moved from bash to zsh as the default command line shell. You can open the zsh profile in TextEdit: `open -a TextEdit ~/.zshrc`

The code here is run whenever a new terminal window is created. You can add a custom welcome message by writing in `echo "Welcome"`

But we want to have: `export PATH="/usr/local/opt/python/libexec/bin:$PATH"`

The [Command line path](https://stackoverflow.com/a/13978865/12161293):
- `#` is a comment.
- `PATH=` sets the value of the PATH variable
- `$PATH` expands to the current value
- `export` at the beginning makes the value available to programs you run from the terminal

Then we can:
- Install python with: `brew install python`
- Check our version with: `python --version`
- Check our python path with `where python`
- View out python base and site with `python -m site`
- Now we have python installed!

## Pip

Homebrew installed Pip for us. Pip is the package manager for python.

- Check pip version with: `pip --version`
- Get list of packages installed with: `pip list`

### Virtualenv

### Pipenv
Pipenv is a dependency manager used to create a virtual environment for each project to manage their individual dependencies.

- Node.js: npm
- Ruby: bundler
- Python: pipenv

[Install Pipenv](https://pipenv.pypa.io/en/latest/install/#installing-pipenv) with `pip install --user pipenv`

As this is a user install (to prevent any system-wide packages from breaking) we need to add two lines to our profile:

1. `PYTHON_BIN_PATH="$(python3 -m site --user-base)/bin"`
2. `export PATH="$PATH:$PYTHON_BIN_PATH"`

Now we can check the pipenv version with `pipenv --version`

## Django

We can install Django globally with: `python -m pip install Django`


And then we can create a new Django project with: `django-admin startproject djangotestsite`

And then:
- Change directory to the project: `cd djangotestsite`
- Open in VS Code: `code .`

We can start the project server by running: `http://127.0.0.1:8000/`
