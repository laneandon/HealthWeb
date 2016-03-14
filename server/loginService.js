Meteor.methods({
    UserLoginCheck: function (postAttributes) {
        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        } else {
            return {postExists: false}
        }
    },
    
    UserInsert: function (postAttributes) {
        check(Meteor.userId(), String);
        check(postAttributes, {
            title: String,
            url: String
        });

        var errors = validatePost(postAttributes);
        if (errors.title || errors.url) {
            throw new Meteor.Error('invalid-post', "你必须为你的帖子填写标题和 URL");
        }

        if (Meteor.isServer) {
            postAttributes.title += "(server)";
            // wait for 5 seconds
            //Meteor._sleepForMs(5000);
        } else {
            postAttributes.title += "(client)";
        }

        var postWithSameLink = Posts.findOne({url: postAttributes.url});
        if (postWithSameLink) {
            return {
                postExists: true,
                _id: postWithSameLink._id
            }
        }

        var user = Meteor.user();
        var post = _.extend(postAttributes, {
            userId: user._id,
            author: user.username,
            submitted: new Date(),
            commentsCount:0
        });
        var postId = Posts.insert(post);
        return {
            _id: postId
        };
    }
});