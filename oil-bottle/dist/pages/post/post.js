"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Page({
  data: {
    width: wx.WIN_WIDTH,
    length: 0,
    maxLength: 800,
    spaceLeft: 10,
    spaceRight: 8,
    distanceRange: [0, 5]
  },
  textareaInput: function textareaInput(e) {
    this.setData({
      length: e.detail.cursor
    });
  },
  hotelHandler: function hotelHandler(e) {
    this.setData({
      value7: e.detail.value
    });
  }
});