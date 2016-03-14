//单输入网址进来使用的路由
FlowRouter.route('/', {
    name: 'home',//路由名称
    action() {
        console.log("进入home路由");
        if (Meteor.userId()) {
            FlowRouter.go('dashboard');
        }
        BlazeLayout.render('login_layout');
    }
});

FlowRouter.route('/regaccount', {
    name: 'register',
    action(){
        BlazeLayout.render('register');
    }
});

FlowRouter.route('/dashboard', {
    name: 'dashboard',
    action(){
        BlazeLayout.render('DashBoard');
    }
});


FlowRouter.route('/bpadd', {
    name: 'bpadd',
    action(){
        //渲染到名称为BpAdd的Template
        BlazeLayout.render('BpAdd');
    }
});

FlowRouter.route('/bpdetail/:id',{
    name:'bpdetail',
    action(){
        BlazeLayout.render('bpdetail');
    }
});

FlowRouter.triggers.enter([function () {
    if (!Meteor.userId()) {
        FlowRouter.go('home');
    }
}],{except:['register']});


Accounts.onLogin(function () {
    FlowRouter.go('dashboard');
});

Accounts.onLogout(function () {
    FlowRouter.go('home');
});