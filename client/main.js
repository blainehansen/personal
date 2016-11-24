Template.registerHelper('dehyphen', function (text) {
	return text.replace(/-/g, ' ');
});

Template.registerHelper('youtubeEmbed', function (input, ratio, classes) {	
	ratio = ratio || '16by9';
	classes = classes || '';
	var give = '<div class="embed-responsive embed-responsive-' + ratio + ' ' + classes + '">'
	+ '<iframe src="http://www.youtube.com/embed/' + input + '" allowfullscreen></iframe>'
	+ '</div>';
	return Spacebars.SafeString(give);
});

Template.registerHelper('tagList', function () {
	var data = Template.currentData()
	var tagIdArray
	if (data.project === true) {
		tagIdArray = _.flatten(_.pluck(Posts.find({project: data._id}).fetch(), 'tags'))
	}
	else {
		tagIdArray = data.tags
		if (data.project)
			tagIdArray.push(data.project)
	}

	if (tagIdArray) return Tags.find({_id: {$in: tagIdArray}})
});

Template.registerHelper('recent', function () {
	return Posts.find({project: {$ne: 'portfolio'}}, {limit: 3, sort: [['date', 'desc']]})
});

Template.registerHelper('articleTitle', function (postId) {
	return Posts.findOne(postId).title
});

Template.registerHelper('articleDate', function (date) {
	date = moment(date)
	return date.format('MMMM Do YYYY') + ' (' + date.fromNow() + ')'
});


ScrollHighOnPage = new ReactiveVar(true);
function scrollHeightListener (e) {
	ScrollHighOnPage.set(window.scrollY <= 300);
};
scrollHeightListener();
window.addEventListener('scroll', scrollHeightListener);

Template.layout.events({
	'click #sticky button': function (e, t) {
		window.scrollTo(0, 0)
	}
});

Template.layout.helpers({
	hideToTopButton: function () {
		return ScrollHighOnPage.get()
	}
});

Template.footer.helpers({
	onBlogPost: function () {
		return Router.current().route.getName() == 'blogPost';
	}
});


Template.spitTag.helpers({
	giveClass: function () {
		var context = this.context
		var rest = _.omit(this, 'context')
		context = _.extend(rest, context)

		var defaultColor = (context.project ? 'project' : 'primary')
		var colorArg = context.color
		var sizeArg = context.size
		var give = ''
		give += 'btn-' + (colorArg ? colorArg : defaultColor);
		give += ' btn-' + (sizeArg ? sizeArg : 'lg');

		return give
	},
	givePathRoot: function () {
		var project = (this.context || this).project
		return project ? 'projects' : 'tags'
	}
});

Template.welcomeContent.helpers({
	featuredTags: function () {
		return Tags.find({featured: true});
	}
});