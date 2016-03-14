var ERRORS_KEY = 'joinErrors';

Template.register.onCreated(function () {
    Session.set(ERRORS_KEY, {});
});

Template.register.helpers({
    errorMessages: function () {
        return _.values(Session.get(ERRORS_KEY));
    },
    errorClass: function (key) {
        return Session.get(ERRORS_KEY)[key] && 'error';
    }
});



Template.register.events({
    'submit form': function (event, template) {
        event.preventDefault();

        var post = {
            txtUserName: template.$('[name=txtUserName]').val(),
            txtPassword: template.$('[name=txtPassword]').val()
        };

        var errors = validatePost(post);
        if (_.keys(errors).length) {
            Session.set(ERRORS_KEY, errors);
            return;
        }
        console.log("进入UserRegister");
        Accounts.createUser({
            username:post.txtUserName,
            email:post.txtUserName,
            password:post.txtPassword}, function (error) {
            if (error) {
                return Session.set(ERRORS_KEY, {'none': error.reason});
            }
            Session.set('username', post.txtUserName)
            FlowRouter.go('dashboard');
        });
    },
    'click #loginpage':function(){
        FlowRouter.go('home');
    }
});