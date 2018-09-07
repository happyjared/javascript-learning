"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var tagStyle = "\n  border: 1px solid #f1f2f3;\n  border-radius: 3px;\n  text-align: center;\n  height: 25px;\n  line-height: 24px;\n";

var tagSelectStyle = "\n  background: #54d09f;\n  color: #fff;\n  padding: 0 5px;\n  text-align: center;\n  height: 25px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  line-height: 20px;\n  border-radius: 3px;\n";

exports.default = Page({
  data: {
    tagList: [{ text: '周末双休', tagStyle: tagStyle }, { text: '年底双薪', tagStyle: tagStyle }, { text: '五险一金', tagStyle: tagStyle }, { text: '省内外旅游', tagStyle: tagStyle }],
    labelList: [{ text: '数据库开发', tagStyle: tagStyle }, { text: 'MySQL', tagStyle: tagStyle }, { text: 'SQLServer', tagStyle: tagStyle }, { text: '数据处理', tagStyle: tagStyle }],
    positionList: [{ text: '石牌', tagStyle: tagSelectStyle }, { text: '岗顶', tagStyle: tagSelectStyle }, { text: '龙口', tagStyle: tagSelectStyle }]
  },
  // 复制职位链接
  copyJobLink: function copyJobLink() {
    // wx.setClipboardData({
    //   data: 'url',
    //   success: function(res) {
    //     wx.getClipboardData({
    //       success: function(res) {
    //         console.log(res.data) 
    //       }
    //     })
    //   }
    // })
  }
});