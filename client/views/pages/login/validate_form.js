validatePost = function (post) {
    var errors = {};

    var CheckUserNameResult= (/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(post.txtUserName));

    if (!post.txtUserName || !CheckUserNameResult)
        errors.txtUserName = "用户名必须是Email";
    if (!post.txtPassword)
        errors.txtPassword = "请填写密码";
    return errors;
};