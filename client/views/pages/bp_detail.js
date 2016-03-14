Template.bpdetail.onCreated(function(){
    var self=this;
    self.autorun(function(){
        var id=FlowRouter.getParam('id');
        console.log("clinetId:"+id);
        self.subscribe('BloodPressureData',id);
    });
});

Template.bpdetail.helpers({
  bpSingle:function(){
      var id=FlowRouter.getParam('id');
      console.log("bpDetail模版helperd的id="+id);
      var SingleData=BloodPressureDatas.findOne(id);
      return SingleData;
  }
});