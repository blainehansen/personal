// SimpleSchema.messages({
// 	"invalidRelation": "The [label] you tried to insert doesn't line up with a real object: [value]",
// 	"feedback": "[value]",
// 	"passwordMismatch": "Your passwords don't match!",
// 	"phoneProvider": "That type of phone number shouldn't have a provider"
// });

// Schema = {};
// Schema.User = new SimpleSchema({
// 	firstname: {
// 		type: String,
// 		label: "First Name",
// 		max: 15,
// 		trim: true,
// 		optional: true,
// 		custom: function () {
// 			var student = Students.findOne({user_id: this.fields('_id').value, reflectsUser: true});
// 			if (student) Students.update(student, {$set: {firstname: this.value}});
// 		}
// 	},
// 	lastname: {
// 		type: String,
// 		label: "Last Name",
// 		max: 15,
// 		trim: true,
// 		optional: true,
// 		custom: function () {
// 			var student = Students.findOne({user_id: this.fields('_id').value, reflectsUser: true});
// 			if (student) Students.update(student, {$set: {lastname: this.value}});
// 		}
// 	},
// 	phones: {
// 		type: [String],
// 		label: "Your phone numbers",
// 		optional: true
// 	},
// 	// "phones.$.number": {
// 	// 	type: String,
// 	// 	label: "Number",
// 	// 	regEx: /\d{3}[.-\/\\]\d{3}[.-\/\\]\d{4}/,
// 	// 	autoValue: function () {
// 	// 		return this.value.replace(/[.-\/\\]/, '-');
// 	// 	}
// 	// },
// 	// "phones.$.type": {
// 	// 	type: String,
// 	// 	label: "Type",
// 	// 	optional: true,
// 	// 	allowedValues: ['cell', 'home', 'office']
// 	// },
// 	// "phones.$.provider": {
// 	// 	type: String,
// 	// 	label: "Cell Provider",
// 	// 	optional: true,
// 	// 	allowedValues: ['t-mobile', 'verizon'],
// 	// 	custom: function () {
// 	// 		var type = this.fields('phones.$.type');
// 	// 		if (type.isSet && type.value != 'cell' && this.isSet) return "phoneProvider";
// 	// 	}
// 	// },
// 	braintree_id: {
// 		type: String,
// 		optional: true,
// 		blackbox: true,
// 		autoform: {
// 			omit: true
// 		}
// 	},
// 	username: {
// 		type: String,
// 		optional: true,
// 		regEx: /^[a-z0-9A-Z_]{3,15}$/
// 	},
// 	emails: {
// 		type: [Object],
// 		label: "Your email addresses",
// 		optional: true
// 	},
// 	"emails.$": {
// 		type: Object
// 	},
// 	"emails.$.address": {
// 		type: String,
// 		regEx: SimpleSchema.RegEx.Email
// 	},
// 	"emails.$.verified": {
// 		type: Boolean,
// 		autoform: {
// 			omit: true
// 		}
// 	},
// 	createdAt: {
// 		type: Date,
// 		autoform: {
// 			omit: true
// 		}
// 	},
// 	profile: {
// 		type: Object,
// 		optional: true,
// 		blackbox: true
// 	},
// 	services: {
// 		type: Object,
// 		optional: true,
// 		blackbox: true,
// 		autoform: {
// 			omit: true
// 		}
// 	},
// 	roles: {
// 		type: Object,
// 		optional: true,
// 		blackbox: true,
// 		autoform: {
// 			omit: true
// 		}
// 	}
// });
// Meteor.users.attachSchema(Schema.User);