"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tagStyle = "\n  border: 1px solid #f1f2f3;\n  border-radius: 3px;\n  text-align: center;\n  height: 25px;\n  line-height: 24px;\n";

var tagSelectStyle = "\n  background: #54d09f;\n  color: #fff;\n  padding: 0 5px;\n  text-align: center;\n  height: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  line-height: 20px;\n  border-radius: 3px;\n";

exports.default = Page({
  data: {},
  // 复制职位链接
  copyJobLink: function copyJobLink() {
    wx.setClipboardData({
      data: this.data.sourceUrl,
      success: function success(res) {
        wx.getClipboardData({
          success: function success(res) {
            console.log(res.data);
          }
        });
      }
    });
  },

  // 初始化页面数据
  onLoad: function onLoad(options) {
    var _this = this;
    var jobId = options.jobId;
    var positionId = options.postionId;
    wx.request({
      url: 'https://mini.mariojd.cn/api/detail?jobId=' + jobId + '&positionId=' + positionId,
      success: function success(res) {
        // 职位诱惑
        var advantageList = [];
        var jobAdvantageData = res.data.jobAdvantage;
        if (jobAdvantageData) {
          var jobAdvantage = jobAdvantageData.split(',');
          jobAdvantage.forEach(function (advantage) {
            advantageList.push({ text: advantage, tagStyle: tagStyle });
          });
        }
        // 技能标签
        var labelList = [];
        var labelData = res.data.jobLabel;
        if (labelData) {
          var jobLabel = JSON.parse(labelData);
          jobLabel.forEach(function (label) {
            labelList.push({ text: label, tagStyle: tagStyle });
          });
        }
        // 位置区域
        var positionList = [];
        var postionData = res.data.companyZone;
        if (postionData) {
          var jobPostion = JSON.parse(postionData);
          jobPostion.forEach(function (position) {
            positionList.push({ text: position, tagStyle: tagSelectStyle });
          });
        }
        _this.setData({
          item: res.data,
          labelList: labelList,
          positionList: positionList,
          advantageList: advantageList,
          companyIndustry: res.data.companyIndustry.replace(',', ' • '),
          sourceUrl: res.data.sourceUrl
        });
      }
    });
  }
});