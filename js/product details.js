$.ajax({
    url: 'https://mock.apifox.cn/m1/1437381-0-default/shopping/list/',
    dataType: 'json',
    success(data) {
        // 获取local中点击的第几个 默认是第二个
        let look = parseInt(localStorage.getItem('lookshopping')) || 2
        let res
        // 当点击的是第一个商品
        if (look == 1) {
            res = data.filter((item) => {
                return (item.goods_id < look + 3)
            })
            res.unshift(data[39])
        } else if (look == data.length - 1) {
            // 当点击的是倒数第二的商品
            res = data.filter((item) => {
                return (item.goods_id > look - 2)
            })
            res.push(data[0])
        } else if (look == data.length) {
            // 当点击的是第一个商品
            res = data.filter((item) => {
                return (item.goods_id > look - 2)
            })
            res.push(data[0])
            res.push(data[1])
        } else {
            // 当点击的是除以上情况的商品
            res = data.filter((item) => {
                return (item.goods_id >= (look - 1) && item.goods_id <= (look + 2))
            })
        }
        // 渲染商品列表
        function showlist(datalist) {
            datalist.forEach((item) => {
                // 左边商品 列 渲染
                $('#details .show ul')[0].innerHTML += `
                    <li><img src="${item.img_src}"></li>
                    `
                // 中间商品 展示 渲染
                $('#details .middle ul')[0].innerHTML += `
                    <li><img src="${item.img_src}"></li>
                    `
            })
            changename(0,datalist)
        }


        // 点击加入购物车
        function buy(shopdata) {
            $('.addto').click(function () {
                // 在4个数据中获取当前的位置是那一个
                let current = (num + 2) % 4
                if (current == 0) {
                    current = 4
                }
                // 找到此点击的数据 res
                let res = shopdata.find((item, index) => {
                    return index == current - 1
                })

                // 获取local的数据
                let cartdata = JSON.parse(localStorage.getItem('shopping')) || []

                // 判断在local中是否有颜色、尺寸一致的数据 
                // 没有就添加
                // 有就加数量

                // 找local里是否有这个数据
                let result = cartdata.some((item) => {
                    return (item.goods_id == res.goods_id && item.color == checkcolor() && item.size == checksize())
                })
                // 存在 此数据 找到在里面的位置 进行num加1
                if (result) {
                    let index = cartdata.findIndex((item) => {
                        return (item.goods_id == res.goods_id && item.color == checkcolor() && item.size == checksize())
                    })
                    cartdata[index].cart_number += parseInt($('#details .right .addcart input')[0].value)
                } else {
                    // 不存在 把这个num加1  把这条数据加入local中
                    // 把数量重置0
                    res.cart_number = 0
                    res.color = checkcolor()
                    res.size = checksize()
                    res.cart_number += parseInt($('#details .right .addcart input')[0].value)
                    cartdata.push(res)
                }
                // 存入local中
                localStorage.setItem('shopping', JSON.stringify(cartdata))
                count()
            })
        }
        // 渲染页面
        showlist(res)
        // 点击购买
        buy(res)
        // 动态查看
        bofang(res)
    }
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

// 运动函数
// ele元素  target到达的终点数字(不加单位)  attr属性键
function run(ele, target, attr) {
    clearInterval(ele.timer)
    ele.timer = setInterval(() => {
        // 获取初始的位置
        var begin = getStyle(ele, attr)
        var begin = parseFloat(getStyle(ele, attr))
        // 设置每次移动的距离
        var step = (target - begin) / 10
        step = step > 0 ? Math.ceil(step) : Math.floor(step)
        ele.style[attr] = begin + step + 'px'
        if (step == 0) {
            clearInterval(ele.timer)
        }
    }, 10)
}
//例如 run(box2, 1000, 'left')


// 获取元素，样式的值
// ele元素  attr属性键
function getStyle(ele, attr) {
    if (window.getComputedStyle) {
        return getComputedStyle(ele, null)[attr]
    } else {
        return ele.currentStyle[attr]
    }
}
//例如 getStyle(box2 , 'left')
// 设置标记
var num = 0
// 购物切换
function bofang(res) {
    // 获取元素
    var ul = document.querySelector('#details .left ul')
    var bigul = document.querySelector('#details .middle ul')
    var li = document.querySelectorAll('#details .left li')
    var btn = document.querySelectorAll('#details .left i')
    var btnbox = document.querySelectorAll('#details .left .show div')
    // 克隆元素
    ul.appendChild(ul.children[0].cloneNode(true))
    ul.appendChild(ul.children[1].cloneNode(true))
    ul.appendChild(ul.children[2].cloneNode(true))
    ul.appendChild(ul.children[3].cloneNode(true))
    bigul.appendChild(bigul.children[0].cloneNode(true))
    bigul.appendChild(bigul.children[1].cloneNode(true))
    bigul.appendChild(bigul.children[2].cloneNode(true))
    bigul.appendChild(bigul.children[3].cloneNode(true))
    // 当屏幕小于768 横着轮播
    if (window.innerWidth <= 768) {
        // 获取盒子的长宽
        // 点击事件 向右
        btnbox[1].addEventListener('click', a = () => {
            // 左边盒子内li的高度+下边框
            var smallwidth = parseFloat(getStyle(li[0], 'width')) + parseFloat(getStyle(li[0], 'marginRight'))
            // 中间盒子内li的宽度
            var bigwidth = parseFloat(getStyle(bigul.children[0], 'width'))
            if (num == 4) {
                ul.style.left = 0
                // 中间大盒子一起动 向左
                bigul.style.left = -bigwidth + 'px'
                num = 0
            }
            num++
            run(ul, -smallwidth * (num), 'left')
            run(bigul, -bigwidth * (num + 1), 'left')
        })
        // 点击事件 向左
        btnbox[0].addEventListener('click', b = () => {
            // 左边盒子内li的高度+下边框
            var smallwidth = parseFloat(getStyle(li[0], 'width')) + parseFloat(getStyle(li[0], 'marginRight'))
            // 中间盒子内li的宽度
            var bigwidth = parseFloat(getStyle(bigul.children[0], 'width'))
            if (num == 0) {
                ul.style.left = -smallwidth * 4 + 'px'
                // 中间大盒子一起动 向右
                bigul.style.left = -2500 + 'px'
                num = 4
            }
            num--
            run(ul, -smallwidth * (num), 'left')
            run(bigul, -bigwidth * (num + 1), 'left')
        })
        btn[0].addEventListener('click', a)
        btn[1].addEventListener('click', b)
    } else {
        // 当屏幕大于于786 横着轮播
        // 获取盒子的长宽
        // 点击事件 向下
        btnbox[1].addEventListener('click', a = () => {
            // 左边盒子内li的高度+下边框
            var smallheight = parseFloat(getStyle(li[0], 'height')) + parseFloat(getStyle(li[0], 'marginBottom'))
            // 中间盒子内li的宽度
            var bigwidth = parseFloat(getStyle(bigul.children[0], 'width'))
            if (num == 4) {
                ul.style.top = 0
                // 中间大盒子一起动 向左
                bigul.style.left = -bigwidth + 'px'
                num = 0
            }
            num++
            run(ul, -smallheight * (num), 'top')
            run(bigul, -bigwidth * (num + 1), 'left')
            changename(num, res)
        })
        // 点击事件 向上
        btnbox[0].addEventListener('click', b = () => {
            // 左边盒子内li的高度+下边框
            var smallheight = parseFloat(getStyle(li[0], 'height')) + parseFloat(getStyle(li[0], 'marginBottom'))
            // 中间盒子内li的宽度
            var bigwidth = parseFloat(getStyle(bigul.children[0], 'width'))
            if (num == 0) {
                ul.style.top = -smallheight * 4 + 'px'
                // 中间大盒子一起动 向右
                bigul.style.left = -2500 + 'px'
                num = 4
            }
            num--
            run(ul, -smallheight * (num), 'top')
            run(bigul, -bigwidth * (num + 1), 'left')
            changename(num, res)
        })
        btn[0].addEventListener('click', a)
        btn[1].addEventListener('click', b)
    }
    // 箭头 点击

}
// 获取left舞台的宽度 show宽度的一半作为li的宽度
function little() {
    if (window.innerWidth <= 580) {
        var show = document.querySelector('#details .left .show')
        var li = document.querySelectorAll('#details .left .show ul li')
        var w = parseFloat(getStyle(show, 'width')) / 2
        li.forEach(function (item) {
            item.style.width = w + 'px'
        })

    } else {
        var show = document.querySelector('#details .left .show')
        var li = document.querySelectorAll('#details .left .show ul li')
        var w = parseFloat(getStyle(show, 'width')) / 2
        li.forEach(function (item) {
            item.style.width = ''
        })
    }
}

window.addEventListener('resize', function () {
    setInterval(function () {
        little()
    }, 500)
})


// 放入物品可视化动 放大镜
function dynamic() {
    // 获取元素
    var li = document.querySelectorAll('#details .middle ul li')
    var middle = document.querySelector('#details .middle')
    li.forEach(function (item) {
        middle.addEventListener('mouseover', function (e) {
            middle.addEventListener('mousemove', function () {
                item.firstElementChild.style.transform = 'scale(1.3)'
                var e = e || window.event
                // 获取鼠标移动的距离
                var x = e.pageX - (middle.offsetLeft) - 250
                var y = e.pageY - (middle.offsetTop) - 250
                // 赋值位置坐标
                item.firstElementChild.style.left = -x / 2.5 + 'px'
                item.firstElementChild.style.top = -y / 2.5 + 'px'
            })

            middle.addEventListener('mouseleave', function () {
                item.firstElementChild.style.left = 0
                item.firstElementChild.style.top = 0
                item.firstElementChild.style.transform = 'scale(1)'
            })
        })
    })
}

dynamic()


// 增加商品数量
function raisegoods() {
    var input = document.querySelector('#details .right input')
    var reduce = document.querySelector('#details .right .reduce')
    var plus = document.querySelector('#details .right .plus')
    reduce.addEventListener('click', function () {
        input.value--
        if (input.value <= 1) {
            input.value = 1
        }
    })
    plus.addEventListener('click', function () {
        input.value++
        if (input.value >= 99) {
            input.value = 99
        }
    })
}

raisegoods()


// 点击切换信息 tab切换
function Tab() {
    var box = document.querySelectorAll('#information .content>div')
    var btn = document.querySelectorAll('#information .top>button')
    btn.forEach(function (item, index) {
        item.addEventListener('click', () => {
            for (var i = 0; i < btn.length; i++) {
                btn[i].className = ''
            }
            item.className = 'active'

            // 对于下面的内容切换
            for (var i = 0; i < box.length; i++) {
                box[i].style.opacity = '0'
            }
            box[index].style.opacity = '1'
        })
    })
}
Tab()

// 点击勾选颜色
let color = 'rgb(134, 122, 116)'

function checkcolor() {
    $('#details .color ul li').click(function () {
        // 把其余清空
        $('#details .color ul li').empty()
        $('#details .color ul li').css({
            'border': '2px solid #e2e2e2'
        })
        //点击添加span 勾选上
        $(this).append('<span class="iconfont icon-zhengque"></span>')
        $(this).css({
            'border': '2px solid rgba(255, 103, 0, 1)'
        })
        // 获取颜色
        color = $(this).css('background-color')
    })
    return color
}
checkcolor()
// 勾选尺寸
let size = 'XS'

function checksize() {
    $('#details .size ul li').click(function () {
        $('#details .size ul li').css({
            'background-color': 'white',
            'color': 'black'
        })
        $(this).css({
            'background-color': '#7b7b7b',
            'color': 'white'
        })
        // 获取尺寸
        size = $(this).text()
    })
    return size
}
checksize()


// 更换标题商品名称

function changename(namenum, data) {
    let headtitle = data.filter((item, index) => {
        return index == (namenum+1)%4
    })
    $('#details .content .right h1').text(headtitle[0].title)
    $('#details .content .right .price').text('￥'+headtitle[0].price)
}