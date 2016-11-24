---
ignore: true
title: "@you.anywhere: a truly global username system"
thesis: "Your twitter username belongs to twitter, and all your other usernames are a similar story. But what if your username truly belonged to you?"
date: 12/25/2015
project: impressions
tags:
- business
---

Read my other article about a universal social protocol. Then come back.

When I signed up for my twitter, I wanted @blaineh. It was clean and simple. But it was taken.

If you want to have the same username across all the username utilizing sites, you're really going to have to do some linguistic acrobatics.

So what if usernames worked the same way as website addresses? Theoretically I could have any website name I wanted, as long as I was cool with having a different namespace on the end. I wanted `blainehansen.com`, but I was able to get `blainehansen.co` instead, which I actually kind of like more.

So a simple new format: @localname.namespace

Within one person's connection network, it's actually pretty unlikely that they'll have two people with even the same localname, so when they're writing messages and mentions, they could simply refer to them as @localname and the app would expand that in whatever satisfying way they wanted. And if someone did have a conflict, then they'd just have to specify or write it all out. Not so bad.

These usernames themselves should be completely service agnostic, unlike the current generation of email addresses. They would be globally pointed to the service that is currently managing them, much like DNS points to the server that's currently handling a given site name. Site names are completely host agnostic, and usernames should be completely service agnostic.

This is actually incredibly elegant, since now a useful abstraction of "@person.whatever and place.domain" is created. And these also flow along nicely with what is now a universal (but completely unguided!) protocol of [hashtags](http://www.theverge.com/2013/2/7/3960580/hashtags-are-bigger-than-twitter-vine-tumblr-instagram). It's beautiful, the internet is a place of @people.namespace, places.domain, and #ideas.