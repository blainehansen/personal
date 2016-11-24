---
title: "Very First Website, Piano Studio"
thesis: "The first website I ever built and deployed, when I was just barely learning about web development. It isn't well made, but I see myself in it."
project: portfolio
date: 11/01/2015
repo: https://github.com/blainehansen/php-piano-studio
tags:
- programming
- php
- python
---

Back in the dark ages before I had discovered any useful web frameworks, I used PHP to create my piano studio website. Needless to say this made it sorely limited, but I did it!

Looking back at this site makes me laugh, but it also makes me proud since even back when I had such a rudimentary understanding of the web development world I was designing for ergonomics and refusing to repeat myself. I essentially designed a primitive version of [markdown](http://daringfireball.net/projects/markdown/syntax) for this project, just so that I wouldn't have to write raw html in my content files. I didn't succeed entirely, since some html structures that I originally didn't expect to use would pop up and I didn't have time to build them into the system, but I still appreciated the saved time and increased readability.

The site essentially worked like this:

* First the `buildsite.py` script gathered all of the files into the actual site directory structure.
* Then it used the `config.txt` file to parse which content files should be included in the actual site. Each file to be included was built into the navigation, and also given it's own directory with an `index.php` with its contents. I did all of this to have pretty urls without filename extensions, and to have an extensible system that in the future would only require me to create a content file and add it to the `config.txt`.
* Each `index.php` contained the following after being compiled. It's a `php` mess ha. We have the obvious `includes` to have the basic template structure, and then the call to the `body` function, described next.
```php
"""<?php
include('../header.php');
include('../body.php');
body('"""+ file_names[i] +"""');
include('../nav.php');
include('../footer.php');
?>"""
```
* The `body.php` and the `body` function took a name for a content file, grabbed the contents of that file, and then compiled it into actual html.
* Content `.txt` files were written in my primitive pseudo-markdown, with tabs separating the different blocks of text, which were each wrapped in a `div.block`. Different starting characters could signal an unusual block:
	* `#` indicated this was the name of a picture. It would output `<div class='block'><img src='../resources/pictures/$string.jpg'/></div>`
	* `@` indicated this should be output exactly as is without a wrapping `div`. I used that for javascript.
	* `/` indicated this should be ignored. Essentially a comment. 

This was in effect a primitive version of a CMS. I would write pages, change a config file, and the site would somewhat intelligently handle placing that page in a directory and including it in the navigation.

This project has some unnecessary layers in it, and if I were redoing it now (I never will of course) I wouldn't even use `php` at all. This site only has static content, so the php layer is completely unneeded. I would instead simply use Jade and Markdown in tandem to compile a completely static site.

It developed like this because when I first wrote it, `php` was the only web language I knew that was actually capable of performing computations. Since I knew I wanted my content files to be compiled from some sort of minimal html (I wish I had known about markdown!), I needed a computational layer to produce that, and `php` was the only tool in my box at that point. I added the python config process after the `php` was already working and put together, so since I was just trying to get something finished and facing the world ([done comes before perfect after all](/done-before-perfect)), it all ended up Frankensteined together. By the time I had an opportunity to revisit it I had more skills and decided to [scrap the whole thing in favor of Meteor](/meteor-piano-website).

Looking back, I'm not really proud of the product at all. So why did I include it in my portfolio? Because it shows that I have a *personality* of efficiency and automation, of [being the barrel not the bullet](http://jumpcutstudios.tumblr.com/post/126545155797/jumpcutvalues). I can see the seeds of my abilities planted, and my typical obsession with "dry" practices and doing things in unconventional ways to save myself time. I love seeing my personality laced throughout this code, despite at the time having little experience or ability to build something of high quality.