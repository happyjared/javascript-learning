/**
 * Created by Mario on 2017-05-25.
 */
new Vue({
    el: '.container',
    data: {
        limitNum: 3,
        addressList: [],
        addressIndex: 0,
        loadMoreFlag: false,
        shippingMethod: 1,
    },
    mounted: function () {
        this.$nextTick(function () {
            this.queryAddress();
        });
    },
    computed: {
        // 地址过滤，只显示前三条地址
        addressFilter: function () {
            return this.addressList.slice(0, this.limitNum)
        }
    },
    methods: {
        // 初始化数据
        queryAddress: function () {
            var _this = this;
            this.$http.get("data/address.json").then(function (response) {
                var res = response.data;
                if (res.status == "200") {
                    _this.addressList = res.result;
                }
            })
        },
        // 设置默认地址
        setDefaultAddress: function (id) {
            var _this = this;
            _this.addressList.forEach(function (item) {
                if (item.addressId == id) {
                    item.isDefault = true;
                } else {
                    item.isDefault = false;
                }
            })
        },
        // 加载更多地址
        loadMore: function () {
            this.loadMoreFlag = !this.loadMoreFlag;
            if (this.loadMoreFlag) {
                this.limitNum = this.addressList.length;
            } else {
                this.limitNum = 3;
            }
        },
        // 删除当前地址
        deleteAddress: function (index) {
            this.addressList.splice(index, 1);
        }
    }
});
