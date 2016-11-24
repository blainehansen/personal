---
ignore: true
---

### Slow local development setup process for developers.

When a developer begins working on a new web project, the first step is invariably to set up the project on their own computer (their "local device"). They do this so that they can see the effects of their changes quickly, without having to upload their changes to and restart some remote server. Doing this with a PHP site and Wordpress is incredibly annoying, and involves (at least) these steps:

* Download project code (or a blank Wordpress setup if this is a new project).
* Place in `/var/www/project` folder, give administrator permissions over this folder to apache server and any other programs that need to deal with it.
* Configure `.htaccess` and other apache server files to make sure everything's working properly. This is always more work than it should be, and inevitably you have several irritating surprise bugs to deal with.
* Set up the local Wordpress database, again messing with configuration files (again a source of immense potential annoyance).
* Set up the local Wordpress configuration files (again, annoying).
* Possibly restart apache and mysql servers.
* After making any changes, manually restart the server and wait for everything to update.


After all these steps, and a minimum of roughly a half hour of work (and potentially *hours* of annoying bug fixing), the developer hasn't even *started* working. All of that was just to set things up, and no value adding problem solving has been done.

Meteor on the other hand:

* Download project code (or run `meteor create projectname` in the command line) to any folder they want.
* Run `curl https://install.meteor.com/ | sh` to install Meteor (only necessary if you haven't already done this in the past).
* Run `meteor` in project folder.

.... that's it. The project is ready to view, and will automatically restart or update when you make any changes.

Getting a Meteor project running from nothing takes basically no thinking. It can be done in 30 seconds, and rarely if ever has any setup problems or bugs. A developer can go from not involved in the project to actively solving problems for it in next to no time.

### No behavior/appearance separation.

A website has basically two types of code, code to make things *behave* a certain way, and code to make things *appear* a certain way. The Behavior code does things like sign in users, add or remove items from databases, send emails, do math, etc. Appearance code simply describes how big boxes are, what words are in what places, what colors and shapes and fonts everything is. This Appearance layer is the most obvious to you as the business owner, since that's what determines the look and feel of the site.

Now, in a *good* system, those two layers are neatly separated by default, each in it's own space in the code, so that if you want to change one layer but not the other, you can easily do so without sifting through a bunch of irrelevant stuff. But in *Wordpress* (and PHP in general), there's nothing to stop those two layers from being mushed together entirely. Almost every single Wordpress and PHP site I've ever worked with had a horrifying behavior/appearance mangle, so that changing anything became more of a task in picking apart the different pieces then in actually making the changes.

Meteor on the other hand has that separation baked into the entire system, so that mangling the two together is actually more difficult than doing it the right way. There are `controller` files and there are `template` files, each handling Behavior and Appearance respectively, and if you want to make changes to only one, it's very easy to do so.

### Complete server request on every page visit, making browsing slow.

In a Wordpress or PHP site, every single time a user visits a new page, a full page request is made to the server. The slowest thing in web programming is communication with the server, and the user has to wait for the server to make it's computations, and respond with the page. This is very slow, often involves the user making the same few requests over and over again as they switch between different parts of the site, and doesn't show the user *anything* before the request has fully completed.

Meteor is a "Single Page Application". When a user first visits the site, the page they're looking for is sent to them, but then *all of the site's templates* also begin to send in the background. This means that the user doesn't have to wait for a server request every time they change pages, because the page is already loaded and merely needs to be instantaneously switched into their window. The only time a Meteor site makes server requests is when new database records are needed, and these requests are made in the background without disrupting the user's experience.

### No built in features for instant reactivity or communication.

Let's say you were building a news site, with a page containing all of the day's stories in a list. Wouldn't it be cool if that list updated automatically? If new stories simply appeared without the user having to do anything at all? Or maybe you want a notification system, where users get pop up messages about new activity? Guess how hard that's going to be with your Wordpress site.....

Wordpress has no built in support for these type of automatic changes, or "reactive updates". In order to build that sort of system, your developers are going to have to spend some time finding, understanding, and using some sort of Javascript library, and whatever they do will be awkwardly grafted into your Wordpress implementation.

Meteor does this automatically. It's just built in, simple as that. Database changes that are relevant to a particular user are pushed to them without any extra code. Done.

### Regular breaking updates.

A Digital Marketing Consultant I sometimes work with put it best:

> While no website can really go very long (months+) without some developer attention, wordpress requires monthly maintenance (WP updates, plugin updates, security updates, then fixing whatever those updates break) and I'm definitely tired with this never-ending cycle of update-break-fix.

These types of updates are basically mandatory in Wordpress. They bug you about them in the admin panel, and sometimes just happen automatically. And the updates *regularly* break things and demand work to get everything back on track.

I think this is equally the fault of Wordpress as a technology and the developers that are selling Wordpress sites. Although it's sometimes absolutely necessary for updates to break old code, they shouldn't do so on a regular basis, and those updates certainly shouldn't be semi-mandatory or automatic. And developers shouldn't sell a site and then leave their customers high and dry when essential security or bug updates end up causing problems.

Meteor only updates if a developer manually chooses to, and your site will *never* bug you about doing so. And I've personally decided in my development work to guarantee all my clients that their site will continue to work as promised, even if I have to apply updates for security reasons. I'll fix any update bugs for free if they happen to appear.

### Clunky language that makes every task take more lines of code than it should.

Just trust me on this one. PHP is awful.

### No unified code-base.

Wordpress is written in PHP (see above point). But then, in order to have an even reasonably neat website, *some* amount of Javascript will have to be written. Javascript is basically the universal language understood by browsers, so it's an unavoidable part of web development. What this means for you is that your website is now unnecessarily fragmented into two types of code, PHP to handle stuff on the server, Javascript to handle stuff on the user's browser. And that means the developers you hire either have to be skilled with both languages, or you have to hire double the people.

And to make things even worse, occasionally your developers will need to do some sort of random server task (regularly backing up databases, cleaning up some sort of cache files, sending regular emails, whatever), and they'll probably have to do so in yet another random language (Python, Ruby, C++) since PHP won't have the capability to handle the job. 

Meteor is Javascript *everywhere*. All one language, on server and browser. Even things like regular maintenance can be scheduled to run with Javascript programs. And the Meteor package system even makes it possible to leverage programs written in other languages from your Javascript. Everything can all be easily handled in the same language, making for a unified code-base and easier development.

### A predatory plugin marketplace.

Buying plugins for Wordpress is a terrifying prospect. Huge chunks of them are poorly coded and over-priced garbage that rarely even provide the functionality they promise to, let alone do so elegantly. 

Meteor has a [robust and ever growing community package system](https://atmospherejs.com/), that makes it incredibly easy for new features to be added. Oh and they're all completely free. Now, these packages aren't meant to be added by non-developers, but how often have you added a plugin and had it just work, without any developer help? I'm guessing basically never.

The cool thing about these packages is that they aren't built to handle every layer of a problem, but instead handle the most difficult parts. This means they can be very lightweight, customizable, and can be easily clicked together to accomplish your goals in exactly the way you need.