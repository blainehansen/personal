---
title: "Facebook Hostages: Why doesn’t social networking work like email?"
thesis: "Facebook and the other social media sites use your participation to hold you hostage to an ecosystem they (mostly) created: the closed social network. But it doesn't have to be that way."
date: 10/10/2015
project: social-network-protocol
tags:
- business
- technology
- politics
---

You remember that time when Facebook did horrible things?

You know, like that time they [experimented on their users to see if they could make them sad](http://www.bbc.com/news/technology-28051930). Or the time they [demonstrated absolutely no concern for making every single user's data completely public](http://www.motherjones.com/media/2013/10/facebook-personal-data-online-privacy-social-norm). Or when they [handed the NSA whatever private personal data they wanted on a silver platter?](http://venturebeat.com/2014/05/15/how-the-nsa-fbi-made-facebook-the-perfect-mass-surveillance-tool/)

And entirely aside from ethical concerns, it's been a regular complaint by basically everyone that the site's privacy settings are [confusing to the point of being useless](http://www.thewire.com/technology/2012/12/facebook-privacy-so-confusing-even-zuckerberg-family-photo-isnt-private/60313/), that increased use of the site makes people [lonely, envious, and generally unhappy](http://www.newyorker.com/tech/elements/how-facebook-makes-us-unhappy), and that the entire thing is intentionally designed to [suck you in and increase your "engagement" for advertising purposes](https://www.washingtonpost.com/news/the-intersect/wp/2014/11/12/the-one-simple-thing-fueling-your-social-media-addiction/).

So, can we just agree for a moment that Facebook sucks? Really, set aside the hype, set aside all the rhetoric about how world changing it's been, and ask yourself, do you actually like Facebook? I'm not asking if you like your friends, or the pictures they post or the conversations you have or the things you say, I'm asking if you like Facebook *specifically*, as a system, as a tool meant to help you do all of those things. Does *anyone* actually like Facebook as a system? Do they ever praise the company or the app for being a really wonderful addition to their life? Is anyone actually impressed by it?

I really doubt it. Obviously people were pretty excited when it first came out. It was a clean, professional, and private (at least in theory) improvement on MySpace, and it really felt like it could change everything. And you know what, it did change everything! But since then.... it's just become a sad bloated mess, whose developers are clearly more concerned with [stalking your photos](http://www.popsci.com/article/gadgets/how-facebooks-new-machine-brain-will-learn-all-about-you-your-photos) and analyzing your clicking behavior for the purpose of advertising than they are with actually helping you meaningfully connect with the world.

So, why aren't people abandoning it in droves? Why does its [user base just grow and grow](http://thenextweb.com/facebook/2014/01/29/facebook-passes-1-23-billion-monthly-active-users-945-million-mobile-users-757-million-daily-users/) and its dominance over that sphere of the internet remain almost unchallenged?

Because now Facebook is basically a utility. People don't have it because they like it, or think it adds value to their life, or like the design and interface decisions the Facebook team has made. No, they use it because they have to, because in order to participate in the internet in a meaningful way, in order to have reliable access to the billions of people using the site, they must at least *have* an account. One of the few realistic ways to actually keep in touch with a large network of people is to get them on Facebook. People change emails and phone numbers too unpredictably, so you can't keep strong permanent connections that way, and other tools simply don't have the user coverage they would have to in order to reliably connect to everyone. But Facebook didn't achieve that level of necessity by providing a good product, they did it by holding all of our data hostage.

When Google Plus came out, I was ecstatic. I had hated Facebook for years, especially the laughable amount of control they gave me over what was shown to who. The Circles concept Google came up with was exactly what I wanted, and I couldn't wait to jump ship.

So the very first opportunity I could, I signed up, made my circles, started using it.... and then over the coming days and weeks realized that if I actually wanted anyone I knew to see what I was doing, I had to post it on Facebook..... goddamnit.

The exact same thing happened when [Ello](https://ello.co/manifesto) came out. Finally! A company whose ethics and aversion to advertising are baked right into it's incorporation papers! A clean and fast interface!! Yes!!!!! But, Facebook remained a tragic necessity and nothing changed.

**Simply put, the way our current social media ecosystem works is that the platform is only as good as its members.** And since there was so much inertia built up in everyone's collective Facebook profiles and therefore no one was jumping ship with me, nothing changed. I remained shackled to the Facebook behemoth against my will. They used the existing participation of me and my connections to hold us all hostage to an ecosystem they (mostly) created: the closed social network.

Can you see the supreme paradox in that? The hope of a social network is that it will allow you to, you know, *network* with the world. It's supposed to be a wide open tool. But instead of creating a wide open network, they've created a bubble. This is called [data lock in](http://www.theregister.co.uk/2011/07/05/google_facebook_and_the_closed_web/), and it's actually a very intentional business tactic to try and control as much of your data and attention as possible.

I'm tired of it. So what to do?


### Why did we all forget about email?

Everyone has an email, although you probably don't really use it that often for personal things. But think about how it works for a second. If I have a gmail account, there's nothing stopping me from sending a message to someone with a hotmail account. Nothing at all. Aside from maybe some minor formatting differences, all the emails I receive, from email providers all the way from `yahoo.com` to `imail.ru`, will all work the same, and my contact list can include *literally anyone in the world* that has an email address from any provider.

Isn't that amazing? Think about it for a second. It's a truly universal system, one that doesn't require any weird hacks or linkages to just work. My account holds *all* of my emails in one place. If I don't like it, I can pick up and leave my email service and get a different one. People do it all the time.

How is that possible? By virtue of the [`SMTP`](http://www.makeuseof.com/tag/technology-explained-how-does-an-email-server-work/) standard that's how. `SMTP` is one of many internet protocols, which aren't programs or systems that anyone can own, but guides for how computers should format messages so that they can all reliably communicate with each other. Protocols are agreements between computer users saying that when one sends a message of a certain type, it will look a certain way. The internet is built on protocols, they're what make the whole thing possible, all the way from the most nitty-gritty bottom layers of sending data bits back and forth, to the highest level things like peer-to-peer file sharing or of course email.

The beauty of a protocol is that it isn't mandatory in any way. If people think it's smart, they can start writing programs that use it. And if it's really smart, lots of people will adopt it and eventually it will be ubiquitous. And if for some reason people don't like the protocol anymore, they can just stop using it and use something else. Things like this live or die purely on whether they make sense and people like them. And they allow anyone in the world using any particular computer system to participate. No one owns it, no one controls it, it's just an abstract concept. And even if large companies or organizations do try to force their standards on other people, there's nothing stopping everyone from just doing whatever they want.

So why doesn't social networking operate this way? Why can't I have a social account with any service I want, and use that service to work with anyone in the world, using any service they want? We need systems like this to prevent big companies like Facebook from abusing our reliance on them. We instead need an ecosystem where users are in complete control, and can create and share their data in any way they like.

A Social Networking Protocol would allow all us to do exactly that, and I've decided I'm going to design one. This post wasn't very technically oriented, but my next post about this will detail how it would work, and yet another post will detail what the social networking ecosystem could possibly look like if it caught on.

I can't do this alone. Any thoughts? Technical advice or considerations? Contact me! Someone's got to do it, it might as well be us.