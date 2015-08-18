// if (Meteor.users.find().count() < 2) {
// 	record_id = Accounts.createUser({email: 'faichenshing@gmail.com', password: "nameless"});
// }

// var blaine = Meteor.users.findOne({firstname: "Blaine", lastname: "Hansen", admin: true});
// if (blaine) {
// 	Roles.addUsersToRoles(blaine._id, 'admin', Roles.GLOBAL_GROUP);
// }


// Meteor.startup(function() {
// 	process.env.MAIL_URL = 'smtp://postmaster%40sandbox83338.mailgun.org:9zggvz4f10-9@smtp.mailgun.org:587';
// });


// Accounts.emailTemplates.from = "Blaine Hansen <blainehansenclassicalpiano@gmail.com>";
// Accounts.emailTemplates.siteName = "Blaine Hansen Piano";
// Accounts.emailTemplates.resetPassword.subject = function (user) {
// 	return "Blaine Hansen Piano: " + user.firstname + ' ' + user.lastname + " Password Reset";
// };
// Accounts.emailTemplates.resetPassword.text = function (user, url) {
// 	return "Hello " + user.firstname + ' ' + user.lastname + "!\nClick on the link below to reset your password.\n\n" + url + "\n\nGood Luck!"; 
// };
// Accounts.emailTemplates.enrollAccount.subject = function (user) {
// 	return "Blaine Hansen Piano: " + user.firstname + ' ' + user.lastname + " Account Enrollment";
// };
// Accounts.emailTemplates.enrollAccount.text = function (user, url) {
// 	return "Hello " + user.firstname + ' ' + user.lastname + "!\nClick on the link below to activate your account.\nAfter you've clicked the link, you will be asked to enter a new password, which you'll use to log in to your account.\n\n" + url + "\n\nGood Luck!"; 
// };
// Accounts.emailTemplates.verifyEmail.subject = function (user) {
// 	return "Blaine Hansen Piano: " + user.firstname + ' ' + user.lastname + " Email Verification";
// };
// Accounts.emailTemplates.verifyEmail.text = function (user, url) {
// 	return "Hello " + user.firstname + ' ' + user.lastname + "!\nClick on the link below to verify this email.\n\n" + url + "\n\nGood Luck!"; 
// };