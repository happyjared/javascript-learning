'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Page({
    data: {
        jobList: [{ color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }, { color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }, { color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }, { color: '#FCB300', title: '广播', text: '第37周|总票房8.11亿较上周上涨4.38%，《猩猿崛起》突破票房10亿', switcher: 'off', icon: 'api-access' }, { color: '#FF7360', title: '总结', text: '总票房9.60亿较上周 下降30.64%，《战狼2》突破票房10亿', switcher: 'off', icon: 'api-network' }, { color: '#39CCC5', title: '脑洞', text: '本周悬疑《心理罪》、喜剧《鲛珠传》、动作《上船下套》等多部电影在电影院上映。', switcher: 'off', icon: 'api-configure' }],
        el: 'undefined',
        currentCity: '广州',
        width: wx.WIN_WIDTH,
        show: false,
        defaultDistance: 3,
        tbObj6: {
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
        show5: false,
        title5: '岗位',
        poptpTop: wx.DEFAULT_HEADER_HEIGHT - 5,
        height: wx.DEFAULT_CONTENT_HEIGHT,
        data3: [{
            name: '后端开发',
            value: 'DP_01',
            children: [{ name: 'Java', value: 'DP_0101' }, { name: 'Python', value: 'DP_0102' }, { name: 'Php', value: 'DP_0103' }]
        }, {
            name: '移动开发',
            value: 'DP_02',
            children: [{ name: 'Andrioid', value: 'DP_0201' }, { name: 'IOS', value: 'DP_0202' }, { name: 'Web前端', value: 'DP_0203' }]
        }]
    },
    handleselected5: function handleselected5(e) {
        var data = e.detail;
        this.data.title4 = "";
        for (var i = 0; i < data.length; i++) {
            this.data.title4 += data[i].name + ' ';
        }
        this.setData({
            show5: false,
            title4: this.data.title4
        });
    },
    showPop5: function showPop5() {
        this.setData({
            show5: true
        });
    },
    showPopup: function showPopup() {
        this.setData({
            show: true
        });
    },
    hidePopup: function hidePopup() {
        this.setData({
            show: false
        });
    },
    del: function del(index) {
        var index = index.target.dataset.idx;
        console.log(index);
        this.data.jobList.splice(index, 1);
        console.log(this.data.jobList);
        this.setData({
            jobList: this.data.jobList
        });
        console.log(this.data.jobList);
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
                this.data.jobList[this.data.el].switcher = 'off';
            }
            this.data.jobList[index].switcher = 'on';
            this.setData({
                jobList: this.data.jobList
            });
            this.data.el = index;
        }
    },
    selectCity: function selectCity() {
        wx.navigateTo({
            url: '../city/city'
        });
    }
});