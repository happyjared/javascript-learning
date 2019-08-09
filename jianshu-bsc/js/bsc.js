/**
 * Created by happyJared on 2018-11-13.
 */
Vue.use(VueLazyload);
new Vue({
    el: '#bsc',
    data: {
        size: 0,
        rankList: [],
        domainName: 'http://jianshu.mariojd.cn',
        screenWidth: document.body.clientWidth,
    },
    created() {
    },
    mounted: function () {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        console.log("Screen width : " + this.screenWidth);
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
    },
});