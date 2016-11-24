var configTags = [
	// projects
	{_id: 'social-network-protocol', project: true, description: "A streamlined communication format to make the social networking ecosystem not completely stupid."},
	{_id: 'portfolio', project: true, description: "My portfolio of programming projects."},
	// {_id: 'impressions', project: true, description: "A free-for-all painting and classical piano performance."},

	// general purpose topics
	{_id: 'culture', color: 'info'},
	{_id: 'star-wars'},
	{_id: 'fiction', color: 'info'},
	{_id: 'crowdfunding', color: 'success'},
	{_id: 'technology', featured: true},

	{_id: 'programming', color: 'warning'},
	{_id: 'rants', color: 'danger', description: 'Wherein I get pissed at stuff.'},
	{_id: 'politics', color: 'danger'},
	{_id: 'business', featured: true, color: 'danger'},

	// specific technologies
	{_id: 'meteor', color: 'info'},
	{_id: 'android', color: 'success'},
	{_id: 'javascript'},
	{_id: 'python', color: 'info'},
	{_id: 'ruby', color: 'danger'},
	{_id: 'php', color: 'warning'},
	{_id: 'java'},
	{_id: 'mysql'},
	{_id: 'unix'},
	
	{_id: 'product-design'},
	{_id: 'web-design', color: 'success'},
	{_id: 'systems-design', color: 'warning'},
	{_id: 'designing-the-world', featured: true, color: 'success', description: 'Making the world a better place takes two steps: coming up with better ways to do things, and implementing those better things. This is about that first step.'},

	// {_id: 'music', color: 'info', featured: true},
	// {_id: 'classical-music', color: 'info'},
	// {_id: 'relationships'},
	// {_id: 'look-i-fixed-it', color: 'success', description: "I take things that are broken and fix them."}
];



Posts = new Mongo.Collection(null);
Tags = new Mongo.Collection(null);
// Portfolio new Mongo.Collection(null);

Schema = {};
Schema.Post = new SimpleSchema({
	date: {
		type: Date
	},
	title: {
		type: String,
		trim: true
	},
	thesis: {
		type: String,
		trim: true	
	},
	tags: {
		type: [String],
		allowedValues: _.pluck(configTags, '_id'),
		optional: true
	},
	project: {
		type: String,
		allowedValues: _.pluck(_.where(configTags, {project: true}), '_id'),
		optional: true
	},
	repo: {
		type: String,
		optional: true
	},
	demo: {
		type: String,
		optional: true
	}
});
Posts.attachSchema(Schema.Post);
// Portfolio.attachSchema(Schema.Post);

Schema.Tag = new SimpleSchema({
	_id: {
		type: String,
		trim: true
	},
	featured: {
		type: Boolean,
		optional: true
	},
	color: {
		type: String,
		trim: true,
		optional: true
	},
	description: {
		type: String,
		trim: true,
		optional: true
	},
	project: {
		type: Boolean,
		optional: true
	}
});
Tags.attachSchema(Schema.Tag);


for (tag in configTags) {
	Tags.insert(configTags[tag])
}