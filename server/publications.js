// Meteor.publishComposite(null, {
// 	find: function () {
// 		return Meteor.users.find(
// 			{_id: this.userId},
// 			{limit: 1, fields: { firstname: true, lastname: true, phones: true, braintree_id: true, roles: true }});
// 	},
// 	children: [{
// 		find: function (user) {
// 			return Payments.find({user_id: user._id});
// 		}
// 	}, {
// 		find: function (user) {
// 			return Students.find({user_id: user._id});
// 		},
// 		children: [{
// 			find: function (student, user) {
// 				return Lessons.find({student_id: student._id});
// 			}
// 		}, {
// 			find: function (student, user) {
// 				return StudentExpenses.find({student_id: student._id});
// 			}
// 		}]
// 	}]
// });

// Meteor.publish('adminAll', function () {
// 	if (Roles.userIsInRole(this.userId, 'admin')) {
// 		return [
// 			Meteor.users.find({}, { fields: { firstname: true, lastname: true }}),
// 			Students.find({}, { fields: { firstname: true, lastname: true, price: true }})
// 		];
// 	}
// 	else {
// 		return [];
// 	}
// });