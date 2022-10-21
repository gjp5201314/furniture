
function transformation() {
    $('#about .left .btn').eq(0).css({
        'backgroundColor': '#f08745',
        'color': 'white'
    })
    $('#about .left .btn').click(function () {
        // 点击变色
        $('#about .left .btn').css({
            'backgroundColor': '#f2f2f2',
            'color': 'black'
        })
        $(this).css({
            'backgroundColor': '#f08745',
            'color': 'white'
        })
        // 点击切换右边内容
        if ($(this).index() == 0) {
            $('.aboutOur').css({
                'transform': 'translateX(0)',
            })
            $('.leavingMessage').css({
                'transform': 'translateX(100%)',
            })
            $('.contact').css({
                'transform': 'translateX(200%)',
            })
        } else if ($(this).index() == 1) {
            $('.aboutOur').css({
                'transform': 'translateX(-100%)',
            })
            $('.leavingMessage').css({
                'transform': 'translateX(0)',
            })
            $('.contact').css({
                'transform': 'translateX(100%)',
            })
        } else {
            $('.aboutOur').css({
                'transform': 'translateX(-200%)',
            })
            $('.leavingMessage').css({
                'transform': 'translateX(-100%)',
            })
            $('.contact').css({
                'transform': 'translateX(0%)',
            })
        }
    })


}

transformation()
// 百度API引入
function map() {
    var map = new BMap.Map("container");
    var point = new BMap.Point(103.828889, 30.676073);
    map.centerAndZoom(point, 15);
    map.enableScrollWheelZoom(true);
    map.addControl(new BMap.NavigationControl());
    map.addControl(new BMap.ScaleControl());
    map.addControl(new BMap.OverviewMapControl());
    map.addControl(new BMap.MapTypeControl());
    map.setCurrentCity("成都");
}
map()