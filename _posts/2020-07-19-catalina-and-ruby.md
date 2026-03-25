---
layout: post
title: 'Catalina and Ruby'
description: "Running Jekyll on macOS Catalina"
code: true
date: July 19, 2020
tags: dev
---

When I first updated my 2018 MacBook Pro, I had problems—as is due is course when installing ruby.

After upgrading a 2012 MacBook Pro, I had to deal with the same problems so I thought to rehash these notes.

I use Jekyll to build this site, and Jekyll runs on Ruby. To build the site locally I run `bundle exec jekyll serve`.

Console would log errors like:

```console
`bad interpreter: /System/Library/Frameworks/Ruby.framework/Versions/2.3/usr/bin/ruby: no such file or directory`
```

```console
`Could not find 'bundler' (2.1.4) required by your Gemfile.lock`
```


```console
`To install the missing version, run 'gem install bundler:2.1.4'`
```



So I run `gem install bundler:2.1.4`

And it logs,
```console
`You don't have write permissions for the /Library/Ruby/Gems/2.6.0 directory.`
```

Haaaa. Okay what now?


I noticed new percentage signs in the macOS terminal. It turns out Apple changed the default shell from bash to zsh. I’m not knowledgable enough to really know what that means but if you are interested [I’ve linked an article about it.](https://stackabuse.com/zsh-vs-bash/)

Because of this change, you have to rename your configuration files.

[Bash things are now zsh things.](https://stackoverflow.com/questions/56784894/macos-catalina-10-15beta-why-is-bash-profile-not-sourced-by-my-shell)

.bashrc is now .zshrc and .bash_profile is now .zprofile.

So first we need to install Ruby.
`brew install ruby`

Then find `which ruby`

If it shows /usr/bin/ruby then run
```console
`echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.zshrc`
```

```console
`echo 'export PATH="/usr/local/opt/ruby/bin:$PATH"' >> ~/.bash_profile`
```

```console
`source ~/.zprofile`
```


And then run `which ruby` again.

It should be something other than /usr/bin/ruby now.

`gem install bundler`

No errors, everything works again.

As of writing the [Jekyll docs are still for bash shells.](https://jekyllrb.com/docs/installation/macos/)
