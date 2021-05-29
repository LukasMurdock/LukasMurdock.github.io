---
layout: post
title: 'Command Line'
description: ""
date: May 28, 2021
code: true
tags: annual
---

First, I’m currently running an Intel Mac, and using Homebrew as a package manager.

[Top brew packages](https://gist.github.com/pmkay/e09034971b6f23214fd9f95a3e6d1c44)

Here’s an overview of utilities:
- grep
- sed
- wget
- curl
- awk (gawk)
- FFmpeg
- youtube-dl
- ImageMagick
- taskwarrior

## Basic Terminal Things
[Keyboard shortcuts in Terminal on Mac
](https://support.apple.com/guide/terminal/keyboard-shortcuts-trmlshtcts/mac)
- Clear terminal: <kbd>Command</kbd> + <kbd>K</kbd>
- Clear terminal line: <kbd>Control</kbd> + <kbd>U</kbd>
- Delete forward to the end of the word: <kbd>Escape</kbd> + <kbd>D</kbd>
    - <kbd>Option</kbd> + <kbd>D</kbd> is available with [Use Option as Meta Key](https://support.apple.com/guide/terminal/change-profiles-keyboard-preferences-trmlkbrd/2.11/mac/11.0))
- Reposition insertion point: <kbd>Option</kbd> + <kbd>Click</kbd>

- Open an app: `open -a slack`

## iTerm2
[iTerm2 Features](https://iterm2.com/features.html)

[iTerm2 Cheatsheet](https://gist.github.com/squarism/ae3613daf5c01a98ba3a)

Turn on [Natural Text Editing](https://apple.stackexchange.com/questions/136928/using-alt-cmd-right-left-arrow-in-iterm)

- Have [left option key](https://stackoverflow.com/a/48002681/12161293) act as <kbd>escape</kbd>

## pipes |
The Pipe character <kbd>|</kbd> is used to combine two or more commands, and in this, the output of one command acts as input to another command

## cat
[cat](http://www.linfo.org/cat.html) is mostly used for displaying, combining and creating text files.

## grep
Grep lets you search files for text that matches a pattern.

[Wizard zines on grep](https://wizardzines.com/comics/grep/)

## sed
Sed is mostly used for replacing text in a file.

[Wizard Zine about sed](https://wizardzines.com/comics/sed/)

You can replace *day* with *night* in a file with:
`sed 's/day/night/' sample.txt`

The sed substitute command has four parts:
- Substitute command: `s`
- Delimiter: `/../../	`
- Regular Expression Pattern Search Pattern: `day`
- 	Replacement string: `night`

[An introduction and tutorial to Sed](https://www.grymoire.com/Unix/Sed.html#uh-0)

### Flags
- `sed -i ""`

### Pattern Flags
- `/../../g` Global replacement

### Use sed on inline string
{% highlight shell %}
echo "string" | sed 's/ring/yle/'
# // style
{% endhighlight %}

### Delete the first instance of a specific character
Delete an 'a' from a file: `sed 's/a//' sample.txt`

### Delete all instances of a specific character
Delete every 'a' from a file: `sed 's/a//g' sample.txt`

### Delete or substituting string
Delete "windows" with "Mac": `sed 's/Mac/windows//' sample.txt`

### Regex
Delete first character in every line: `sed 's/^.//' sample.txt`

Delete last character in every line: `sed 's/.$//' sample.txt`

Delete the first and last character in every line: `sed 's/.//;s/.$//' sample.txt`

Delete everything in a line followed by a character: `sed 's/a.*//' sample.txt`

## ps
ps shows what processes are running. You can use the `ps` command to find the process identifier (PID) of a process.

You can use the PID to [kill the process](http://www-hermes.desy.de/Unixhelp/shell_jobz5.html)

[Wizard zine for ps](https://wizardzines.com/comics/ps/)

<style>
kbd {
    background-color: #eee;
    border-radius: 3px;
    border: 1px solid #b4b4b4;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2), 0 2px 0 0 rgba(255, 255, 255, .7) inset;
    color: #333;
    display: inline-block;
    font-weight: 700;
    line-height: 1;
    padding: 2px 4px;
    white-space: nowrap;
}
</style>

## Package things (Homebrew)

First, make sure you have Homebrew installed.

### wget

[wget](https://www.gnu.org/software/wget/) is a package for retrieving files with the most widely used Internet protocols (HTTP, HTTPS, FTP and FTPS). It’s strong point is recursive downloads.

### curl

[curl](https://curl.se/) is a library for transferring data with URLs. It’s great for testing APIs.

[Wizard zines for curl](https://wizardzines.com/comics/curl/)

#### Flags
- Show response headers: `-i`
- Show only response readers: `-I`
- Make a POST request: `-X POST`
- Add a header: `-H "Content-Type: application/json"`
- POST data: `--data '{"name": "Lukas"}'`
- Follow 3xx redirects: `-L`
- Show request headers and stuff: `-v`

### awk (gawk)
AWK is a programming language for manipulating columns of data. gawk is the GNU implementation of awk with extensions.

[Wizard Zines on awk](https://wizardzines.com/comics/awk/)

### FFmpeg
[FFmpeg](https://www.ffmpeg.org/) is a package to record, convert and stream audio and video.

{% highlight shell %}
{% raw %}
# Convert .mp4 to .mp3
ffmpeg -i FILE-TO-CONVERT.mp4 -q:a 0 -map a OUTPUT-FILE-NAME.mp3

# Convert .mov to .mp4
ffmpeg -i INPUT-VIDEO.mov -vcodec h264 -acodec mp2 OUTPUT-VIDEO.mp4

# Combine video files
ffmpeg -safe 0 -f concat -i fileCombine.txt -c copy output.mp4
## fileCombine.txt
### file ./video01.mov
### file ./video02.mov

{% endraw %}
{% endhighlight %}

See:
- [Combine video files](https://ffmpeg.org/faq.html#How-can-I-concatenate-video-files)
- [Normalize audio](https://trac.ffmpeg.orNg/wiki/AudioVolume)

### youtube-dl

[youtube-dl](https://youtube-dl.org/) is a package to download videos from YouTube and a few more sites.

{% highlight shell %}
{% raw %}
# Download video from YouTube
youtube-dl --recode-video mp4 VIDEO-LINK-OR-PLAYLIST-ID

# Download audio from YouTube
youtube-dl -f bestaudio --extract-audio --audio-format mp3 --audio-quality 0 VIDEO-LINK-OR-PLAYLIST-ID

# Download single Frame image from YouTube
ffmpeg -ss "[SCREENSHOT_TIME]" -i $(youtube-dl -f 22 --get-url "[YOUTUBE_URL]") -vframes 1 -q:v 2 "[FILENAME].jpeg"

{% endraw %}
{% endhighlight %}

([H/T](https://askubuntu.com/questions/1155446/is-it-possible-to-only-download-a-single-frame-from-a-youtube-videos))


### ImageMagick

[ImageMagick](https://imagemagick.org/index.php) is a package to create, edit, compose, or convert images.

{% highlight shell %}
{% raw %}
# Convert image (webp to jpg)
magick INPUT.webp OUTPUT.jpg

# Bulk image convert (web to jpg)
magick mogrify -format jpg *.webp

# JPG compression
convert INPUT.jpg -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB OUTPUT.jpg

{% endraw %}
{% endhighlight %}

### Docker

[Docker](https://www.docker.com/) delivers software by isolated containers.

{% highlight shell %}
{% raw %}
# Get Jekyll in docker or something
docker run --rm --volume="$PWD:/srv/jekyll" -p 4000:4000 jekyll/jekyll jekyll serve    

Docker-compose up
{% endraw %}
{% endhighlight %}

### Taskwarrior

Taskwarrior manages a TODO list from the command line.

[Taskwarrior examples](https://taskwarrior.org/docs/examples.html)

[Taskwarrior best practices](https://taskwarrior.org/docs/best-practices.html)

{% highlight shell %}
{% raw %}
# Add a project and assign it a project
task add project:{PROJECT} {INSERT TASK} 

# Add a due date where appropriate:
task {ID} modify due:31st

# When you start working on a task, mark it started
task {ID} start

# If you know the priority of the task
task {ID} modify priority:{L,M,H}

# Add useful tags:
task {ID} modify +{TAG} +{TAG}

# Urgent next task?
task {ID} modify +next

# Represent dependencies where appropriate
task {ID} modify depends:{OTHER_ID}

{% endraw %}
{% endhighlight %}

[Taskwarrior date synonyms](https://taskwarrior.org/docs/dates.html#:~:text=you%20can%20use%20a%20date%20synonym%20instead)

