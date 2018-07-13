/**
 * Created by Mario on 2017-05-25.
 */
new Vue({
    el: '#app',
    data: {
        productList: [],
        totalMoney: 0,
        checkAll: false,
        showModal: false,
        currentProduct: ''
    },
    mounted: function () {
        return this.cartview();
    },
    filters: {
        //格式化金额
        formatMoney: function (price, quentity) {
            return "¥ " + (price * quentity).toFixed(2) + "元";
        }
    },
    methods: {
        //初始化
        cartview: function () {
            this.$http.get('data/cart.json').then(function (response) {
                var res = response.data;
                if (res && res.status == '200') {
                    this.productList = res.result.list;
                    this.selectAll(true);
                    this.calcTotalMoney();
                }
            })
        },
        //修改数量
        changeMoney: function (product, way) {
            if (way > 0) {
                product.productQuentity++;
            } else {
                if (product.productQuentity == 1) {
                    this.$set(product, "checked", false);
                    this.checkIsSelectAll();
                } else if (product.productQuentity == 0) {
                    return;
                }
                product.productQuentity--;
            }
            this.calcTotalMoney();
        },
        //单选
        selectedProduct: function (product) {
            if (!product.productQuentity > 0) {
                return;
            }
            if (typeof product.checked == "undefined") {
                //Vue.set(product,"checked",true);
                this.$set(product, "checked", true);
            } else {
                product.checked = !product.checked;
            }
            this.calcTotalMoney();
            this.checkIsSelectAll();
        },
        //全选、取消全选
        selectAll: function (flag) {
            this.checkAll = flag;
            var _this = this;
            this.productList.forEach(function (item) {
                if (!item.productQuentity > 0) {
                    return;
                }
                if (typeof item.checked == "undefined") {
                    Vue.set(item, "checked", _this.checkAll);
                } else {
                    item.checked = _this.checkAll;
                }
            });
            this.calcTotalMoney();
        },
        //判断是否全部被选中
        checkIsSelectAll: function () {
            let flag = true;
            this.productList.forEach(function (item) {
                if (!item.checked) {
                    flag = false;
                }
            })
            if (flag) {
                this.checkAll = true;
            } else {
                this.checkAll = false;
            }
        },
        //计算总额
        calcTotalMoney: function () {
            let totalMoney = 0;
            this.productList.forEach(function (item) {
                if (item.checked) {
                    totalMoney += item.productPrice * item.productQuentity;
                }
            });
            this.totalMoney = totalMoney;
        },
        //点击删除
        delConfirm: function (product) {
            this.showModal = true;
            this.currentProduct = product;
        },
        //确认删除
        delCurrentProduct: function () {
            var index = this.productList.indexOf(this.currentProduct);
            this.productList.splice(index, 1);
            this.showModal = false;
            this.calcTotalMoney();
        }
    }
});
