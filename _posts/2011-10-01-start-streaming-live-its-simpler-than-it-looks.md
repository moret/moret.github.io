---
layout: post
title: start streaming live - it’s simpler than it looks
subtitle: Here I’ll focus on a live transmission using FMS.
poster: cold-red-warm-gold.jpeg
poster_subtitle: Cold red, warm gold
---
Hey. At first people searching for streaming solutions might be afraid when they notice that there are lots and lots of technologies around, both old and new. From VLC plugins to Helix servers, from RTMP to Pseudostreaming, the options are plenty. And streaming can be used both for live or on demand - recorded - video, so it may seem even more confusing.

But when it comes down to it, the most used approaches for live stuff are RTMP streaming to Flash Players - which works on any desktop browser and some mobile devices - and HTTP Streaming to Safari/iOS. Lots of servers can do both: Adobe Flash Media Server (FMS), Wowza and Red5 are the most common.

Here I’ll focus on a live transmission using FMS. What’s needed before starting is:
- A server somewhere running a Red Hat like Linux (e.g. CentOS) or Windows;
- A webcam or a video capturing device;
- An Adobe account - you can [create them for free](https://www.adobe.com/cfusion/membership/).

You will setup three things:
- An encoder on the computer with a webcam. This will take the video signal and convert it to one of the compatible encoding formats - preferably H.264 for video and MP3 for audio. Then it will publish, i.e., stream it to the streaming server that will broadcast it;
- A streaming server. This will receive a published stream and allow lots of viewers to come and watch the video. These servers are configurable and can run applications that will talk with any connecting player or clients and allow for other functionalities, like DVR or access control;
- A web page with a flash player or an HTML5 player.

First, download and install Flash Media Live Encoder - FMLE. When you run it you will be able to see if your webcam is working. Let’s begin with one of the custom presets - choose the Medium Bandwidth preset for H.264. We’ll fill in the output options later.
Now download Flash Media Server 4.5. FMS is somewhat picky when it comes to environment. So you will probably want to install it to a virtual machine or, even better, on a hosted server. You can try Amazon’s default instance on AWS EC2, or fire up a server on a service as Rackspace or Linode. Don’t forget to choose a Red Hat like Linux. Installation is pretty straightforward: just untar and run `installFMS` with all default options.

The installation process will also start up FMS for you if you let it. So after he starts you can actually check if he’s working by opening `fms_adminConsole.swf` which you can find a copy inside FMS at `webroot/swfs` - you can run it on your computer standalone or from a webpage if you’re running Apache. On AdminConsole point to your server installation using the username and password you provided during installation. If he connects everything is fine.

Some theory here: FMS is a middleman to your transmission. It’ll sit between your encoder system - your own PC with a webcam in this case - and the audience. Lots of FMS instances can share the burden of a large audience while using one single encoder, and FMS runs applications to customize the video delivery - e.g., you could ask every connection to contain a passkey, or measure the user’s bandwidth and choose to stream a smaller video. An example application that ships with him is the “live” application - confusing name, huh? - that simply accepts publishing streams and clients requests.

With FMS up and running you can stream to it. You’ll have to point FMLE to a RTMP url. The url is built like this:

```
rtmp://server_name/application/instance/mp4:streamName
```

As we’ve seen above, the application is “live”. If you don’t choose an instance name - which is just a way of allowing the same application code to run independently, allowing restarts and such separately - it will use a default name, but let’s specify one. On FMLE you have to split the url into two parts. For example:
- FMS URL: rtmp://my.web.server/live/tv
- Stream: mp4:abcnews

That should be enough. Hit the green Start button and check on AdminConsole. A new instance will show up, and if you choose Streams instead of Log you’ll be able to see your stream. You’re publishing, now you need to play it back.

There are a lot of flash players for you to embed on your page. Two well know ones are JWPlayer and Flowplayer. Let’s pick JW Player. You can just follow their setup instructions, or [copy from my example repository on GitHub](https://github.com/moret/jw-player-basic-rtmp). The page is pretty simple, you won’t have trouble to understand.

So that’s it! You can now post your webpage somewhere and show it to someone. You’ll be only limited in access by your streaming server license.
