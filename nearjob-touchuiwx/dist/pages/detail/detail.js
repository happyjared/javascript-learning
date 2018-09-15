"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var app = getApp();
var tagStyle = "\n  border: 1px solid #f1f2f3;\n  border-radius: 3px;\n  text-align: center;\n  height: 25px;\n  line-height: 24px;\n";

exports.default = Page({
  data: {
    pageTop: true,
    mapKey: app.globalData.mapKey
  },
  // 复制职位链接
  copyJobLink: function copyJobLink() {
    wx.setClipboardData({
      data: this.data.sourceUrl,
      success: function success(res) {
        wx.getClipboardData({
          success: function success(res) {
            console.log(res.data);
            wx.showToast({
              mask: true,
              icon: "success",
              title: "链接复制成功"
            });
          }
        });
      }
    });
  },

  // 初始化页面数据
  onLoad: function onLoad(options) {
    wx.showLoading({
      mask: true,
      title: "跳转中•••"
    });
    var _this = this;
    var jobId = options.jobId;
    var positionId = options.postionId;
    wx.request({
      url: "https://mini.mariojd.cn/api/detail?jobId=" + jobId + "&positionId=" + positionId,
      success: function success(res) {
        var data = res.data;
        // 职位诱惑
        var advantageList = [];
        var jobAdvantageData = data.jobAdvantage;
        if (jobAdvantageData) {
          if (jobAdvantageData.indexOf(",") != -1) {
            var jobAdvantage = jobAdvantageData.split(",");
          } else if (jobAdvantageData.indexOf("，") != -1) {
            var jobAdvantage = jobAdvantageData.split("，");
          } else {
            var jobAdvantage = jobAdvantageData.split(" ");
          }
          jobAdvantage.forEach(function (advantage) {
            advantageList.push({ text: advantage.substr(0, 5), tagStyle: tagStyle });
          });
        }
        // 技能标签
        var labelList = [];
        var labelData = data.jobLabel;
        if (labelData) {
          var jobLabel = JSON.parse(labelData);
          jobLabel.forEach(function (label) {
            labelList.push({ text: label.substr(0, 6), tagStyle: tagStyle });
          });
        }
        // 位置区域
        var positionList = [];
        var postionData = data.companyZone;
        if (postionData) {
          var jobPostion = JSON.parse(postionData);
          jobPostion.forEach(function (position) {
            positionList.push({ text: position.substr(0, 5), tagStyle: tagStyle });
          });
        }
        _this.setData({
          item: data,
          labelList: labelList,
          positionList: positionList,
          advantageList: advantageList,
          companyIndustry: data.companyIndustry.replace(",", " • "),
          sourceUrl: data.sourceUrl,
          locationMarkers: [{
            id: data.positionId,
            title: data.companyShortName,
            latitude: data.companyLatitude,
            longitude: data.companyLongitude
          }]
        });
      },
      complete: function complete() {
        wx.hideLoading();
      }
    });
  },

  // 页面滚动事件
  onPageScroll: function onPageScroll(e) {
    this.setData({
      pageTop: e.scrollTop < wx.WIN_HEIGHT / 5
    });
  }
});