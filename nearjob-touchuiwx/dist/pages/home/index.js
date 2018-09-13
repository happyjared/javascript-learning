"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _date = require("../../static/utils/date.js");

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = getApp();
exports.default = Page({
  data: {
    scrollTop: 0,
    navStyle: {
      "background-color": "#fff",
      "box-shadow": "0 2px 2px #dfdfdf"
    },
    width: wx.WIN_WIDTH,
    height: wx.DEFAULT_CONTENT_HEIGHT,
    poptpTop: wx.DEFAULT_HEADER_HEIGHT - 6,
    colorList: ["#FCB300", "#FF7360", "#39CCC5"],
    el: "undefined",
    // 职位信息数据
    jobDataList: [],
    // 城市数据相关
    cityList: { 北京: 1, 上海: 2, 广州: 3, 深圳: 4, 杭州: 5, 成都: 6 },
    currentCity: "城市",
    currentCityId: 0,
    showDistance: false,
    // 距离数据相关
    currentDistance: 3,
    // 职位数据相关
    showJob: false,
    currentJob: "Java",
    currentJobId: 1,
    jobList: [{
      name: "后端开发",
      children: [{ name: "Java", value: 1 }, { name: "Python", value: 3 }, { name: "PHP", value: 2 }]
    }, {
      name: "移动开发",
      children: [{ name: "Andrioid", value: 4 }, { name: "IOS", value: 5 }, { name: "Web前端", value: 6 }]
    }],
    // 排序数据相关
    showSort: false,
    currentSort: "离我最近",
    sortKeyList: ["最新发布", "离我最近"],
    sortValueList: [1, 2],
    // 分页数据相关
    log: 0,
    lat: 0,
    currentPage: 0,
    lastPage: false
  },
  // 页面下滑事件
  onPageScroll: function onPageScroll(e) {
    // console.log(e)
    this.setData({
      scrollTop: e.scrollTop
    });
  },

  // 获得位置ip等信息
  getPosition: function getPosition() {
    var _this = this;
    wx.request({
      url: "https://apis.map.qq.com/ws/location/v1/ip",
      data: { key: "RHGBZ-S2LAU-5MRV7-4QPTZ-JI25K-HVBDV" },
      success: function success(res) {
        console.log("get position success", res);
        var city = res.data.result.ad_info.city;
        var cityList = app.globalData.cityList;
        for (var cityName in cityList) {
          if (city.indexOf(cityName) != -1) {
            _this.setData({
              currentCity: cityName,
              currentCityId: cityList[cityName]
            });
          }
        }
      }
    });
  },

  //初始加载事件
  onLoad: function onLoad() {
    this.indexRequest();
    var _this = this;
    wx.getLocation({
      type: "gcj02",
      success: function success(res) {
        console.log("get location success", res);
        _this.data.log = res.longitude;
        _this.data.lat = res.latitude;
        _this.reloadIndex();
      }
    });
    this.getPosition();
  },

  // 重新请求首页数据
  reloadIndex: function reloadIndex() {
    this.data.currentPage = 0, this.data.lastPage = false, this.data.jobDataList.length = 0, this.indexRequest();
  },

  // api/index统一请求入口
  indexRequest: function indexRequest(pullDown) {
    wx.showLoading({
      mask: true,
      title: "加载中•••"
    });
    if (this.data.lastPage) {
      if (pullDown) {
        // 下拉刷新
        setTimeout(function () {
          wx.hideLoading();
        }, 1000);
      } else {
        // 上拉加载
        wx.hideLoading();
        wx.showToast({
          title: "到底了",
          icon: "loading",
          duration: 800,
          mask: true
        });
      }
      return;
    }
    var _url = "https://mini.mariojd.cn/api/index?jobId=" + this.data.currentJobId + "&page=" + this.data.currentPage;
    var cityId = this.data.currentCityId;
    if (cityId != 0) {
      _url += "&cityId=" + cityId;
    }
    var _log = this.data.log;
    var _lat = this.data.lat;
    var _distance = this.data.currentDistance;
    if (_log && _lat && _distance) {
      // 按距离升序
      _url += "&longitude=" + _log + "&latitude=" + _lat + "&distance=" + _distance;
    } else {
      // 按时间倒序
      _url += "&sort=postJobTime,desc";
    }
    var _this = this;
    wx.request({
      url: _url,
      success: function success(res) {
        _this.setData({
          lastPage: res.data.last,
          currentPage: res.data.number,
          jobDataList: _this.data.jobDataList.concat(res.data.content)
        });
      },
      fail: function fail() {
        if (!pullDown) {
          _this.data.currentPage++;
        }
      },
      complete: function complete() {
        wx.hideLoading();
      }
    });
  },

  // 下拉刷新事件
  onPullDownRefresh: function onPullDownRefresh() {
    this.indexRequest(true);
    wx.stopPullDownRefresh();
  },

  //上拉加载事件
  onReachBottom: function onReachBottom() {
    this.data.currentPage++;
    this.indexRequest(false);
  },

  // 排序弹出框
  sortPopup: function sortPopup() {
    this.setData({
      showJob: false,
      showSort: !this.data.showSort
    });
  },

  // 选择排序
  changeSort: function changeSort(e) {
    console.log(e);
  },

  // 职位弹出框
  jobPopup: function jobPopup() {
    this.setData({
      showSort: false,
      showJob: !this.data.showJob
    });
  },

  // 选择职位
  jobSelected: function jobSelected(e) {
    var data = e.detail;
    if (data.length > 1) {
      this.setData({
        showJob: !this.data.showJob,
        currentJob: data[1].name,
        currentJobId: data[1].value
      });
      this.reloadIndex();
    }
  },

  // 选择距离
  distanceSelected: function distanceSelected(e) {
    var selectDistance = e.detail.value;
    this.setData({
      currentDistance: selectDistance
    });
  },

  // 打开距离弹出框
  openDistancePopup: function openDistancePopup() {
    this.setData({
      pastDistance: this.data.currentDistance,
      showJob: false,
      showSort: false,
      showDistance: !this.data.showDistance
    });
  },

  // 隐藏距离弹出框
  hideDistancePopup: function hideDistancePopup() {
    this.setData({
      // 还原距离信息
      currentDistance: this.data.pastDistance
    });
  },

  // 完成距离选择
  finishDistancePopup: function finishDistancePopup() {
    if (this.data.pastDistance != this.data.currentDistance) {
      // 距离发生变化时触发
      this.reloadIndex();
    }
  },

  // 不感兴趣
  notInsJob: function notInsJob(index) {
    var index = index.target.dataset.idx;
    console.log(index);
    this.data.jobDataList.splice(index, 1);
    this.setData({
      jobDataList: this.data.jobDataList
    });
    this.setData({
      el: "undefined"
    });
  },

  // 向右滑动标签
  switchSlideTab: function switchSlideTab(res) {
    if (res.detail === "on") {
      var index = res.currentTarget.dataset.index;
      if (this.data.el !== index) {
        if (this.data.el !== "undefined") {
          this.data.jobDataList[this.data.el].switcher = "off";
        }
        this.data.jobDataList[index].switcher = "on";
        this.setData({
          jobDataList: this.data.jobDataList
        });
        this.data.el = index;
      }
    }
  },

  // 跳转到职位详情页面
  toDeail: function toDeail(e) {
    wx.navigateTo({
      url: "../detail/detail?jobId=" + this.data.currentJobId + "&postionId=" + e.currentTarget.id
    });
  },
  // 跳转到城市选择页面
  toCitySelect: function toCitySelect() {
    this.setData({
      showJob: false,
      showSort: false
    });
    wx.navigateTo({
      url: "../city/city"
    });
  }
});