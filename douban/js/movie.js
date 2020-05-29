/**
 * Created by happyJared on 2019-08-10.
 */
Vue.use(VueLazyload);
new Vue({
    el: '#movie',
    data: {
        size: 0,
        movieList: [],
        domainName: 'https://jianshu.mariojd.cn/api',
        largeScreen: true,
        screenWidth: document.body.clientWidth,
        yes: 0,
        no: 0,
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
                this.movieList = response.data.content;
                this.size = response.data.size;
                this.no = this.movieList.filter(item => !item.status).length;
                this.yes = this.movieList.filter(item => item.status).length;
                console.log('ResultLisT size: ' + this.size);
            }).catch(function (error) {
                console.log('Request API Error ' + error);
            }).finally(function () {
                layer.close(index);
                layer.closeAll();
            });
        },
        isWeiXin: function (){
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
        },
    },
});