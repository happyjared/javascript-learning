/**
 * Created by happyJared on 2018-11-13.
 */
Vue.use(VueLazyload);
new Vue({
    el: '#mp',
    data: {
        mpsId: 0,
        keyword: '',
        sortBy: '',
        pageNum: 0,
        isFirst: true,
        isLast: false,
        loadingMore: false,
        domainName: 'https://mp.mariojd.cn/',
        articleList: [],
        input_value: '',
        screenWidth: document.body.clientWidth, // 屏宽
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
        input_value: function (new_value, old_value) {
            // console.log(new_value, old_value);
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

        },
        // 点击公众号
        toMp: function (mpsId) {
            if (mpsId) {
                this.pageNum = 0;
                this.mpsId = mpsId;
                this.articleList = [];
                this.loadArticle(true);
            }
        },
        // 关键字搜索
        search: function () {
            if (this.keyword) {
                this.articleList = [];
                this.loadArticle(true);
            }
        },
        // 加载显示文章
        loadArticle: function (flag) {
            this.isFirst = flag;
            this.loadingMore = !flag;

            const api = this.apiArticle();
            if (api) {
                let lodeAnimate = layer.load(1, {
                    shade: [0.2, '#000']
                });
                let _this = this;
                axios.get(api).then(function (response) {
                    let data = response.data;

                    _this.articleList = _this.articleList.concat(data.content);
                    _this.loadingMore = false;
                    _this.isLast = data.last;
                    _this.isFirst = data.first;
                    _this.pageNum = data.number;
                    console.log('IsFirst: ' + data.first + ' && IsLast: ' + data.last + ' && PageNum: ' + data.number);
                }).catch(function (error) {
                    _this.isFirst = !flag;
                    _this.loadingMore = flag;
                    console.log('Request API Article ' + api + ' Error ' + error);
                }).finally(function () {
                    layer.close(lodeAnimate);
                });
            }
        },
        // 获取请求API URL
        apiArticle: function () {
            let mpsId = this.mpsId;

            let api = '';
            if (mpsId) {
                let sort = this.sortBy;
                let keyword = this.keyword;

                if (!(this.isFirst || this.isLast) && this.loadingMore) {
                    this.pageNum += 1;
                }
                api += this.domainName + 'api/article?mpsId=' + mpsId + '&page=' + this.pageNum;
                if (sort) {
                    api += '&sort=' + sort;
                }
                if (keyword) {
                    api += '&keyword=' + keyword;
                }
            }

            console.log('Request API Article URL ' + api);
            return api
        },
    }
});
