'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        width: wx.WIN_WIDTH,
        height: wx.DEFAULT_CONTENT_HEIGHT,
        poptpTop: wx.DEFAULT_HEADER_HEIGHT - 5,
        jobDataList: [{ color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }, { color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }, { color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }, { color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }],
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
        currentJob: '职位',
        jobList: [{
            name: '后端开发',
            children: [{ name: 'java', value: 1 }, { name: 'python', value: 2 }, { name: 'php', value: 3 }]
        }, {
            name: '移动开发',
            children: [{ name: 'andrioid', value: 4 }, { name: 'ios', value: 5 }, { name: 'web前端', value: 6 }]
        }]
    },
    jobSelected: function jobSelected(e) {
        var data = e.detail;
        this.setData({
            showJob: !this.data.showJob,
            currentJob: data[1].name
        });
    },
    jobPopup: function jobPopup() {
        this.setData({
            showJob: !this.data.showJob
        });
    },
    distanceSelected: function distanceSelected(e) {
        var data = e.detail;
        this.setData({
            currentDistance: data.value
        });
    },
    distancePopup: function distancePopup() {
        this.setData({
            showDistance: !this.data.showDistance
        });
    },
    notInterestingJob: function notInterestingJob(index) {
        var index = index.target.dataset.idx;
        console.log(index);
        this.data.jobDataList.splice(index, 1);
        console.log(this.data.jobDataList);
        this.setData({
            jobDataList: this.data.jobDataList
        });
        console.log(this.data.jobDataList);
        this.setData({
            el: 'undefined'
        });
    },

    toDeail: function toDeail(e) {
        console.log('to detail');
    },
    changeHandler1: function changeHandler1(res) {
        console.log(this.data.el);
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
    toCitySelect: function toCitySelect() {
        wx.navigateTo({
            url: '../city/city'
        });
    }
});