Router.configure({
	layoutTemplate: 'layout'
});
Router.setTemplateNameConverter(function (str) { return str; });

Router.route('/', {
	name: 'home',
	layoutTemplate: 'homeLayout'
});