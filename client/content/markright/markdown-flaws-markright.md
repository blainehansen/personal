---
ignore: true
---

I suppose I want to 

http://blog.codinghorror.com/the-future-of-markdown/

http://blog.codinghorror.com/responsible-open-source-code-parenting/

> When it comes to humane markup languages for the web, I don't think anyone's quite nailed it like Mr. Gruber.

There are only four types of meaningful content whitespace in the real web: spaces between tokens, linebreaks, breaks between block level elements, and whitespace in `<pre>` blocks. Requiring indents to indicate things like code or indented list items is absurd.

The fact that the Stack Overflow editor has hotkeys dedicated to doing things like indenting code blocks is a perfect example of what I'm talking about. Pressing the tab button in a web environment doesn't work from a content editing perspective, but jumps you around the page, and indenting with spaces manually is annoying and error-prone. Space indents have been managed in desktop editors by the indent key, but that obviously doesn't work here.

Maintaining the "connecting" lines filled with single `>` characters is annoying.

Goals of a new Markdown specification: 

* Easy to read.
* Easy to write *regardless of environment*.
* Canonical.


Inline: a chunk of text separated by only one newline.
Block: a chunk of text separated by at least two newlines.
Block Series: several text blocks of the same uninterrupted type that will be combined into one html block element. By definition a container block.