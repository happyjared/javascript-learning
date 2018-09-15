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
    width: wx.WIN_WIDTH,
    height: wx.WIN_HEIGHT,
    navHeight: 40,
    navStyle: {
      "background-color": "#fff",
      "box-shadow": "0 2px 2px #dfdfdf"
    },
    el: "undefined",
    // 职位信息数据
    jobDataList: [],
    // 城市数据相关
    cityList: { 北京: 1, 上海: 2, 广州: 3, 深圳: 4, 杭州: 5, 成都: 6 },
    currentCity: "城市",
    currentCityId: 0,
    positionCityId: 0,
    showDistance: false,
    // 距离数据相关
    currentDistance: 0,
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
    sortKeyList: ["最新发布", "离我最近"],
    sortSelectedValue: ["最新发布"],
    // 请求无数据相关
    hiddenImage: true,
    // 分页数据相关
    log: 0,
    lat: 0,
    currentPage: 0,
    lastPage: false
  },
  //初始加载事件
  onLoad: function onLoad() {
    this.getPosition();
    this.getLocation();
    this.apiIndex();
  },

  // 授权地理位置
  getLocation: function getLocation() {
    var _this = this;
    wx.getLocation({
      type: "gcj02",
      success: function success(res) {
        console.log("get location success", res);
        _this.data.lat = res.latitude;
        _this.data.log = res.longitude;
        if (_this.data.positionCityId != 0) {
          _this.setData({
            currentDistance: 3,
            sortSelectedValue: ["离我最近"]
          });
        }
        _this.reloadIndex();
      },
      fail: function fail() {
        if (!_this.data.log) {
          wx.showModal({
            title: "功能限制",
            content: "地理位置授权失败",
            showCancel: false
          });
        }
      }
    });
  },

  // 获得位置ip等信息
  getPosition: function getPosition() {
    var _this = this;
    wx.request({
      url: app.globalData.mapIpUrl,
      data: { key: app.globalData.mapKey },
      success: function success(res) {
        console.log("get position success", res);
        var city = res.data.result.ad_info.city;
        var cityList = app.globalData.cityList;
        for (var cityName in cityList) {
          if (city.indexOf(cityName) != -1) {
            _this.setData({
              currentCity: cityName,
              currentCityId: cityList[cityName],
              positionCityId: cityList[cityName]
            });
          }
        }
        var location = res.data.result.location;
        _this.setData({
          positionLat: location.lat,
          positionLog: location.lng
        });
      }
    });
  },

  // 重新请求首页数据
  reloadIndex: function reloadIndex() {
    this.data.currentPage = 0, this.data.lastPage = false, this.data.jobDataList.length = 0, this.apiIndex();
  },

  // api/index统一请求入口
  apiIndex: function apiIndex(pullDown) {
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
    var _page = this.data.currentPage;
    var _url = "https://mini.mariojd.cn/api/index?jobId=" + this.data.currentJobId + "&page=" + _page;
    var cityId = this.data.currentCityId;
    if (cityId != 0) {
      _url += "&cityId=" + cityId;
    }
    var _log = this.data.log;
    var _lat = this.data.lat;
    var _distance = this.data.currentDistance;
    if (_log && _distance && _lat && cityId == this.data.positionCityId) {
      // 按距离升序
      _url += "&longitude=" + _log + "&latitude=" + _lat + "&distance=" + _distance;
    }
    console.log(this.data.sortSelectedValue == "最新发布");
    if (this.data.sortSelectedValue == "最新发布") {
      // 按时间倒序
      _url += "&sort=postJobTime,desc";
    }
    var keyword = this.data.keyword;
    if (typeof keyword != 'undefined' && keyword.length > 0) {
      _url += "&keyword=" + keyword;
    }
    var _this = this;
    wx.request({
      url: _url,
      success: function success(res) {
        var data = res.data;
        _this.setData({
          totalElements: data.totalElements,
          lastPage: data.last,
          currentPage: data.number,
          jobDataList: _this.data.jobDataList.concat(data.content)
        });
        if (_this.data.scrollTop > 0 && _page == 0) {
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 450
          });
        }
      },
      fail: function fail() {
        if (!pullDown) {
          _this.data.currentPage--;
        }
      },
      complete: function complete() {
        wx.hideLoading();
      }
    });
  },

  // 关键字变化事件
  keywordChange: function keywordChange(e) {
    this.setData({
      keyword: e.detail
    });
  },

  // 搜索关键字事件
  searchKeyword: function searchKeyword(e) {
    this.reloadIndex();
  },

  // 下拉刷新事件
  onPullDownRefresh: function onPullDownRefresh() {
    this.apiIndex(true);
    wx.stopPullDownRefresh();
  },

  //  上拉加载事件
  onReachBottom: function onReachBottom() {
    this.data.currentPage++;
    this.apiIndex(false);
  },

  // 页面滚动事件
  onPageScroll: function onPageScroll(e) {
    // console.log(e)
    this.setData({
      scrollTop: e.scrollTop
    });
  },

  // 1->跳转到城市选择页面
  toCitySelect: function toCitySelect() {
    this.setData({
      showJob: false,
      showSort: false
    });
    wx.navigateTo({
      url: "../city/city"
    });
  },

  // 2->职位弹出框
  jobPopup: function jobPopup() {
    // console.log('jobPopup');
    this.setData({
      showSort: false,
      showJob: !this.data.showJob
    });
  },

  // 2->选择职位
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

  // 3->点击“确认”时替换位置信息
  openConfirm: function openConfirm() {
    var _this = this;
    wx.showModal({
      content: '是否允许授权获取当前位置信息?',
      confirmText: "确认",
      cancelText: "取消",
      success: function success(res) {
        if (res.confirm) {
          _this.setData({
            lat: _this.data.positionLat,
            log: _this.data.positionLog,
            currentDistance: 3
          });
          _this.reloadIndex();
        }
      }
    });
  },
  // 3->距离弹出框
  openDistancePopup: function openDistancePopup() {
    var _this2 = this;

    if (!this.data.log) {
      //判断是否获得了用户地理位置授权
      wx.getSetting({
        success: function success(res) {
          if (!res.authSetting['scope.userLocation']) {
            _this2.openConfirm();
          }
        }
      });
    } else {
      this.setData({
        pastDistance: this.data.currentDistance,
        showJob: false,
        showSort: false,
        showDistance: true
      });
    }
  },

  // 3->滑动更改距离
  distanceSelected: function distanceSelected(e) {
    var selectDistance = e.detail.value;
    this.setData({
      currentDistance: selectDistance
    });
  },

  // 3->隐藏距离弹出框
  hideDistancePopup: function hideDistancePopup() {
    this.setData({
      // 还原距离信息
      currentDistance: this.data.pastDistance
    });
  },

  // 3->完成选择距离
  finishDistancePopup: function finishDistancePopup() {
    var currentDistance = this.data.currentDistance;
    if (this.data.pastDistance != currentDistance) {
      // 距离发生变化时触发
      this.reloadIndex();
    }
    this.setData({
      showDistance: false,
      pastDistance: currentDistance
    });
  },

  // 4->排序弹出框
  sortPopup: function sortPopup() {
    this.setData({
      showJob: false,
      showSort: !this.data.showSort
    });
  },

  // 4->选择排序
  changeSort: function changeSort(e) {
    this.setData({
      showSort: false,
      sortSelectedValue: e.detail.value
    });
    this.reloadIndex();
  },

  // 向右滑动职位标签
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

  // 不感兴趣该职位
  notInsJob: function notInsJob(index) {
    var index = index.target.dataset.idx;
    // console.log(index);
    this.data.jobDataList.splice(index, 1);
    this.setData({
      jobDataList: this.data.jobDataList
    });
    this.setData({
      el: "undefined"
    });
  },

  // 跳转到职位详情页面
  toDeail: function toDeail(e) {
    wx.navigateTo({
      url: "../detail/detail?jobId=" + this.data.currentJobId + "&postionId=" + e.currentTarget.id
    });
  }
});