// Security.defineMethod('ownsDocument', {
// 	deny: function (type, arg, userId, doc) {
// 		arg = arg || 'user_id';
// 		return !(userId && userId == doc[arg]);
// 	}
// });


// Meteor.users.permit('remove').never().apply();
// Meteor.users.permit(['insert', 'update']).admin().apply();
// Meteor.users.permit('update').admin().exceptProps(['username', 'emails', 'createdAt', 'services', 'braintree_id']).apply();
// Meteor.users.permit('update').ownsDocument().onlyProps(['firstname', 'lastname']).apply();
// Meteor.users.permit('update').ownsDocument().onlyProps(['emails', 'phones']).modifyArray().apply();