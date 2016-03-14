Template.BpList.onCreated(function(){
   var self=this;
    self.autorun(function(){
        self.subscribe('bpownerdatas');
    });
});

Template.BpList.helpers({
    BpOwnerList: function () {
        return BloodPressureDatas.find();
    }
});