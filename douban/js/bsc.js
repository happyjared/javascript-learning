/**
 * Created by happyJared on 2019-08-10.
 */
Vue.use(VueLazyload);
new Vue({
    el: '#movie',
    data: {
        size: 0,
        rankList: [],
        domainName: 'https://jianshu.mariojd.cn/api',
        largeScreen: true,
        screenWidth: document.body.clientWidth,
    },
    created() {
     this.init();
    },
    mounted: function () {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.largeScreen = this.screenWidth > 768;
        console.log("Screen width : " + this.screenWidth + " ; Large screen: " + this.largeScreen);
    },
    filters: {},
    computed: {},
    watch: {},
    methods: {
        init: function () {
            if(!this.isWeiXin()){
                layer.ready(res => {
                    var index = layer.load(1, {
                        time: 3000,
                        shade: [0.3, '#0b0b0b'],
                    });
                    this.getApi(index);
                });
            }else{
                this.getApi(-1);
            }
        },
        // 请求API
        getApi: function (index) {
            let api = this.domainName + '/douban/movie/top250';
            axios.get(api).then(response => {
                this.rankList = response.data;
                this.size = this.rankList.length;
                console.log('RankList size: ' + this.size);
            }).catch(function (error) {
                console.log('Request API Error ' + error);
            }).finally(function () {
                layer.close(index);
                layer.closeAll();
            });
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
        isWeiXin: function (){
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
        },
    },
});