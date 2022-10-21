// 初始化wow
new WOW().init()



// 渲染产品页面
function show() {
    // 获取元素
    // 使用 $.ajax 方法也可以发送 jsonp 请求
    // 只不过 dataType 要写成 jsonp
    $.ajax({
        url: 'https://mock.apifox.cn/m1/1437381-0-default/shopping/list/',
        dataType: 'json',
        success(data) {

            // 获取商品内容区
            var content = document.querySelector('#product .content .right')

            // 商品种类分类
            function classification() {
                // 除去最后一个图片
                $('#product .left li:not(:nth-last-child(1))').click(function () {
                    // 改变颜色
                    $('#product .left li').css({
                        'background-color': '#f2f2f2',
                        'color': 'black'
                    })
                    $(this).css({
                        'background-color': '#f08745',
                        'color': 'white'
                    })

                    // 改变数据
                    let classdata = data.filter((item) => {
                        return item.type == ($(this).index() + 1)
                    })
                    // 重新渲染商品页面
                    all(6, classdata)
                    price(classdata)
                })

            }
            classification()

            // 价格排序
            function price(data) {
                var flag = true
                // 深拷贝两个数据
                let dataup = JSON.parse(JSON.stringify(data))
                let datadown = JSON.parse(JSON.stringify(data))
                // 一个作为从大到小的数据
                dataup = dataup.sort((a, b) => {
                    return b.price - a.price
                })
                // 一个作为从小到大的数据
                datadown = datadown.sort((a, b) => {
                    return a.price - b.price
                })

                $('#product .branch .pricebtn').click(function () {
                    $('.price').css({
                        'color': '#3e3c3c'
                    })
                    if (flag) {
                        $('.pricebtn .font i:first-child').toggleClass('priceupdown')
                        flag = !flag
                        // 重新渲染商品页面 大到小
                        all(6, dataup) // 改变数据
                    } else {
                        $('.pricebtn .font i:first-child').toggleClass('priceupdown')
                        $('.pricebtn .font i:last-child').toggleClass('priceupdown')
                        flag = !flag
                        // 重新渲染商品页面// 小到大
                        all(6, datadown)
                    }
                })
            }

            // 综合排序
            function comprehensive() {
                $('#product .prehensive').click(function () {
                    all(6, data)
                    $('#product .left li').css({
                        'background-color': '#f2f2f2',
                        'color': 'black'
                    })
                })
            }
            comprehensive()

            // 若没有点击种类直接传入所有data 进行分类
            price(data)

            // 页面初始渲染一次
            all(6, data)

            // 包括渲染商品列表 以及分页器的渲染
            // few为每页几个   alldata为页面渲染的数据
            function all(few, alldata) {
                // 外层函数筛选数据
                function makedata(there, number) {
                    // 第几页 的数据包括
                    let res = alldata.filter((item, index) => {
                        return (index < (number * (there + 1)) && index >= (there * number))
                    })
                    // 渲染商品列表
                    function showlist(datalist) {
                        content.innerHTML = ''
                        datalist.forEach((item) => {
                            content.innerHTML += `
                            <li class="wow fadeInUpBig" data-wow-delay="0.08s" data-wow-offset="10" data-wow-duration="0.7s">
                            <div>
                                <a href="./product details.html" data-id=${item.goods_id} class="look"><img src="${item.img_src}" alt=""></a>
                                <div class="shopinfo"> 
                                    <i class="fa fa-shopping-cart buy" data-id=${item.goods_id} aria-hidden="true"></i>
                                    <i class="fa fa-search-plus like" aria-hidden="true"></i>
                                    <i class="fa fa-heart" aria-hidden="true"></i>
                                </div>
                                </div>
                                <p>${item.title}</p>
                                <span>￥${item.price}</span>
                            </li>
                            `
                        })
                    }
                    showlist(res)

                    // 记录点击的是哪一个，在详情显示
                    function findgoods() {
                        $('#product .content .right .look').click(function () {
                            let lookthing = $(this)[0].dataset.id
                            localStorage.setItem('lookshopping', lookthing)
                        })
                    }
                    findgoods()
                }

                // 判定数据的页数 3为页个数  6个
                var pagersnum = Math.floor((alldata.length - 1) / few)


                // ***分页器***
                // 按钮颜色变化 here为点击变色区
                function color(here) {
                    $('#pager li').css({
                        'background-color': 'white',
                        'border': '1px solid rgb(189, 189, 189)',
                        'color': 'black'
                    })
                    here.css({
                        'background-color': 'rgb(59, 91, 179)',
                        'border': '1px solid rgb(59, 91, 179)',
                        'color': 'white'
                    })
                }


                // 渲染分页器
                function showpager() {
                    // 若数据页数小于等于5 就不使用 。。。。
                    $('#pager ul')[0].innerHTML = ''
                    if (pagersnum <= 5) {
                        for (let i = 0; i <= pagersnum; i++) {
                            $('#pager ul')[0].innerHTML += `
                        <li>${i+1}</li>
                        `
                        }
                    } else {
                        // 若数据页数大于5 就使用 。。。。
                        // pagersnum = 6
                        for (let i = 0; i <= pagersnum; i++) {
                            // 开始 添加一个 span
                            if (i == 0) {
                                $('#pager ul')[0].innerHTML += `
                            <span style="display:none">......</span>
                        `
                            }
                            // 倒数第一个之前加一个span
                            if (i == pagersnum) {
                                $('#pager ul')[0].innerHTML += `
                            <span>.....</span>
                            `
                            }

                            if (i >= 3 && i < pagersnum) {
                                $('#pager ul')[0].innerHTML += `
                        <li style="display:none">${i+1}</li>
                        `
                            } else {
                                $('#pager ul')[0].innerHTML += `
                            <li>${i+1}</li>
                            `
                            }

                        }
                    }
                }
                showpager()


                // 分页器点击 number一页的个数
                function pagergoods(number) {
                    var counter = 0
                    // 点击对应的数字
                    $('#pager ul>li').click(function () {
                        // 颜色
                        color($(this))
                        var a = $(this).index()
                        if (pagersnum > 5) {
                            if ($(this).index() > pagersnum) {
                                a -= 2

                            } else {
                                a -= 1
                            }
                        }
                        makedata(a, number)
                        counter = a
                        details(counter)
                    })
                    // 点击上一个下一个
                    $('#pager>div').click(function () {
                        // 返回首页
                        if ($(this).index() == 0) {
                            counter = 0
                            makedata(0, number)
                            color($('#pager li').eq(counter))
                        }
                        // 上一页
                        if ($(this).index() == 1) {
                            counter--
                            if (counter <= 0) {
                                counter = 0
                            }
                            makedata(counter, number)
                            color($('#pager li').eq(counter))
                        }
                        // 下一页
                        if ($(this).index() == 3) {
                            counter++
                            if (counter >= pagersnum) {
                                counter = pagersnum
                            }
                            makedata(counter, number)
                            color($('#pager li').eq(counter))
                        }
                        // 尾页
                        if ($(this).index() == 4) {
                            counter = pagersnum
                            makedata(pagersnum, number)
                            color($('#pager li').eq(counter))
                        }
                        details(counter)
                    })


                    // 分页器的动态 按钮细节
                    function details(counter) {
                        // 若进行到第三页时 3之前的1消失 3之后的4出现 
                        // 第一个省略号
                        if (counter >= 2) {
                            $('#pager span').eq(0).css({
                                'display': 'block'
                            })
                        } else {
                            $('#pager span').eq(0).css({
                                'display': 'none'
                            })
                        }
                        // 第二个省略号

                        if (counter >= pagersnum - 2) {
                            $('#pager span').eq(1).css({
                                'display': 'none'
                            })
                        } else {
                            $('#pager span').eq(1).css({
                                'display': 'block'
                            })
                        }
                        // li
                        if (counter >= 1 && counter <= pagersnum - 2) {
                            // 所有的消失
                            $('#pager li').css({
                                'display': 'none'
                            })
                            // 最后一个不消失
                            $('#pager li:last').css({
                                'display': 'block'
                            })
                            // 前一个出现
                            $('#pager li').eq(counter - 1).css({
                                'display': 'block'
                            })
                            // 自身出现
                            $('#pager li').eq(counter).css({
                                'display': 'block'
                            })
                            // 后一个出现
                            $('#pager li').eq(counter + 1).css({
                                'display': 'block'
                            })
                        } else if (counter == 0) {
                            // 所有的消失
                            $('#pager li').css({
                                'display': 'none'
                            })
                            // 最后一个不消失
                            $('#pager li:last').css({
                                'display': 'block'
                            })
                            // 自身出现
                            $('#pager li').eq(counter).css({
                                'display': 'block'
                            })
                            // 后一个出现
                            $('#pager li').eq(counter + 1).css({
                                'display': 'block'
                            })
                            // 后一个出现
                            $('#pager li').eq(counter + 2).css({
                                'display': 'block'
                            })
                        } else if (counter == pagersnum) {
                            // 所有的消失
                            $('#pager li').css({
                                'display': 'none'
                            })
                            // 自身出现
                            $('#pager li').eq(counter).css({
                                'display': 'block'
                            })
                            // 前三个出现
                            $('#pager li').eq(counter - 1).css({
                                'display': 'block'
                            })
                            $('#pager li').eq(counter - 2).css({
                                'display': 'block'
                            })
                            $('#pager li').eq(counter - 3).css({
                                'display': 'block'
                            })
                        }
                    }
                }
                // 一页few个 渲染分页器以及商品
                pagergoods(few)

                // 初始渲染页面数据 第0页 即第一页
                makedata(0, few)
            }


            // **********

            // 加入购物车
            $('.buy').click(function () {
                // 找到此点击的数据 res
                let res = data.find((item) => {
                    return item.goods_id == this.dataset.id
                })
                // 获取local的数据
                let cartdata = JSON.parse(localStorage.getItem('shopping')) || []
                // 找local里是否有这个数据
                let result = cartdata.some((item) => {
                    return item.goods_id == this.dataset.id
                })
                // 存在 此数据 找到在里面的位置 进行num加1
                if (result) {
                    let index = cartdata.findIndex((item) => {
                        return item.goods_id == this.dataset.id
                    })
                    cartdata[index].cart_number++

                } else {
                    // 不存在 把这个num加1  把这条数据加入local中
                    res.cart_number++
                    cartdata.push(res)
                }
                // 存入local中
                localStorage.setItem('shopping', JSON.stringify(cartdata))
                count()
            })


            // 加入喜欢
            $('.like').click(function () {
                // 获取数据
                let likedata = JSON.parse(localStorage.getItem('shopping')) || []

            })


            // 渲染购物车的数量
            function count() {
                // 获取添加的数量
                let allnum = 0
                let cartdata = JSON.parse(localStorage.getItem('shopping')) || []
                cartdata.forEach((item) => {
                    allnum += item.cart_number
                })
                $('.num').text(allnum)
            }
            count()
        }


    })

}
show()

// 楼层 回到顶部 

function backtop() {
    var timer = null
    // 划出
    $('#floor')[0].addEventListener('mousemove', function () {
        clearInterval(timer)
        $('#floor .floortext').css({
            'transform': 'translateX(-33px)'
        })
        $('#floor div').css({
            'transform': 'translateX(33px)'
        })
        timer = setTimeout(function () {
            $('#floor .floortext').css({
                'transform': `translateX(${$('.floortext').innerWidth()}px)`
            })
            $('#floor div').css({
                'transform': 'translateX(0)'
            })
        }, 4000)
    })
    // 滚动到对应的层级
    function roll() {
        $('#floor li').click(function () {
            if ($(this).index() == 0) {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                })
            }
        })

    }
    roll()

}

backtop()