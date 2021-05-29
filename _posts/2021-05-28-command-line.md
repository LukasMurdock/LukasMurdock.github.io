---
layout: post
title: 'Command Line'
description: ""
date: May 28, 2021
code: true
---

First, I’m currently running an Intel Mac.

Here’s an overview:
- grep
- sed
- wget
- curl
- awk (gawk)
- FFmpeg
- youtube-dl
- ImageMagick

## Basic Terminal Things

## pipes |
The Pipe character <kbd>|</kbd> is used to combine two or more commands, and in this, the output of one command acts as input to another command

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