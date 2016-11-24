---
title: "Current Piano Studio Website"
thesis: "I built my current piano studio website with Meteor, and it has several interesting features."
project: portfolio
date: 11/16/2015
repo: https://github.com/blainehansen/piano-studio
demo: http://blainehansenpiano.com
tags:
- meteor
- javascript
- product-design
- systems-design
---

This was the very first Meteor project I completed, and the framework hadn't even reached it's `1.0` version yet. Lots has changed since then, and lots of really helpful ergonomic packages have come out.

The current Blaze templating engine hadn't yet been implemented, and I was working with Spark at the time (see what they did there?). Spark didn't play very nice with things like jquery plugins, so it was a frequent problem that DOM manipulated by javascript would cause elements to erroneously disappear or be rendered as escaped text. [I asked a stackexchange question about it](http://stackoverflow.com/questions/22306174/meteor-bootstrap-modal-breaks-when-handlebars-values-change), and simply had to use the recommended hack until Blaze came out.

I hadn't yet discovered `aldeed:simple-schema` (or it didn't exist), so things like `autoForm` and automatic validation weren't available. That means that most of the code in this site was simply doing form input gathering and validation, and most of that is clustered in the backend admin page. I used this admin page to keep track of everything in the piano studio, lessons and payments and sheet music books I sold. It was originally my plan to make the site capable of accepting card payments, but all of my students had at that point gotten used to the rhythm of either cash or check, so there was no need to implement something like that. The rigors of making it secure and PCI compliant etc were just too much to justify for that simple operation where all my customers dealt with me in person every week.

The most interesting feature is the front page background picture slideshow, which I for some reason decided to implement myself instead of using a plugin (I was just starting to use Meteor, and plugins sometimes had problems as I mentioned earlier). A benefit of doing it myself was that I could simply plug my `Stories` collection (which basically held all of my actual content) into the slideshow. The `{featured: true}` option could allow me to take a particular piece of content and pull it into the slideshow.

```js
Template.backgroundPictures.rendered = function () {
	var handle = Meteor.setInterval(function () {
		var currentSlide = $('.background-slide.top');
		var nextSlide = currentSlide.next('.background-slide');
		if (!nextSlide || nextSlide.length === 0) nextSlide = $('.background-slide').first();

		var currentText = $('.features.top');
		var nextText = currentText.next('.features');
		if (!nextText || nextText.length === 0) nextText = $('.features').first();

		currentSlide.removeClass('top');
		nextSlide.addClass('top');

		currentText.removeClass('top');
		nextText.addClass('top');

	}, 9000);
	Session.set('slideshowIntervalHandle', handle);
};
Template.backgroundPictures.destroyed = function () {
	Meteor.clearTimeout(Session.get('slideshowIntervalHandle'));
};
Template.backgroundPictures.helpers({
	slides: function () {
		return Stories.find({featured: true});
	}
});
```
```css
.slideshow-transition {
	.generic-transition();
	opacity: 0;
	&.top {
		opacity: 1;
	}
}
#featureContainer {
	position: relative;
	.features {
		.slideshow-transition();
		position: absolute;
		top: 0;
		background-color: transparent;
		color: @studio-content-text-color;
		h1 {
			font-family: @studio-feature-header-font;
		}
		p {
			font-family: @studio-feature-caption-font;
		}
	}
}
.background-slide {
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: -10;

	.slideshow-transition();
}
```

The site also has a page with student repertoire available for download, and it's categorized by difficulty and composer. This is a dynamic area, responding to the contents of a database.

```javascript
Template.repertoireHome.helpers({
	levels: function () {
		var levels = [];
		var composers = [];
		var pieces;
		var level, levelObj;
		var composer, composerRecord, composerObj;
		for (level = 0; level <= 11; level++) {
			pieces = _.groupBy(Pieces.find({level: level}).fetch(), 'composer');

			for (composer in pieces) {
				composerRecord = Composers.findOne(composer);
				composerObj = {composer: composer, name: composerRecord.name, pieces: pieces[composer]};
				composers.push(composerObj);
			}

			levelObj = {level: level, composers: composers};
			composers = [];
			levels.push(levelObj);
		}

		return levels;
	}
});
```
```html
<template name="repertoireHome">
	<p>Here's a list of songs I've either edited or found good editions for.</p>

	{{|#each levels}}
		{{|#if equals level 0}}
			<h3><a data-toggle="collapse" data-target="#level-{{|level}}">Primer Level</a></h3>
		{{|else}} {{|#if equals level 11}}
			<h3><a data-toggle="collapse" data-target="#level-{{|level}}">Beyond Categories</a></h3>
		{{|else}}
			<h3><a data-toggle="collapse" data-target="#level-{{|level}}">Level {{|level}}</a></h3>
		{{|/if}} {{|/if}}

		<div id="level-{{|level}}" class="collapse">
			{{|#each composers}}
				<strong>{{|name}}</strong>
				<ul>
					{{|#each pieces}}
						<li>
							{{|title}}: <a href="/scores/{{|composer}}/{{|score}}" target="_newtab">Score</a>
							{{|#if levelUpper}}. This is a collection. It has pieces ranging from {{|level}} to {{|levelUpper}}.{{|/if}}
							{{|#if videoid}}, <a href="{{|youtubeLink videoid}}" target="_newtab">Video</a>{{|/if}}
						</li>
					{{|/each}}
				</ul>
			{{|/each}}
		</div>
	{{|/each}}
</template>
```

I would have loved to know about Jade when I was doing this project. It was an early project though, my first complete web app, and a great learning experience.