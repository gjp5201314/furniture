// 汉堡按钮
function hambergerbtn() {
    const hamberger = document.querySelector("#nav ul");
    const bars = document.querySelector("#nav .btn");
    bars.addEventListener("click", () => {
        bars.classList.toggle("active");
        hamberger.classList.toggle("open");
    })
}
hambergerbtn()

// 实时渲染购物车的数量
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

// 顶部导航栏 吸顶动态效果
function dynamicNav() {
    var b = 0
    var t = 0
    window.onscroll = function () {
        var t = document.body.scrollTop || document.documentElement.scrollTop
        // 朝下
        if (t > b) {
            $('.nav').addClass('shownav')
        } else if (t == 0) {
            $('.nav').removeClass('shownav')
        } else {
            // 朝上
            $('.nav').removeClass('shownav')
        }
        setTimeout(function () {
            b = document.body.scrollTop || document.documentElement.scrollTop
        }, 0)
    }
}

dynamicNav()

// 二级菜单 关于我们

function secondnav() {
    window.addEventListener('resize', function () {
        if (window.innerWidth >= 992) {
            $(".aboutUs").hover(
                function () {
                    $('.fa-angle-up').addClass("up");
                    $('.fa-angle-up').removeClass("down");
                },
                function () {
                    $('.fa-angle-up').addClass("down");
                    $('.fa-angle-up').removeClass("up");
                }
            );
        }
    })

}

secondnav()

// 点击个人头像
function clickmine() {
    whetherToLogIn()
    $('.head').click(function () {
        console.log(11);
        $('.people ul').slideToggle()
        $('.people ul').finish()
    })
    $('.out').click(function () {
        $('.people')[0].innerHTML = '<a href="./login.html"><div class="nohead"><i class="fa fa-user-o" aria-hidden="true"></i></div></a> '
        localStorage.setItem('keep', '0')
    })
}

clickmine()


function whetherToLogIn() {
    // 获取是否有keep
    let keep = JSON.parse(localStorage.getItem('keep')) || []
    if (keep.length > 0) {
        $('.people')[0].innerHTML = `
        <div class="head"></div>
                    <ul>
                        <li><a>我的信息</a></li>
                        <li class="out"><a>退出登录</a></li>
                    </ul>
        `
    } else {
        $('.people')[0].innerHTML = '<a href="./login.html"><div class="nohead"><span class="iconfont icon-geren"></span></div></a> '
    }

}

// 搜索框
function search() {
    /**禁用滚动条**/
    function unableScroll(flag) {
        let top = $(document).scrollTop();
        if (flag) {
            $(document).on('scroll.unable', function (e) {
                $(document).scrollTop(top);
            })
        } else {
            $(document).off()
        }
    }
    // 搜索
    $('.icon-sousuo').click(function () {
        // 导航栏移出
        $('#nav>ul').css({
            'transform': 'translateX(700px)',
            'opacity': 0
        })
        // 汉堡按钮移出
        $('#nav .btn').css({
            'transform': 'translateX(700px)',
            'opacity': 0
        })
        // 遮罩层
        $('.mask').css({
            'opacity': '1',
            'display': 'block'
        })
        // 输入移入
        $('.input').css({
            'transform': 'translateX(-40%)',
            'opacity': 1
        })
        $('.input input').attr({
            autofocus: 'autofocus'
        })
        unableScroll(true)
    })
    // 叉叉
    $('.icon-cuowu').click(function () {
        $('#nav>ul').css({
            'transform': 'translateX(0)',
            'opacity': 1
        })
        // 汉堡按钮移出
        $('#nav .btn').css({
            'transform': 'translateX(0px)',
            'opacity': 0
        })
        $('.input').css({
            'transform': 'translateX(100%)',
            'opacity': 0
        })
        $('.mask').css({
            'opacity': '0',
            'display': 'none'
        })
        unableScroll(false)
    })
    // 遮罩层
    $('.mask').click(function () {
        $('#nav>ul').css({
            'transform': 'translateX(0)',
            'opacity': 1
        })
        $('.input').css({
            'transform': 'translateX(100%)',
            'opacity': 0
        })
        $('.mask').css({
            'opacity': '0',
            'display': 'none'
        })
        $('body').css({
            'overflow': 'auto'
        })
    })
}
search()

function searchShopping() {
    $.ajax({
        url: 'https://mock.apifox.cn/m1/1437381-0-default/shopping/list/',
        dataType: 'json',
        success(data) {
            $('#nav .input input')[0].addEventListener('input', function () {
                let res = []
                data.forEach(item => {
                    let isYes = item.title.indexOf(this.value)
                   if (isYes !== -1) {
                        res.push(item)
                        $('#nav .input ul')[0].innerHTML = ''
                        res.forEach(item => {
                            $('#nav .input ul')[0].innerHTML += `
                    <li><a href="./product details.html" data-id=${item.goods_id} class="look"><img src="${item.img_src}" alt="">${item.title}</a></li>
                    `
                        })
                    } 
                })
                findgoods()
            })
        }
    })
    function findgoods() {
        $('#nav .input .searchres li a').click(function () {
            let lookthing = $(this)[0].dataset.id
            localStorage.setItem('lookshopping', lookthing)
        })
    }
    
}

searchShopping()