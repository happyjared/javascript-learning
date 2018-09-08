'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _date = require('../../static/utils/date.js');

var _date2 = _interopRequireDefault(_date);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sortStyle = '\n    background: #efefef;\n    color: #999;\n    margin:5px 0 5px 10px;\n    font-size: 12px;\n    border-radius: 30px;\n    height: 25px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    line-height: 20px;\n';

var sortSelectStyle = '\n    border: 1px solid #A9DC21;\n    background: #efefef;\n    color: #A9DC21;\n    margin:5px 0 5px 10px;\n    font-size: 12px;\n    border-radius: 30px;\n    height: 25px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    line-height: 20px;\n';

exports.default = Page({
    data: {
        width: wx.WIN_WIDTH,
        height: wx.DEFAULT_CONTENT_HEIGHT,
        poptpTop: wx.DEFAULT_HEADER_HEIGHT - 6,
        colorList: ['#FCB300', '#FF7360', '#39CCC5'],
        iconList: ['api-access', 'api-network', 'api-configure', 'api-media', 'api-data'],
        el: 'undefined',
        // 职位信息数据
        jobDataList: [],
        // 城市数据相关
        currentCity: '广州',
        currentCityId: 3,
        showDistance: false,
        // 距离数据相关
        currentDistance: 3,
        styleOfDistance: {
            'background-image': 'url(http://images.uileader.com/20180417/7bec98d5-4efa-424a-b294-e416da6159bd.png)',
            'background-position': '50% 50%',
            'background-repeat': 'no-repeat',
            'background-color': '#fff',
            'border': '1px solid #ececec',
            'width': '26px',
            'height': '18px',
            'top': '4px',
            'left': '0px',
            'border-radius': '5px'
        },
        // 职位数据相关
        showJob: false,
        currentJob: 'java',
        currentJobId: 1,
        jobList: [{
            name: '后端开发',
            children: [{ name: 'java', value: 1 }, { name: 'python', value: 3 }, { name: 'php', value: 2 }]
        }, {
            name: '移动开发',
            children: [{ name: 'andrioid', value: 4 }, { name: 'ios', value: 5 }, { name: 'web前端', value: 6 }]
        }],
        // 排序数据相关
        sortList: [{
            text: '最新发布',
            tagStyle: sortStyle,
            tagSelectedStyle: sortSelectStyle,
            checked: true
        }, {
            text: '离我最近',
            tagStyle: sortStyle,
            tagSelectedStyle: sortSelectStyle,
            checked: false
        }, {
            text: '数据来源',
            tagStyle: sortStyle,
            tagSelectedStyle: sortSelectStyle,
            checked: false
        }],
        // 分页数据相关
        log: 0,
        lat: 0,
        currentPage: 0,
        lastPage: false
    },
    //初始加载事件
    onLoad: function onLoad() {
        this.indexRequest();
        var _this = this;
        wx.getLocation({
            type: 'gcj02',
            success: function success(res) {
                console.log('get location success');
                _this.data.log = res.longitude;
                _this.data.lat = res.latitude;
                _this.reloadIndex();
            }
        });
    },

    // 重新请求首页数据
    reloadIndex: function reloadIndex() {
        this.data.currentPage = 0, this.data.lastPage = false, this.data.jobDataList.length = 0, this.indexRequest();
    },

    // api/index统一请求入口
    indexRequest: function indexRequest() {
        if (this.data.lastPage) {
            return;
        }
        var _url = 'https://mini.mariojd.cn/api/index?jobId=' + this.data.currentJobId + '&cityId=' + this.data.currentCityId + '&page=' + this.data.currentPage;
        var _log = this.data.log;
        var _lat = this.data.lat;
        if (_log && _lat) {
            _url += '&longitude=' + _log + '&latitude=' + _lat + '&distance=' + this.data.currentDistance;
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
            }
        });
    },

    // 下拉刷新事件
    onPullDownRefresh: function onPullDownRefresh() {
        this.indexRequest();
        wx.stopPullDownRefresh();
    },

    //上拉加载事件
    onReachBottom: function onReachBottom() {
        this.data.currentPage++;
        this.indexRequest();
    },

    // 修改排序规则
    changeSort: function changeSort(e) {
        var opt = e.detail.index;
        wx.showToast({
            title: this.data.sortList[opt].text,
            icon: 'none'
        });
        this.data.sortList.forEach(function (item, index) {
            item.checked = index === opt;
        });
        this.setData({
            sortList: this.data.sortList
        });
    },

    // 选择职位
    jobSelected: function jobSelected(e) {
        var data = e.detail;
        this.setData({
            showJob: !this.data.showJob,
            currentJob: data[1].name,
            currentJobId: data[1].value
        });
        this.reloadIndex();
    },

    // 职位弹出框
    jobPopup: function jobPopup() {
        this.setData({
            showJob: !this.data.showJob
        });
    },

    // 选择距离
    distanceSelected: function distanceSelected(e) {
        var data = e.detail;
        this.setData({
            currentDistance: data.value
        });
    },

    // 距离弹出框
    distancePopup: function distancePopup(e) {
        this.setData({
            showDistance: !this.data.showDistance
        });
        if (e.target.dataset.finish === 'true') {
            // 点击"完成"触发
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
            el: 'undefined'
        });
    },

    // 切换滑动标签
    switchSlideTab: function switchSlideTab(res) {
        var index = res.currentTarget.dataset.index;
        if (this.data.el !== index) {
            if (this.data.el !== 'undefined') {
                this.data.jobDataList[this.data.el].switcher = 'off';
            }
            this.data.jobDataList[index].switcher = 'on';
            this.setData({
                jobDataList: this.data.jobDataList
            });
            this.data.el = index;
        }
    },

    // 跳转到职位详情页面
    toDeail: function toDeail(e) {
        wx.navigateTo({
            url: '../detail/detail?jobId=' + this.data.currentJobId + '&postionId=' + e.currentTarget.id
        });
    },
    // 跳转到城市选择页面
    toCitySelect: function toCitySelect() {
        wx.navigateTo({
            url: '../city/city'
        });
    }
});