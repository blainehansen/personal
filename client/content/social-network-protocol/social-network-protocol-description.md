---
ignore: true
title: "Inbox Fragmentation: Designing a protocol to put your whole digital life in one place."
thesis: "I have eight social media accounts, and I'm sick of it. Are you sick of it too? Help me design a protocol to iron out this mess."
date: 10/10/2015
project: social-network-protocol
tags:
- business
- technology
- politics
---

**This post is a work in progress, and I welcome feedback or suggestions.** 

What is a "social networking site"? Let's name some and then do our favorite thing... compare and contrast!

I have eight social networking accounts. Eight. You want to know how many I *should* have? One. Precisely one. And I'm convinced it's entirely possible for things to change so that I could.

How? Well, these are the eight different sites I have accounts with, and in a way they all in some way bill themselves as "social networking" sites.

Here's a list of social networking sites:

* Facebook
* Twitter
* Linkedin
* Soundcloud
* Pinterest
* GooglePlus
* Instagram
* Youtube

Why are they all "social networking" sites? Because they share a handful of "social networking" features that allow users to:

* Post content.
* Make connections with other people.
* Subsequently receive content from other people.
* Perform "actions" on each other's content (likes, hearts, comments, etc).
* Have static "metadata" about themselves.
* Send private messages.

And these features come with a handful of common interface conventions that allow us to navigate them:

* Personal content feeds, or "Profiles".
* "Make a Connection" buttons.
* Content feeds aggregated from many connections.
* A notifications tray.
* An inbox.

So, essentially, all of these sites do the exact same thing. There's only one difference, and that's in the nature of the content being shared. Facebook shares mostly things that can be reduced to text (posts, links or embeds from other sites) and they throw pictures and videos on the top. Twitter does just text with pictures thrown in occasionally. Linkedin does just text (I think, who really cares?). SoundCloud does audio files. Pinterest and Instagram and Snapchat do images with text. YouTube does video files.

Think about it though, aside from all the brand design and interface details, that is a more or less complete description of the difference between all those different apps. Right? Aren't they all more or less doing just the same thing? And think about all the *other* apps that I don't even use! Tumblr, Vine, even things like DeviantArt, Github, everything has those features.

Those features are what I like to call the "social app baseline." If an app does those things, it's a social app, and therefore gains the investor hype and user engagement that tend to follow. But if those features really are "the baseline," the things an app needs to do to even participate meaningfully in the modern web, do we really want every app to have to reinvent and implement those features all over again? And do we really want to have a separate content feed, inbox, notification tray, and connection network for *every single* app we use? Is no one else supremely annoyed by that? By having the urge, every time you look at your phone, to check your facebook pinterest instagram youtube email and twitter notifications all before you can move on with your goddamn life? I am. I'm so supremely sick of it.


### The fundamental flaw with the current model is that no one has considered the difference between content creation, and content sharing or distribution.

Content creation is hard. Building a tool that allows you to capture, edit, upload, and host something as complex and computationally intensive as an audio or video file or an image is very valuable. I'm very impressed every time I use YouTube, both watching and adding videos, because they've transformed a very complicated computer task into a breeze. Instagram is similar, it smooths out photo editing, which can be incredibly complicated. Those systems add a ton of value.

But Facebook and Twitter? Ugh...

Sharing and Distribution are *easy*. Literally. I'm a web developer, and I could spin up a Facebook or Twitter clone in a week (that goes especially for Twitter). Moving information from one place to another is *exactly what the internet was built to do*. It's the logical conclusion of this whole system. Ever since Darpanet back in the 70's, people have been able to "share and distribute" content. Sure, it was slower, there were less nodes on the network, the content was smaller and simpler, but ultimately that's what the internet does. Neither Facebook nor Twitter added any value that couldn't have been collated together from MySpace and email. The only thing I've ever been impressed by with Facebook's interface is photo tagging, but then Instagram happened, and that feeling disappeared.

So, I've done a lot of complaining, where does this all go? Simply, I believe we can implement a system that will universally streamline the sharing and distribution process, and make it so apps live or die only on their usability and ability to create content.

I call it the Social Network Protocol.


### The Protocol

Let's return to the "social app baseline." Users can:

* Post content.
* Make connections with other people.
* Subsequently receive content from other people.
* Perform "actions" on each other's content (likes, hearts, comments, etc).
* Have static "metadata" about themselves.
* Send private messages.

These are the basic things the protocol has to handle. When someone posts content on their feed, all of their connections should be able to look at it and interact with it. Connections should be smoothed out, so that I can "follow" or "friend" or whatever with any person in the world. And a cleaner "instant messagey" sort of private message system should probably be implemented that could even be a cleaned up version of the email protocol.

Let's go through these features one by one, starting with the simplest.


### Welcome to my Static Metadata

Oh my God this barely even matters. Your bio, your full name, your "quotes", your hometown or employer. This is one of the least interesting and important parts of the whole thing. This is just the stuff that isn't expected to grow over time or be complicated. Every profile should just have a simple `key: attr` manifest (in json or yaml or whatever) that conveys this information. Done.


