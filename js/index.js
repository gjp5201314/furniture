// 初始化wow
new WOW().init()

// 楼层 回到顶部 
function backtop() {
    var timer = null
    // 监听 当高度大于1000px 出现
    window.addEventListener('scroll', function () {
        if (window.scrollY >= 1000) {
            $('#floor').css({
                'opacity': '1'
            })
        } else {
            $('#floor').css({
                'opacity': '0'
            })
        }
    })
    // 划出
    $('#floor')[0].addEventListener('mousemove', function () {
        clearInterval(timer)
        $('#floor .floortext').css({
            'transform': 'translateX(-43px)'
        })
        $('#floor div').css({
            'transform': 'translateX(43px)'
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
                    top: $('#exhibition').offset().top - $('.nav').innerHeight(),
                    behavior: "smooth"
                })
            }
            if ($(this).index() == 1) {
                window.scrollTo({
                    top: $('#aboutus').offset().top - $('.nav').innerHeight(),
                    behavior: "smooth"
                })
            }
            if ($(this).index() == 2) {
                window.scrollTo({
                    top: $('#news').offset().top - $('.nav').innerHeight(),
                    behavior: "smooth"
                })
            }
            if ($(this).index() == 3) {
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