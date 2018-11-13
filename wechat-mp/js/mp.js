/**
 * Created by happyJared on 2018-11-13.
 */
new Vue({
    el: '#mp',
    data: {
        domain: 'https://mp.mariojd.cn/',
        articleList: []
    },
    mounted: function () {
        this.$nextTick(function () {
            this.init();
        });
    },
    computed: {},
    methods: {
        // 初始化
        init: function () {
            let _this = this;
            axios.get(_this.domain + 'api/article?mpsId=3').then(function (response) {
                _this.articleList = response.data.content;
                console.log(_this.articleList)
            }).catch(function (error) {
                console.log(error);
            });
        },
        // 加载更多
        more: function () {
            axios.get(this.domain + 'api/article/1023').then(function (response) {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
            });
        },
        // 跳转详情
        detail: function () {
            
        }
    }
});
