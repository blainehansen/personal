---
title: "This Blog"
thesis: "I built this blog from the ground up, using the Meteor framework."
project: portfolio
date: 11/19/2015
tags:
- meteor
- javascript
- product-design
- systems-design
- web-design
---

Building the internals of this blog was the easiest part. The design was the hard part ha, I'm not a designer!

This was also a Meteor project, but I did a couple of unusual things to squeeze performance out of the app. I wanted as little per request computations as possible, so I decided to not use a database collection, but instead all articles are written in Markdown with Haml frontmatter to define the title and other metadata, gathered at bundle time, compiled into templates, and added to a client side collection by a build plugin. The collection `_id`, template name, and url slug are determined by the filename. So for example:

```md
<!-- filename-post.md -->
---
title: "Post"
thesis: "This is a post"
tags:
- stuff
- things
---

# Various Markdown

*things I believe*

* stuff
* others
* whatever
```

Would become available as a post at `blainehansen.co/filename-post`.

Having everything pre-compiled and sent to the client without need for database queries makes the whole site much lighter weight.