### Let's Make a Connection

Social networking connections are abstractions that are ultimately about regulating visibility and action between two people. They determine if someone can see your content, and if you want to bother to see their content. They're designed to solve the [filter problem] in a way that mirrors real human social groups. They also provide the benefit of forming persistent links between people that can withstand various social and technological changes. And they can provide a way of remembering "severages" in the event someone wants to block or shut off someone else. In short, they create a stable and customizable web of information flow between people.

Since a primary goal of this entire system is for people to have control over their data and it's visibility, it makes sense to make the whole thing into two-way "follow" paradigm, where a user can request access to the content feed of another person, which that person must first accept. This allows each end to have an explicit knowledge of everyone they're following and being followed by. The other person doesn't have to reciprocate that follow action, but different systems could of course mediate this process so that follows were only made if there was reciprocation. This is all the protocol has to address, since it's the only part of the connection process that has to occur between two different users. It's the only part that requires mutual agreement and therefore protocol mediation. Each side must request a follow from the other, and each side must accept a follow from the other.

From there, an arbitrary amount of control can be exerted over that connection by each side. In any connection, each person has an outgoing flow and an incoming flow. Each person can have a series of permissions, which control their outgoing flow by determining who can see what under what circumstances, and a series of filters, which control their incoming flow by determining what content from other people they care to actually see or be made aware of. Obviously these filters would simply control what would go in the the aggregated feeds or what would merit a notification, and if someone wanted to specifically visit the feed of the other person, then they could see and do everything they were permitted to, regardless of how their filters are set up.

![diagram?]

The benefit of using this system is obvious: it's incredibly simple, but any type of abstraction can be layered over it to accommodate many other flavors of connection. Facebook at first glance seems like they don't do this, but they do simply by only making a connection in one direction if the other direction is reciprocated, and then they implement the idea of filters with things like their "unfollow" feature. That "friend" model of connection, where reciprocated following was required, could be implemented if a company really wanted to. Facebook also does this pretty much unchanged with their business "pages" that are "subscribed" to rather than friended. Lots of other systems do this without any modification at all, like twitter and instagram and pinterest.

So you may be asking the obvious question "why bother having a connection between two people if both of them just filter each other out?" Beside the fact that connections regulate not only reading but also interacting with content, but the connection serves a clear social function as well. The fact that I'm "following" or "friends" with a person doesn't necessarily mean I want any information to flow between the two of us at all, but the existence of the connection provides an option to switch that flow on at any time, perhaps allows me to message them or act on their content, and crystallizes some sort of mutual agreement of friendship between us (however casual).

The existence of a connection would create some sort of user specific authentication key for use by both systems in order to access the content of the other.


### Oh my god I got an Instant Message!!!!! <3 <3 <3 

Email *mostly* solved this problem, but as the internet has evolved, a couple of chinks have appeared in it's armor, mostly annoyingly that of **GROUP MESSAGES**.

![michael group message realization]

Simply put, a protocol could iron out how this works, and make it possible for instant messaging to be just as open as email or text messaging. For example, I'd love to use Whatsapp to message people on Facebook or Twitter, because I love Whatsapp as a tool (the irony that it's now owned by Facebook is not lost on me...)

The irritation of group messages I believe stems from the lack of distinction between different types of mass messaging. There's a big difference between a "blast" message, meant to simply shout some information to a large group but which shouldn't involve them with each other, and a true "group" message, one that is more akin to a forum than anything. Email *tried* to solve this problem with the "carbon-copy" vs "blind-carbon-copy" convention, but it was clunky from the beginning. 




There are a few other things though, dealing with how content creation apps should interact with a person's social profile. This is actually the most complicated part, since 

The content protocol needs to allow for a few things:
	* any type of content imaginable, with pre-packaged behavior to go along with it.
	* connections with the "social" apps

Make content.
Connect that content to an account.
Share or embed it absolutely anywhere.


How should actions work? They should probably be separated from content since they aren't inherently the same thing.

Feedback actions
	likes or hearts or upvotes
	comments

Passalong actions


This could even be an extension of the existing email standard. It would declutter everything so substantially, and allow everyone to just have the one tool that they trust and enjoy using.





Personally, I want facebook to die. It’s abused our trust too many times, and I’m sick of it being a utility. My genuine hope is that if a standard like this were created, a mass exodus would take place away from facebook, forcing it to either die or rework itself into something that people actually want.



It's really quite probable that this exact specification would become obsolete pretty soon. The internet changes quickly, and the current paradigms for how everything operates is tenuous at best. But these sorts of ideas can evolve with the times, and they will as long as they were well conceived to solve real problems from the beginning. We can make the internet a place that more fluidly allows us to connect with each other, and prevent big companies from slowly gaining a stranglehold over huge majorities of the world's data. With intelligent protocols in place, the internet becomes more and more something that is universally useful, and doesn't depend on individual companies to make it sane.