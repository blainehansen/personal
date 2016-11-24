---
ignore: true
title: "Wordpress Sucks, and it's losing you money."
thesis: "Feel like you're throwing money at developers just to get a sub-par Wordpress site? Wordpress and PHP are 90's dinosaurs that you should ditch immediately and get something good."
date: 10/23/2015
tags:
- business
- technology
---

So you have a Wordpress website for your business. I have some wild off the top of my head guesses about it:

* It's broken all the time. Most of the money you spend on it is fixing things.
* Major bugs in the site are currently preventing your business from meeting its goals.
* You have a couple of features you think would be really cool for the site, either on the customer side or on your admin panel, but you either haven't even brought them up because they simply seem too ambitious, or you've talked to developers about them and they shot them down, or they're currently "in development" and seem to never materialize.
* Everything seems to take forever to happen. Developers seem to have more words than solutions.
* No one loves the look and feel and you'd love to get a fresh appearance, but doing so would be too costly.


### All of this adds up to one thing: you're unsatisfied with your business website and it's holding you back from greater success.

So how did I guess all that? All without even knowing your company or looking at its systems? Because those problems are endemic to Wordpress and PHP, and just about every Wordpress site I've ever seen was in a similar state of disarray.

So, *why*? Why is Wordpress so bad specifically?

That question is pretty technical, and perhaps someday I'll write about it in detail. For now here's the short version.

<!-- so the full answer is a long one. [Here's the long version if you're interested](/wordpress-meteor-smackdown) -->

I'm going to compare some of Wordpress' qualities with another web framework called Meteor. I love Meteor, and ever since I discovered it I've used it for every single one of my web projects. And frankly, Meteor going toe-to-toe with Wordpress is kind of embarrassingly unfair. It's like comparing a wooden stick to a lightsaber.

**Slow local development setup process.**

Getting a PHP site set up on my computer takes at least a half hour, and occasionally takes *hours* of annoying configuring and bug fixing. Meteor site setup involves 2 or 3 console commands and about 30 seconds. Meteor doesn't have to be configured, and I've never had it break.

**No Appearance/Behavior separation.**

The Appearance and Behavior of your site are handled by different types of code. In Wordpress and PHP, those types aren't separated by default, so they're usually mangled together, and changing one without changing the other is hard. Meteor has separate files for Appearance and Behavior, so it's easy.


**Complete server request on every page visit, making browsing slow.**

In a Wordpress or PHP site, every single time a user visits a new page, a full page request is made to the server, which makes the user wait for a very slow process. Meteor loads all of the site's templates in the background when a user first visits the site, so when they change pages, its already loaded and merely needs to be instantaneously switched into their window. The only time a Meteor site makes server requests is when new database records are needed, and these requests are made in the background without disrupting the user's experience.

**No built in features for instant reactivity.**

Want a system on your site where things like notifications or news stories update without the user having to do anything at all? Wordpress has no built in support for these type of automatic changes, or "reactive updates". Special Javascript libraries will have to be awkwardly grafted into your Wordpress implementation. Meteor does this automatically. It's just built in. Database changes that are relevant to a particular user are pushed to them without any extra code.

**Regular breaking updates.**

Wordpress regularly has semi-mandatory or automatic updates that break things. Although it's sometimes absolutely necessary for updates to break old code, they shouldn't do so on a regular basis, and shouldn't be semi-mandatory or automatic. Meteor only updates if a developer manually chooses to. And I've personally decided in my development work to guarantee all my clients that their site will continue to work as promised, even if I have to apply updates for security reasons. I'll fix any update bugs for free if they happen to appear.

**No unified code-base.**

Wordpress is written in PHP and Javascript is an unavoidable part of web development. More languages means it's more difficult to find developers. Meteor is Javascript *everywhere*. All one language, on server and browser, making for a unified code-base and easier development.

**A predatory plugin marketplace.**

