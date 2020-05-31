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
        screenHeight: document.body.clientHeight,
        yes: 0,
        no: 0,
        tableSize: 'default',
        tableColumnsChecked: ['sort', 'language', 'movieType', 'releaseYear', 'score', 'scoreMembers', 'duration', 'statusText'],
        headers: [
            {
                title: '排名',
                key: 'sort',
                sortable: true,
                align: "center",
                width: 95,
                filters: [
                    {
                        label: '1 - 50',
                        value: 1
                    },
                    {
                        label: '51 - 100',
                        value: 2
                    },
                    {
                        label: '101 - 150',
                        value: 3
                    },
                    {
                        label: '151 - 200',
                        value: 4
                    },
                    {
                        label: '201 - 250',
                        value: 5
                    }
                ],
                filterMethod(value, row) {
                    if (value === 1) {
                        return row.sort <= 50;
                    }
                    if (value === 2) {
                        return row.sort > 50 && row.sort <= 100;
                    }
                    if (value === 3) {
                        return row.sort > 100 && row.sort <= 150;
                    }
                    if (value === 4) {
                        return row.sort > 150 && row.sort <= 200;
                    }
                    return row.sort > 200;
                },
            },
            {
                title: '电影',
                key: 'name',
                width: 200,
                ellipsis: true,
                render: (h, params) => {
                    return h('div', [
                        h('img', {
                            attrs: {
                                src: "http://xhs.mariojd.cn/douban/" + params.row.path,
                                style: 'width: 54px; height: 80px; margin: 10px 10px 10px 0;',
                                class: 'rounded',
                            },
                            on: {
                                click: () => {
                                    Vue.prototype.$Modal.info({
                                        title: params.row.name,
                                        content: params.row.desc,
                                        width: 600,
                                    });
                                }
                            },
                        }),
                        h('Tooltip', {
                            attrs: {
                                content: params.row.quote,
                                placement: "top-start",
                            },
                        }, params.row.name),
                    ]);
                },
            },
            {
                title: '语言',
                key: 'language',
                sortable: true,
                // align: "center",
                width: 160,
                ellipsis: true,
                filters: [
                    {
                        label: '汉语',
                        value: '汉语'
                    },
                    {
                        label: '粤语',
                        value: '粤语'
                    },
                    {
                        label: '英语',
                        value: '英语'
                    },
                    {
                        label: '韩语',
                        value: '韩语'
                    },
                    {
                        label: '日语',
                        value: '日语'
                    },
                    {
                        label: '法语',
                        value: '法语'
                    },
                    {
                        label: '德语',
                        value: '德语'
                    },
                    {
                        label: '俄语',
                        value: '俄语'
                    },
                    {
                        label: '印地语',
                        value: '印地语'
                    },
                    {
                        label: '挪威语',
                        value: '挪威语'
                    },
                    {
                        label: '意大利语',
                        value: '意大利语'
                    },
                    {
                        label: '西班牙语',
                        value: '西班牙语'
                    },
                    {
                        label: '阿拉伯语',
                        value: '阿拉伯语'
                    }
                ],
                filterMethod(value, row) {
                    return row.language.indexOf(value) > -1;
                },
            },
            {
                title: '类型',
                key: 'movieType',
                sortable: true,
                // align: "center",
                width: 160,
                ellipsis: true,
                filters: [
                    {
                        label: '剧情',
                        value: '剧情'
                    },
                    {
                        label: '动作',
                        value: '动作'
                    },
                    {
                        label: '科幻',
                        value: '科幻'
                    },
                    {
                        label: '惊悚',
                        value: '惊悚'
                    },
                    {
                        label: '传记',
                        value: '传记'
                    },
                    {
                        label: '战争',
                        value: '战争'
                    },
                    {
                        label: '音乐',
                        value: '音乐'
                    },
                    {
                        label: '同性',
                        value: '同性'
                    },
                    {
                        label: '喜剧',
                        value: '喜剧'
                    },
                    {
                        label: '爱情',
                        value: '爱情'
                    },
                    {
                        label: '犯罪',
                        value: '犯罪'
                    },
                    {
                        label: '家庭',
                        value: '家庭'
                    },
                    {
                        label: '动画',
                        value: '动画'
                    }
                ],
                filterMethod(value, row) {
                    return row.movieType.indexOf(value) > -1;
                },
            },
            {
                title: '上映',
                key: 'releaseYear',
                sortable: true,
                align: "center",
                filters: [
                    {
                        label: '1980年之前',
                        value: 1
                    },
                    {
                        label: '1980 ~ 1999',
                        value: 2
                    },
                    {
                        label: '2000 ~ 2009',
                        value: 3
                    },
                    {
                        label: '2010年至今',
                        value: 4
                    }
                ],
                filterMethod(value, row) {
                    if (value === 1) {
                        return row.releaseYear < 1980;
                    }
                    if (value === 2) {
                        return row.releaseYear >= 1980 && row.releaseYear < 2000;
                    }
                    if (value === 3) {
                        return row.releaseYear >= 2000 && row.releaseYear < 2010;
                    }
                    return row.releaseYear >= 2010;
                },
            },
            {
                title: '评分',
                key: 'score',
                sortable: true,
                align: "center",
                filters: [
                    {
                        label: '8.0 ~ 8.4',
                        value: 1
                    },
                    {
                        label: '8.5 ~ 8.9',
                        value: 2
                    },
                    {
                        label: '9.0 ~ 9.4',
                        value: 3
                    },
                    {
                        label: '9.5 ~ 10.0',
                        value: 4
                    }
                ],
                filterMethod(value, row) {
                    if (value === 1) {
                        return row.score < 8.5;
                    }
                    if (value === 2) {
                        return row.score >= 8.5 && row.score < 9.0;
                    }
                    if (value === 3) {
                        return row.score >= 9.0 && row.score < 9.5;
                    }
                    return row.score >= 9.5;
                },
            },
            {
                title: '人次',
                key: 'scoreMembers',
                sortable: true,
                // align: "center",
                filters: [
                    {
                        label: '[0,500000)',
                        value: 1
                    },
                    {
                        label: '[500000,1000000)',
                        value: 2
                    },
                    {
                        label: '[1000000,+∞)',
                        value: 3
                    }
                ],
                filterMultiple: false,
                filterMethod(value, row) {
                    if (value === 1) {
                        return row.scoreMembers < 500000;
                    }
                    if (value === 2) {
                        return row.scoreMembers >= 500000 && row.scoreMembers < 1000000;
                    }
                    return row.scoreMembers >= 1000000;
                },
            },
            {
                title: '时长',
                key: 'duration',
                sortable: true,
                align: "center",
                filters: [
                    {
                        label: '小于90',
                        value: 1
                    },
                    {
                        label: '小于120',
                        value: 2
                    },
                    {
                        label: '大于120',
                        value: 3
                    }
                ],
                filterMultiple: false,
                filterMethod(value, row) {
                    if (value === 1) {
                        return row.duration < 90;
                    }
                    if (value === 2) {
                        return row.duration < 120;
                    }
                    return row.duration >= 120;
                },
            },
            {
                title: '状态',
                key: 'statusText',
                sortable: true,
                align: "center",
                filters: [
                    {
                        label: '看过',
                        value: true
                    },
                    {
                        label: '未看',
                        value: false
                    }
                ],
                filterMultiple: false,
                filterMethod(value, row) {
                    if (value) {
                        return row.status;
                    }
                    return !row.status;
                },
                render: (h, params) => {
                    if (params.row.status) {
                        return h('Tooltip', {
                            attrs: {
                                // placement: "right",
                                content: params.row.markTime,
                                style: 'background-color: #ffdfd7;color: #515a6e;font-weight: bolder;',
                            },
                        }, params.row.statusText);
                    } else {
                        return h('span', {
                            attrs: {},
                        }, params.row.statusText);
                    }
                },
            }
        ],
    },
    created() {
        this.init();
    },
    mounted: function () {
        this.screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        this.largeScreen = this.screenWidth > 768;
        console.log("Screen width : " + this.screenWidth + " ; Large screen: " + this.largeScreen);
        this.screenHeight = window.innerWidth || document.documentElement.clientHeight || document.body.clientHeight;
        console.log("Screen height : " + this.screenHeight);
    },
    filters: {},
    computed: {},
    watch: {},
    methods: {
        init: function () {
            if (!this.isWeiXin()) {
                layer.ready(res => {
                    var index = layer.load(1, {
                        time: 3000,
                        shade: [0.3, '#0b0b0b'],
                    });
                    this.getApi(index);
                });
            } else {
                this.getApi(-1);
            }
        },
        // 请求API
        getApi: function (index) {
            let api = this.domainName + '/douban/movie/top250';
            axios.get(api).then(response => {
                this.movieList = response.data.content.map(item => {
                    item.statusText = item.status ? '看过' : '未看';
                    return item;
                });
                this.size = response.data.size;
                this.no = this.movieList.filter(item => !item.status).length;
                this.yes = this.movieList.filter(item => item.status).length;
                console.log('ResultLisT size: ' + this.size);
            }).catch(function (error) {
                console.log('Request API Error ' + error);
            }).finally(function () {
                layer.close(index);
                layer.closeAll();
                Vue.prototype.$Notice.info({
                    title: '温馨提示',
                    desc: "双击即可快速跳转豆瓣电影",
                    duration: 30
                });
            });
        },
        rowClassName(row) {
            if (row.status) {
                return 'badge-danger';
            }
            return '';
        },
        toDouban(row) {
            window.open(row.link)
        },
        isWeiXin: function () {
            return navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1;
        },
    },
});