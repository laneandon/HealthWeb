BloodPressureDatas = new Mongo.Collection('bloodPressureDatas');

BloodPressureDatas.allow({
    insert: function (userId, doc) {
        return !!userId;
    },
    update: function (userId, doc) {
        return ownsDocument(userId, doc);
    },
    remove: function (userId, doc) {
        return ownsDocument(userId, doc);
    }
});

SchemaBp = new SimpleSchema({
    BPL: {
        type: Number,
        label: "WHO level",
        autoform: {
            type: 'hidden'
        },
        optional: true,
        autoValue: function () {
            var HpValue = this.field("HP").value;
            return 1;
        },
    },
    /*DataID: {
     type: String,
     label: "the unique identity"
     },*/
    HP: {
        type: Number,
        label: "高压",
        decimal: true
    },
    HR: {
        type: Number,
        label: "心率"
    },
    /*IsArr: {
     type: Number,
     label: "心律是否正常",
     autoform: {
     type: 'hidden'
     }
     },*/
    LP: {
        type: Number,
        label: "低压",
        decimal: true
    },
    Lat: {
        type: Number,
        label: "the latitude of the testing place",
        decimal: true,
        autoValue: function () {
            return 0;
        },
        autoform: {
            type: 'hidden'
        }
    },
    Lon: {
        type: Number,
        label: "the longitude of the testing place",
        decimal: true,
        autoValue: function () {
            return 0;
        },
        autoform: {
            type: 'hidden'
        }
    },
    MDate: {
        type: Date,
        autoValue: function () {
            return this.value;
            /*if (this.value === undefined) {
             return this.value;
             }
             else {
             return unixTimeFromSecondToMillisecond(this.value);
             }*/
        },
        label: "测量时间"
    },
    Note: {
        type: String,
        label: "备注",
        optional: true
    },
    //LastChangeTime: {
    //    type: Date,
    //    autoValue: function() {
    //        return unixTimeFromSecondToMillisecond(this.value);
    //    },
    //    label: "Time of last change (UTC)",
    //    autoform: {
    //        type: 'hidden'
    //    }
    //},
    DataSource: {
        type: String,
        label: "数据来源",
        optional: true,
        allowedValues: ["FromDevice", "Manual"],
        autoform: {
            type: 'hidden'
        },
        autoValue: function () {
            return "Manual";
        }
    },
    TimeZone: {
        type: String,
        label: "测量地点所在时区",
        autoform: {
            type: 'hidden'
        },
        autoValue: function () {
            return "Tianjin";
        }
    },
    MID: {
        type: String,
        label: "创建者",
        autoValue: function () {
            return this.userId;
        },
        autoform: {
            type: 'hidden'
        }
    },
    createdAt: {
        type: Date,
        autoValue: function () {
            return new Date;
        },
        autoform: {
            type: 'hidden'
        }
    }/*,
     MDateUTC: {
     type: Date,
     optional: true,
     autoValue: function () {
     var mDate = this.field("MDate").value;
     var timeZone = this.field("TimeZone").value;
     var hourDiff = parseInt(timeZone) / 100;
     var dateUTC = mDate.subtract(hourDiff, 'hours').toDate();
     return dateUTC;
     },
     autoform: {
     type: 'hidden'
     }
     }*/
});

BloodPressureDatas.attachSchema(SchemaBp);