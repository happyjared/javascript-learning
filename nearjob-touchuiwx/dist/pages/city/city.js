"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var cityTagStyle = "\n    font-size: 14px;\n    margin-top: 10px;\n    border-radius: 4px;\n    color: #666;\n    background-color:#fff;\n    border:1px solid #f1f1f1;\n    line-height:35px;\n    text-align:center;\n";
exports.default = Page({
    data: {
        position: '暂无定位',
        cityTagList: [{
            text: '北京',
            tagStyle: cityTagStyle
        }, {
            text: '上海',
            tagStyle: cityTagStyle
        }, {
            text: '广州',
            tagStyle: cityTagStyle
        }, {
            text: '深圳',
            tagStyle: cityTagStyle
        }, {
            text: '杭州',
            tagStyle: cityTagStyle
        }, {
            text: '成都',
            tagStyle: cityTagStyle
        }, {
            text: '郑州',
            tagStyle: cityTagStyle
        }, {
            text: '西安',
            tagStyle: cityTagStyle
        }, {
            text: '南京',
            tagStyle: cityTagStyle
        }, {
            text: '武汉',
            tagStyle: cityTagStyle
        }, {
            text: '长沙',
            tagStyle: cityTagStyle
        }, {
            text: '厦门',
            tagStyle: cityTagStyle
        }]
    },
    changeCity: function changeCity(e) {
        var index = e.detail.index;
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1]; //当前页面
        var prevPage = pages[pages.length - 2];
        console.log(this.data.cityTagList[index].text);
        prevPage.setData({
            currentCity: this.data.cityTagList[index].text
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
                _this.setData({
                    position: res.data.result.ad_info.city.replace('市', '')
                });
            }
        });
    },
    onLoad: function onLoad(options) {
        this.getPosition();
    }
});