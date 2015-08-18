// Meteor.methods({
// 	email: function (options) {
// 		if (Roles.userIsInRole(Meteor.userId(), 'admin'))
// 			throw new Meteor.Error(401, "You aren't authorized to send emails.");
// 		this.unblock();
// 		Email.send(options);
// 	}
// });