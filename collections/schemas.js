// // SimpleSchema.messages({
// // 	"invalidRelation": "The [label] you tried to insert doesn't line up with a real object: [value]",
// // 	"feedback": "[value]",
// // 	"passwordMismatch": "Your passwords don't match!",
// // 	"phoneProvider": "That type of phone number shouldn't have a provider"
// // });

// Schema = {};
// Schema.Post = new SimpleSchema({
// 	title: {
// 		type: String,
// 		trim: true
// 	},
// 	thesis: {
// 		type: String,
// 		trim: true	
// 	},
// 	content: {
// 		type: String
// 	},
// 	tags: {
// 		type: [String],
// 		allowedValues: TagList
// 	}
// });
// Posts.attachSchema(Schema.Post);

// Schema.Project = new SimpleSchema({
// 	title: {
// 		type: String,
// 		trim: true
// 	},
// 	summary: {
// 		type: String,
// 		trim: true	
// 	},
// 	content: {
// 		type: String
// 	},
// 	tags: {
// 		type: [String],
// 		allowedValues: TagList
// 	}
// });
// Projects.attachSchema(Schema.Project);