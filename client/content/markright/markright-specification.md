---
ignore: true
title: Markright Specification
---

# Markright

Markright is a simplified and also enhanced flavor of markdown, built for the modern web. It's optimized for ease of use, and can be written quickly and effortlessly without any editor tricks. The biggest thing is making whitespace less of a complication, and returning it to more of a semantic content role.

It also allows you to add essential html qualities to your content, without always having to resort to html tags.


## Paragraphs

Line breaks shouldn't require special formatting, they're meaningful to content. Paragraphs separated by only one newline are grouped into one paragraph with a line break. More than one newline creates separate paragraphs.


## Headers

Only hash headers.


## Blockquotes

Only beginning of blocks. Consecutive quote blocks are grouped into the same quote tag. This rule also applies to anything nested. Quote blocks are broken by any other type of non-quote block. Markright paragraph rules apply within blockquotes.

> If you really want to hear about it, the first thing you’ll probably want to know is where I was born,
In the first place, that stuff bores me,

> Besides, I’m not going to tell you my whole goodam autobiography or anything.

>> That isn’t too far from this crumby place, and he comes over and visits me practically every week end.
He’s going to drive me home when I go home next month maybe.


## Lists

Only asterisks for unordered lists. Only plus signs for ordered lists. Hyphens continue list items when paragraphs are separated.

All of these blocks are encased in their own paragraph.

* This is a list item with two paragraphs.

- This is the second paragraph in the list item. No more indenting.
Just a hyphen that signals the continuation of this list item.

* A separate item in the same list.

Then:

* Item
thing
* stuff
* other

None of these are separate paragraphs, but the "thing" item is on it's own line, because of the linebreak.

* Stuff
- > This is a quote that is a part of the previous list item.
* Other stuff


## Code Blocks

Only fenced. Period. Absolutely no indent based code blocks.

```
function () {
	return 5 + 4;
}
```

becomes:

<pre><code>function () {
	return 5 + 4;
}
</code></pre>

The indent level of the initial fence is used as the baseline for all other lines in the block.

Indents are completely ignored in all areas other than preformatted blocks.

To get an only preformatted block without a code wrap:

```@
function () {
	return 5 + 4;
}
```

becomes:

<pre>function () {
	return 5 + 4;
}
</pre>

Github style code blocks with language parameters are also supported.

```javascript
function () {
	return 5 + 4;
}
```

<pre><code class="language-javascript">function () {
	return 5 + 4;
}
</code></pre>


## Horizontal Rules

Only asterisks. Must be at least 3 of them, and can be separated by whitespace if you'd like.


## Links

Everything is the same as with normal Markdown, but all 


## HTML Attributes

Any structure can have the normal valid range of html attributes added to it with the {} structure. For block elements, the starting marker should be unambiguously attached, either preceded or followed by the {} structure, which must be on it's own line and in the same block. Inline elements should be immediately followed, without any space, by {}. For example:

{id="box" class="thingy" margin-right="3px"}
```
code().stuff;
```

`code().stuff;`{id="box" class="thingy" margin-right="3px"}

Selector style ids and classes can be also be used.

`code().stuff;`{margin-right="3px" #box.thingy}

`code().stuff;`{#box.thingy}

{margin-right="3px" #box.thingy}
```
code().stuff;
```

```
code().stuff;
```
{#box.thingy}


## Normal Spans

Links are a specialized version of a span, so normal spans are made with a less specialized syntax. To make a normal span, simply wrap your content in a [] structure. Since a span isn't differentiated from it's surroundings without any ids or classes to style it differently, it is assumed that this [] structure will be immediately followed by an html attribute {} structure.

[Hello good sir!]{.important}

<span class="important">Hello good sir!</span>


## Inline Formatting

*bold* to <b></b>
~italic~ to <i>italic</i>
-strike- to <s>strike</s>