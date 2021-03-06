"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var cityTagStyle = "\n    font-size: 14px;\n    margin-top: 10px;\n    border-radius: 4px;\n    color: #666;\n    background-color:#fff;\n    border:1px solid #f1f1f1;\n    line-height:35px;\n    text-align:center;\n";
var notOpenCityTagStyle = "\n    font-size: 14px;\n    margin-top: 10px;\n    border-radius: 4px;\n    color: #C0C0C0;\n    background-color:#fff;\n    border:1px solid #f1f1f1;\n    line-height:35px;\n    text-align:center;\n";
exports.default = Page({
  data: {
    positionCity: "未知",
    cityTagList: [{ id: 1, text: "北京", tagStyle: cityTagStyle }, { id: 2, text: "上海", tagStyle: cityTagStyle }, { id: 3, text: "广州", tagStyle: cityTagStyle }, { id: 4, text: "深圳", tagStyle: cityTagStyle }, { id: 5, text: "杭州", tagStyle: cityTagStyle }, { id: 6, text: "成都", tagStyle: cityTagStyle }, { id: 7, text: "南京", tagStyle: cityTagStyle }, { id: 8, text: "武汉", tagStyle: cityTagStyle }, { id: 9, text: "西安", tagStyle: cityTagStyle }, { id: 10, text: "厦门", tagStyle: cityTagStyle }, { id: 11, text: "长沙", tagStyle: cityTagStyle }, { id: 12, text: "天津", tagStyle: cityTagStyle }, { id: 13, text: "苏州", tagStyle: cityTagStyle }, { id: 14, text: "重庆", tagStyle: cityTagStyle }, { id: 15, text: "郑州", tagStyle: cityTagStyle }, { id: 16, text: "青岛", tagStyle: cityTagStyle }, { id: 17, text: "合肥", tagStyle: cityTagStyle }, { id: 18, text: "珠海", tagStyle: cityTagStyle }, { id: 19, text: "佛山", tagStyle: cityTagStyle }, { id: 20, text: "东莞", tagStyle: cityTagStyle }, { id: 0, text: "福州", tagStyle: notOpenCityTagStyle }, { id: 0, text: "济南", tagStyle: notOpenCityTagStyle }, { id: 0, text: "大连", tagStyle: notOpenCityTagStyle }, { id: 0, text: "无锡", tagStyle: notOpenCityTagStyle }]
  },
  onLoad: function onLoad(options) {
    this.getPosition();
  },

  // 获取定位信息
  getPosition: function getPosition() {
    var _this = this;

    wx.request({
      url: app.globalData.mapIpUrl,
      data: { key: app.globalData.mapKey },
      success: function success(res) {
        var city = res.data.result.ad_info.city;
        if (city.length > 0) {
          var positionCity = city.replace("市", "");
          var cityList = app.globalData.cityList;
          var positionCityId = cityList[positionCity];
          _this.setData({
            positionCity: positionCity,
            positionCityId: positionCityId === undefined ? 0 : positionCityId
          });
        }
      }
    });
  },

  // 点击定位城市
  currentCity: function currentCity() {
    var positionCity = this.data.positionCity;
    if (positionCity == "未知") {
      return;
    }
    var positionCityId = this.data.positionCityId;
    if (positionCityId == 0) {
      wx.showToast({
        icon: "none",
        title: "暂无" + positionCity + "市的招聘数据"
      });
      return;
    }

    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];
    prevPage.setData({
      currentCity: positionCity,
      currentCityId: positionCityId,
      currentDistance: 0
    });
    prevPage.reloadIndex();
    wx.navigateBack();
  },

  // 切换城市事件
  changeCity: function changeCity(e) {
    var index = e.detail.index;
    var cityId = this.data.cityTagList[index].id;
    if (cityId == 0) {
      wx.showToast({
        mask: true,
        duration: 800,
        icon: "loading",
        title: "敬请期待"
      });
      return;
    }

    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1]; //当前页面
    var prevPage = pages[pages.length - 2]; //上一页面
    prevPage.setData({
      currentCity: this.data.cityTagList[index].text,
      currentCityId: cityId,
      currentDistance: 0
    });
    prevPage.reloadIndex();
    wx.navigateBack();
  }
});