Most Wordpress plugins are poorly coded and over-priced garbage. Meteor has a [robust and ever growing community package system](https://atmospherejs.com/) that makes it incredibly easy for new features to be added, that are all completely free. These packages aren't meant to be added by non-developers, but how often have you added a plugin and had it just work, without any developer help? What you give up in accessibility, you gain back tenfold in power. These packages aren't built to handle every layer of a problem, but instead handle different layers of problems. They are lightweight, customizable, and can be easily clicked together to accomplish your goals in exactly the way you need.

**So what should you do?** How can you truly solve these problems and make your site competitive?


### Have your site rebuilt with a good framework.

I know what you're thinking. **Throw it all out!???!! How is starting over a good solution??** You're thinking that this course of action could only be more expensive, more time-consuming, result in a worse product. You're probably thinking that if your website *works*, then why throw it out? It's serving the customers' needs right? Sure it isn't perfect, but is anything perfect? Hasn't the current website stood the test of time?

You aren't *completely* wrong about this. [Here's an article by the very smart Joel Spolsky](http://www.joelonsoftware.com/articles/fog0000000069.html), saying that one of the biggest mistakes a programming project can make is to start over. *But.....* his points rely on some incredibly important assumptions:

**He was writing this back in 2000.**

The difficulty of writing functional programs has plummeted since then. There's a lot more information to absorb now, but lots of smart people have done a lot of great work making programming faster and more ergonomic. So, the cost of starting over a project is much lower. 

**Big software, big team.**

Some of the examples of failed start-over projects he gives are Netscape, dBase for Windows, and Quattro Pro. Those were huge projects, possibly involving tens of thousands or hundreds of thousands of lines of code, and huge teams of tens or hundreds. The larger the project and the larger the team, the larger the cost to start over. A modestly sized business website is honestly a very small project with modern tools like Meteor, one that can conceivably be completed in a few weeks by one person.

**Same language and architecture.**

He's talking about taking a program written in one language and architecture, and simply rebuilding it in *the same language and architecture*. There all you're counting on improving is the ever nebulous "developer performance", which you can't actually count on improving at all. But if you drastically improve the tools used to build the program, you can count on improvement roughly equal to the superiority of the tools you've chosen.

**Same overall product.**

The failed projects were simply trying to improve an existing product, they weren't reimagining them, or adding innovative or ambitious features. If you're trying to take a product to new heights, to do things that were never even imagined during it's design, isn't it possible that original design just isn't up to the task?

And maybe you don't want to reimagine your site right now, but do you think you'll *never* have to? In the web business world, that's definitely a losing bet.

**Those programs *worked*.**

Be honest with me, does your website work? I mean really **work**, as in does it make your life easier? Does it *create* problems for you or *solve* problems for you? Perhaps it "works" by a certain definition, people can look at it and maybe even have accounts and buy things or whatever. But does it do everything it should? Sometimes to really start moving forward quickly, we have to evolve. We have to leave behind things that have been comfortable for a long time. In the words of Marshall Goldsmith, "what got you here won't get you there."


### It's going to be okay.

I know how you feel. It's scary for you to imagine completely rebuilding your website from scratch. But what if the thing being thrown out *really is **that** bad?*

<!-- Imagine someone who wanted to build a house entirely out of [adobe bricks](http://www.wikihow.com/Build-an-Adobe-Wall). That has the potential to be a great idea. Adobe bricks are a time-tested building material, and in certain climates they're incredibly robust. But.... this person is building in a rain forest.... -->

<!-- So let's say they've spent a year building, and they've indeed created a house that is acceptably livable. Of course they have to constantly make water damage related repairs, vines are creeping through cracks in the walls, and various animals are building their own homes in the porous walls. -->

<!-- So they're tired of all this constant maintenance, and considering their options. Is the best strategy to continue with the adobe? Getting better builders to use more robust adobe brick practices to shore up the house? No, the best way forward is to *build a new house from proper materials.* And this especially true if want to improve the house further, adding new rooms or appliances or whatever. Restarting will prevent a lot of pain in the long run. -->

<!-- Building a site in Wordpress is a lot like using adobe bricks. Wordpress is great for quickly and cheaply getting a simple blog or pure content website up and running, but for anything more complex it's a nightmarish hassle. -->

This quote comes to mind:

> Progress means getting nearer to the place you want to be. And if you have taken a wrong turning, then to go forward does not get you any nearer.
>
> If you are on the wrong road, progress means doing an about-turn and walking back to the right road; and in that case the man who turns back soonest is the most progressive man.
> <footer><cite>CS Lewis</cite></footer>

You're a business person. Your definition of progress is better revenues, better user retention, better market share. Having a perfectly acceptable website that's difficult to fix and improve is *not* going to get you those things. Your technology needs to be adaptable, to react quickly to your customers and competitors, and serve users' needs *well*, not just serve them. Your business doesn't exist to serve the website, the website exists to serve the business. If it can't adapt, isn't reliable, and repels truly ambitious features, then it isn't good enough. Wordpress can never accomplish those things. You need to start over.

This decision may hurt at first, but you don't have to throw out your current site in order to replace it. Things will be normal for a while, and then your new amazing site will be done, and it can be popped into your url. Since the new system is superior, it won't be terribly long before the new work catches up with the old work, and then you will have a solid foundation to build a new and better future on.

You've been throwing good money after bad. It will be faster and cheaper to start over with a quality tool rather than fight with an inferior one. Every job is easy with the right tools.

Stop bringing in developers just to get things to work. Stop throwing money at something without it growing or improving in any meaningful way. You shouldn't have to live like that. Hiring developers should be exciting, should be a way to realize a new vision you have, to implement exciting new strategies you've come up with, or to make the site ever more beautiful. Wordpress is the shackle holding you back from that reality.