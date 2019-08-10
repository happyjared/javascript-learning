/**
 * Created by happyJared on 2019-08-10.
 */
Vue.use(VueLazyload);
new Vue({
    el: '#bsc',
    data: {
        size: 0,
        rankList: [],
        domainName: 'https://jianshu.mariojd.cn',
        largeScreen: true,
        screenWidth: document.body.clientWidth,
    },
    created() {
    },
    mounted: function () {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.largeScreen = this.screenWidth > 768;
        console.log("Screen width : " + this.screenWidth + " ; Large screen: " + this.largeScreen);
        this.$nextTick(function () {
            this.loadArticle();
        });
    },
    filters: {},
    computed: {},
    watch: {},
    methods: {
        // 初始化
        init: function () {
            this.loadMp();
        },
        // 请求API
        loadArticle: function () {
            let lodeAnimate = layer.load(1, {
                shade: [0.3, '#0b0b0b']
            });
            axios.post(this.getApi()).then(response => {
                this.rankList = response.data;
                this.size = this.rankList.length;
                console.log('RankList size: ' + this.size);
            }).catch(function (error) {
                console.log('Request API Error ' + error);
            }).finally(function () {
                layer.close(lodeAnimate);
            });
        },
        getApi: function () {
            let api = this.domainName + '/rank/';
            console.log('Request API URL ' + api);
            return api;
        },
        getTableColor: function (index) {
            if (index === 0) {
                return "table-danger";
            } else if (index >= 1 && index <= 5) {
                return "table-success";
            } else if (index >= 6 && index <= 13) {
                return "table-primary";
            } else if (index >= 14 && index <= 23) {
                return "table-warning";
            } else if (index >= 24 && index <= 53) {
                return "table-secondary";
            }
        },
    },
});