Router.configure({
	layoutTemplate: 'layout'
});
Router.setTemplateNameConverter(function (str) { return str; });

Router.route('/', { name: 'home' });


Router.route('/blog', {
	name: 'blogIndex',
	data: function () { return Config.posts; }
});
Router.route('/blog/:post_id', {
	name: 'blogPost',
	data: function () { return _.findWhere(Config.posts, {_id: this.params.post_id}); }
});

Router.route('/projects', {
	name: 'projectsIndex',
	data: function () { return Config.projects; }
});
Router.route('/projects/:project_id', {
	name: 'project',
	data: function () { return _.findWhere(Config.projects, {_id: this.params.project_id}); }
});

Router.route('/categories', {
	name: 'tagsIndex',
	data: function () { return Config.tags; }
});
Router.route('/categories/:tag', {
	name: 'tag',
	data: function () {
		var creations = _.union(Config.posts, Config.projects);
		var tag = this.params.tag;
		return _.filter(creations, function (creation) {
			return _.contains(creation.tags, tag)
		});
	}
});