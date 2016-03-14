Meteor.publish('bpownerdatas', function () {
    return BloodPressureDatas.find({MID:this.userId});
});

Meteor.publish('BloodPressureData', function (id) {
    check(id, String);
    return BloodPressureDatas.find({_id: id});
});