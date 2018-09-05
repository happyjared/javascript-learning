'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var tagStyle = '\n    font-size: 14px;\n    margin-top: 10px;\n    border-radius: 4px;\n    color: #666;\n    background-color:#fff;\n    border:1px solid #f1f1f1;\n    line-height:35px;\n    text-align:center;\n';
exports.default = Page({
    data: {
        tagsData: [{
            text: '广州',
            tagStyle: tagStyle
        }, {
            text: '上海',
            tagStyle: tagStyle
        }, {
            text: '成都',
            tagStyle: tagStyle
        }, {
            text: '深圳',
            tagStyle: tagStyle
        }, {
            text: '杭州',
            tagStyle: tagStyle
        }, {
            text: '郑州',
            tagStyle: tagStyle
        }, {
            text: '西安',
            tagStyle: tagStyle
        }, {
            text: '南京',
            tagStyle: tagStyle
        }, {
            text: '武汉',
            tagStyle: tagStyle
        }, {
            text: '深圳',
            tagStyle: tagStyle
        }, {
            text: '杭州',
            tagStyle: tagStyle
        }, {
            text: '郑州',
            tagStyle: tagStyle
        }],
        position: '北京'
    },
    singleTap: function singleTap(e) {
        console.log(e);
        var index = e.detail.index;
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2];
        console.log(this.data.tagsData[index].text);
        prevPage.setData({
            changeCity: this.data.tagsData[index].text
        });
        wx.navigateBack();
    },
    getPosition: function getPosition() {
        var _this = this;

        wx.request({
            url: 'https://apis.map.qq.com/ws/location/v1/ip',
            data: {
                key: 'RHGBZ-S2LAU-5MRV7-4QPTZ-JI25K-HVBDV'
            },
            success: function success(res) {
                _this.position = res.data.result.ad_info.city;
                console.log(_this.position);
            }
        });
    },
    onLoad: function onLoad(options) {
        this.getPosition();
        console.log(options);
        // this.setData({
        //     selectCity:options.city
        // })
    },
    onReady: function onReady(options) {
        //this.getPosition()
    }
});