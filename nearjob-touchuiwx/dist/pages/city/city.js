"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var cityTagStyle = "\n    font-size: 14px;\n    margin-top: 10px;\n    border-radius: 4px;\n    color: #666;\n    background-color:#fff;\n    border:1px solid #f1f1f1;\n    line-height:35px;\n    text-align:center;\n";
exports.default = Page({
  data: {
    position: "暂无定位",
    cityTagList: [{
      id: 1,
      text: "北京",
      tagStyle: cityTagStyle
    }, {
      id: 2,
      text: "上海",
      tagStyle: cityTagStyle
    }, {
      id: 3,
      text: "广州",
      tagStyle: cityTagStyle
    }, {
      id: 4,
      text: "深圳",
      tagStyle: cityTagStyle
    }, {
      id: 5,
      text: "杭州",
      tagStyle: cityTagStyle
    }, {
      id: 6,
      text: "成都",
      tagStyle: cityTagStyle
    }, {
      id: 0,
      text: "郑州",
      tagStyle: cityTagStyle
    }, {
      id: 0,
      text: "西安",
      tagStyle: cityTagStyle
    }, {
      id: 0,
      text: "南京",
      tagStyle: cityTagStyle
    }, {
      id: 0,
      text: "武汉",
      tagStyle: cityTagStyle
    }, {
      id: 0,
      text: "长沙",
      tagStyle: cityTagStyle
    }, {
      id: 0,
      text: "厦门",
      tagStyle: cityTagStyle
    }]
  },
  backPrePage: function backPrePage() {
    wx.navigateBack();
  },
  changeCity: function changeCity(e) {
    var index = e.detail.index;
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一页面
    // console.log(this.data.cityTagList[index].text)
    prevPage.setData({
      currentCity: this.data.cityTagList[index].text,
      currentCityId: this.data.cityTagList[index].id,
      currentDistance: 0
    });
    prevPage.reloadIndex();
    wx.navigateBack();
  },
  getPosition: function getPosition() {
    var _this = this;

    wx.request({
      url: "https://apis.map.qq.com/ws/location/v1/ip",
      data: { key: "RHGBZ-S2LAU-5MRV7-4QPTZ-JI25K-HVBDV" },
      success: function success(res) {
        _this.setData({
          position: res.data.result.ad_info.city.replace("市", "")
        });
      }
    });
  },
  onLoad: function onLoad(options) {
    this.getPosition();
  }
});