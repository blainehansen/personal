Router.configure({
	layoutTemplate: 'layout'
});
Router.setTemplateNameConverter(function (str) { return str; });
Router.plugin('dataNotFound', {notFoundTemplate: 'notFound'});

String.prototype.toProperCase = function () {
	return this.replace(/\w\S*/g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};


Meteor.startup(function() {
	if (Meteor.isClient) {
		return SEO.config({
			title: 'Blaine Hansen',
			meta: {
				description: 'Blaine Hansen is an iconoclastic musician, programmer, entrepreneur, and political agitator living in Salt Lake City. He wants human society to be free and asynchronous.'
			},
			og: {
				image: '/blaine-hansen-logo.png',
				site_name: 'Blaine Hansen'
			},
			twitter: {
				creator: '@blainehhansen',
				site: '@blainehhansen',
				image: '/blaine-hansen-logo.png'
			},
			auto: {
				twitter: true,
				og: true,
				set: ['description', 'url', 'title', 'image']
			}
		});
	}
});
Meteor.startup(function() {
	if (Meteor.isServer) {
		SeoCollection.update({route_name: 'blogIndex'}, {
			$set: {
				route_name: 'blogIndex',
				title: 'Blaine Hansen | Blog',
				meta: {
					description: 'Blaine Hansen\'s writings.'
				}
			}
		}, {upsert: true});
		SeoCollection.update({route_name: 'projectsIndex'}, {
			$set: {
				route_name: 'projectsIndex',
				title: 'Blaine Hansen | Projects',
				meta: {
					description: 'Blaine Hansen\'s projects.'
				}
			}
		}, {upsert: true});
		SeoCollection.update({route_name: 'tagsIndex'}, {
			$set: {
				route_name: 'tagsIndex',
				title: 'Blaine Hansen | Tags',
				meta: {
					description: 'Tags of Blaine Hansen\'s writings.'
				}
			}
		}, {upsert: true});
	}
});


Router.route('/', { name: 'home' });


Router.route('/blog', {
	name: 'blogIndex',
	// data: function () { return Posts.find({}, {sort: [['date', 'desc']]}); }
	data: function () { return Posts.find({project: {$ne: 'portfolio'}}, {sort: [['date', 'desc']]}); }
});
Router.route('/blog/:post_id', {
	name: 'blogPost',
	// data: function () { return Posts.findOne(this.params.post_id); },
	data: function () { return Posts.findOne({_id: this.params.post_id}); },
	onAfterAction: function () {
		if (!Meteor.isClient) { return }
		var post = this.data();
		SEO.set({
			title: 'Blaine Hansen | Blog | ' + post.title,
			meta: {
				description: post.thesis
			},
			og: {
				type: 'article',
				article: {
					published_time: post.date,
					tag: post.tags
				}
			},
			twitter: {
				card: post.thesis
			}
		});
	}
});

// startup weekend
// lambda lounge
// elm
// ycombinator startups
// Router.route('/portfolio', {
// 	name: 'portfolioIndex',
// 	data: function () { return Posts.find({portfolio: true}); }
// });
// Router.route('/portfolio/:project_id', {
// 	name: 'portfolio',
// 	data: function () { return Posts.find({portfolio: true, _id: this.params.project_id}); }
// });

// Router.route('/portfolio', {
// 	name: 'portfolioIndex',
// 	data: function () { return Portfolio.find(); }
// });
// Router.route('/portfolio/:portolio_id', {
// 	name: 'portfolio',
// 	data: function () { return Portfolio.findOne(this.params.portolio_id); }
// });

// Router.route('/bio');

Router.route('/projects', {
	name: 'projectsIndex',
	data: function () { return Tags.find({project: true}); }
});
Router.route('/projects/:project_id', {
	name: 'project',
	data: function () {
		// if (this.params.project_id == 'portfolio') Router.go('portfolio')
		return {
			project: Tags.findOne({_id: this.params.project_id, project: true}),
			posts: Posts.find({project: this.params.project_id}, {sort: [['date', 'desc']]})
		}; 
	},
	onAfterAction: function() {
		if (!Meteor.isClient) { return }
		var project = this.data().project;
		SEO.set({
			title: 'Blaine Hansen | Projects | ' + project._id.replace(/-/g, ' ').toProperCase(),
			meta: {
				description: project.description
			}
		});
	}
});


Router.route('/tags', {
	name: 'tagsIndex',
	data: function () { return Tags.find({project: undefined}); }
});
Router.route('/tags/:tag_id', {
	name: 'tag',
	data: function () {
		return {
			tag: Tags.findOne({_id: this.params.tag_id, project: undefined}),
			posts: Posts.find({tags: this.params.tag_id}, {sort: [['date', 'desc']]})
		}
	},
	onAfterAction: function() {
		if (!Meteor.isClient) { return }
		var tag = this.data().tag;
		SEO.set({
			title: 'Blaine Hansen | Tags | ' + tag._id.replace(/-/g, ' ').toProperCase(),
			meta: {
				description: tag.description
			}
		});
	}
});