/**
 * Created by happyJared on 2018-11-13.
 */
Vue.use(VueLazyload);
new Vue({
    el: '#mp',
    data: {
        mpsId: 0,
        keyword: '',
        sortDesc: true,
        pageNum: 0,
        isFirst: true,
        isLast: false,
        loadingMore: false,
        requesting: false,
        endTime: 0,
        startTime: 0,
        dateValue: [],
        domainName: 'https://mp.mariojd.cn/',
        articleList: [],
        weChatMpList: [],
        input_value: '',
        screenWidth: document.body.clientWidth, // 屏宽
        dateEditable: false,
        dateOptions: {
            disabledDate(date) {
                return date.valueOf() > Date.now();
            },
            shortcuts: [
                {
                    text: '近1周',
                    value() {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        return [start, end];
                    }
                },
                {
                    text: '近1个月',
                    value() {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        return [start, end];
                    }
                },
                {
                    text: '近3个月',
                    value() {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        return [start, end];
                    }
                },
                {
                    text: '半年内',
                    value() {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 183);
                        return [start, end];
                    }
                },
                {
                    text: '一年内',
                    value() {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                        return [start, end];
                    }
                }
            ]
        }
    },
    created() {
        let _this = this;
        window.onscroll = function () {
            //变量scrollTop是滚动条滚动时，距离顶部的距离
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            //变量windowHeight是可视区的高度
            let windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
            //变量scrollHeight是滚动条的总高度
            let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
            //滚动条到底部的条件
            if (scrollTop + windowHeight === scrollHeight && !_this.isLast) {
                //写后台加载数据的函数
                _this.loadArticle(_this.loadingMore);
                console.log("距顶部" + scrollTop + "可视区高度" + windowHeight + "滚动条总高度" + scrollHeight);
            }
        }
    },
    mounted: function () {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        console.log("Screen width : " + this.screenWidth);
        this.$nextTick(function () {
            this.init();
        });
    },
    filters: {},
    computed: {},
    watch: {
        // 搜索框输入
        input_value: function (new_value, old_value) {
            console.log(new_value, old_value);
            this.keyword = new_value;
        },
    },
    methods: {
        // 初始化
        init: function () {
            this.loadMp();
        },
        // 加载公众号
        loadMp: function () {
            const api = this.apiWeChatMp();
            if (api) {
                let lodeAnimate = layer.load(1, {
                    shade: [0.3, '#0b0b0b']
                });
                let _this = this;
                axios.get(api).then(function (response) {
                    let contentList = response.data.content;
                    _this.weChatMpList = _this.weChatMpList.concat(contentList);

                    console.log('ContentList size: ' + contentList.length);
                }).catch(function (error) {
                    console.log('Request API WeChatMp ' + api + ' Error ' + error);
                }).finally(function () {
                    layer.close(lodeAnimate);
                });
            }
        },
        // 点击公众号
        toMp: function (mpsId) {
            if (mpsId) {
                this.backInitData();
                this.mpsId = mpsId;
                this.startTime = 0;
                this.endTime = 0;
                this.dateValue = [];
                this.loadArticle(true);
            }
        },
        // 关键字搜索
        search: function () {
            if (this.keyword) {
                this.backInitData();
                this.loadArticle(true);
            }
        },
        // 加载显示文章
        loadArticle: function (flag) {
            if (!this.requesting) {
                this.isFirst = flag;
                this.loadingMore = !flag;

                const api = this.apiArticle();
                if (api) {
                    this.requesting = true;
                    let lodeAnimate = layer.load(1, {
                        shade: [0.2, '#000']
                    });
                    let _this = this;
                    axios.get(api).then(function (response) {
                        let data = response.data;

                        _this.articleList = _this.articleList.concat(data.content);
                        _this.isLast = data.last;
                        _this.isFirst = data.first;
                        _this.pageNum = data.number;
                        console.log('IsFirst: ' + data.first + ' && IsLast: ' + data.last + ' && PageNum: ' + data.number);
                        _this.loadingMore = false;
                    }).catch(function (error) {
                        _this.isFirst = !flag;
                        _this.loadingMore = flag;
                        console.log('Request API Article ' + api + ' Error ' + error);
                    }).finally(function () {
                        _this.requesting = false;
                        layer.close(lodeAnimate);
                    });
                }
            }
        },
        // 获取请求WeChatMp API URL
        apiWeChatMp: function () {
            let api = this.domainName + 'api/mp/list';
            console.log('Request API WeChatMp URL ' + api);
            return api;
        },
        // 获取请求Article API URL
        apiArticle: function () {
            let mpsId = this.mpsId;

            let api = '';
            if (mpsId && !this.isLast) {
                let sortDesc = this.sortDesc;
                let keyword = this.keyword;
                let startTime = this.startTime;
                let endTime = this.endTime;

                if (!(this.isFirst || this.isLast) && this.loadingMore) {
                    this.pageNum += 1;
                }
                api += this.domainName + 'api/article?mpsId=' + mpsId + '&page=' + this.pageNum;
                if (keyword) {
                    api += '&keyword=' + keyword;
                }
                if (startTime && endTime) {
                    api += '&startTime=' + startTime + '&endTime=' + endTime;
                }
                if (sortDesc) {
                    api += '&sort=postTime,DESC';
                } else {
                    api += '&sort=postTime,ASC';
                }
            }

            console.log('Request API Article URL ' + api);
            return api
        },
        // 帅选时间条件
        changeDate: function (date) {
            this.startTime = Date.parse(date[0]);
            this.endTime = Date.parse(date[1]);
            this.backInitData();
            this.loadArticle(true);
        },
        // 重置初始数据
        backInitData: function () {
            this.pageNum = 0;
            this.isFirst = true;
            this.isLast = false;
            this.loadingMore = false;
            this.articleList = [];
        },
        // 切换排序条件
        changeSort: function (sort) {
            this.sortDesc = !sort;
            this.backInitData();
            this.loadArticle(true);
        },
    },
});