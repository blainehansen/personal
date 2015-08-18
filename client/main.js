// Template.header.events({
// 	'click #userBox': function (e, t) {
// 		Session.set('userDropdownActivated', !Session.get('userDropdownActivated'));
// 	},
// 	'click #headerSignOut': function (e, t) {
// 		Meteor.logout();
// 	},
// 	'click #userDropdown a': function (e, t) {
// 		Session.set('userDropdownActivated', false);
// 	}
// });

// Template.backgroundPictures.destroyed = function () {
// 	Meteor.clearTimeout(Session.get('slideshowIntervalHandle'));
// };
// Template.backgroundPictures.helpers({
// 	slides: function () {
// 		return Stories.find({featured: true});
// 	}
// });

// Template.home.created = function () {
// 	TestThings = new Meteor.Collection(null);
// 	Schema.TestThings = new SimpleSchema({
// 		testattr: {
// 			type: String,
// 			label: "Test Attribute",
// 			trim: true,
// 			max: 5
// 		}
// 	});
// 	TestThings.attachSchema(Schema.TestThings);
// };