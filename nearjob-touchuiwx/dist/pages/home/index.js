"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var sortStyle = "\n    background: #efefef;\n    color: #999;\n    margin:5px 0 5px 10px;\n    font-size: 12px;\n    border-radius: 30px;\n    height: 25px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    line-height: 20px;\n";

var sortSelectStyle = "\n    border: 1px solid #A9DC21;\n    background: #efefef;\n    color: #A9DC21;\n    margin:5px 0 5px 10px;\n    font-size: 12px;\n    border-radius: 30px;\n    height: 25px;\n    display: flex;\n    justify-content: center;\n    align-items: center;\n    line-height: 20px;\n";
exports.default = Page({
    data: {
        width: wx.WIN_WIDTH,
        height: wx.DEFAULT_CONTENT_HEIGHT,
        poptpTop: wx.DEFAULT_HEADER_HEIGHT - 6,
        colorList: ['#FCB300', '#FF7360', '#39CCC5'],
        iconList: ['api-access', 'api-network', 'api-configure', 'api-media', 'api-data'],
        jobDataList: [
            // { color: '#FCB300', title:'Java开发工程师 / 30k-50k', text: '本科 | 经验3-5年 | 150-500人', switcher: 'off', icon: 'api-access'},
            // { color: '#FF7360', title:'Java开发工程师 / 30k-50k', text: '本科 | 经验3-5年 | 150-500人', switcher: 'off', icon: 'api-network'},
            // { color: '#39CCC5', title:'Java开发工程师 / 30k-50k', text: '本科 | 经验3-5年 | 150-500人', switcher: 'off', icon: 'api-configure'},
            // { color: '#FCB300', title:'Java开发工程师 / 30k-50k', text: '本科 | 经验3-5年 | 150-500人', switcher: 'off', icon: 'api-media'},
            // { color: '#FF7360', title:'Java开发工程师 / 30k-50k', text: '本科 | 经验3-5年 | 150-500人', switcher: 'off', icon: 'api-data'},
        ],
        el: 'undefined',
        currentCity: '广州',
        showDistance: false,
        defaultDistance: 3,
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
        showJob: false,
        currentJob: 'java',
        jobList: [{
            name: '后端开发',
            children: [{ name: 'java', value: 1 }, { name: 'python', value: 2 }, { name: 'php', value: 3 }]
        }, {
            name: '移动开发',
            children: [{ name: 'andrioid', value: 4 }, { name: 'ios', value: 5 }, { name: 'web前端', value: 6 }]
        }],
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
        }]
    },
    //初始加载事件
    onLoad: function onLoad() {
        var _this = this;
        wx.request({
            url: 'https://mini.mariojd.cn/api/index?jobId=1&cityId=3&size=5&longitude=113.30404&latitude=23.13209&distance=10',
            success: function success(res) {
                var resData = res.data;
                var dataList = [];
                resData.content.forEach(function (resJob, index) {
                    var title = resJob.jobName + ' / ' + resJob.jobSalary;
                    var color = _this.data.colorList[index >= 3 ? index - 3 : index];
                    var text = resJob.jobEducation + ' | 经验' + resJob.jobExperience;
                    var icon = _this.data.iconList[index >= 5 ? index - 5 : index];
                    dataList.push({ color: color, title: title, text: text, switcher: 'off', icon: icon });
                });
                _this.setData({
                    jobDataList: dataList
                });
            }
        });
    },

    // 下拉刷新事件
    onPullDownRefresh: function onPullDownRefresh() {
        console.log("down refresh...");
        wx.stopPullDownRefresh();
    },

    //上拉加载事件
    onReachBottom: function onReachBottom() {
        console.log("reach refresh...");
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
            currentJob: data[1].name
        });
    },

    // 职位弹出框
    jobPopup: function jobPopup() {
        console.log('jobPopup');
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
    distancePopup: function distancePopup() {
        this.setData({
            showDistance: !this.data.showDistance
        });
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
            url: "../detail/detail"
        });
    },
    // 跳转到城市选择页面
    toCitySelect: function toCitySelect() {
        wx.navigateTo({
            url: "../city/city"
        });
    }
});