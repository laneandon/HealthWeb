var ERROR_KEY = 'LoginError';

Template.loginTemp.onCreated(function () {
    //模版创建的时候初始化Error_Key
    Session.set(ERROR_KEY, {});
});

Template.loginTemp.helpers({
    errorSummary:function(){
        return _.values(Session.get(ERROR_KEY));
    },
    errorMessage: function (field) {
        return Session.get(ERROR_KEY)[field];
    },
    errorClass: function (field) {
        return !!Session.get(ERROR_KEY)[field] ? 'has-error' : "";
    }
});


Template.loginTemp.events({
    'submit form': function (event, template) {
        event.preventDefault();//阻止事件的默认行为

        console.log("进入events");

        var post = {
            txtUserName: template.$('[name=txtUserName]').val(),
            txtPassword: template.$('[name=txtPassword]').val()
        };

        var errors = validatePost(post);
        if (_.keys(errors).length) {
            Session.set(ERROR_KEY, errors);
            return;
        }


        Meteor.loginWithPassword(post.txtUserName, post.txtPassword, function (error) {
            if (error) {
                return Session.set(ERROR_KEY, {'none': error.reason});
            }
            Session.set('username', post.txtUserName)
            FlowRouter.go('dashboard');
        });
    }
});