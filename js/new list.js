function transformation() {
    $('#newinfo .left .btn').eq(0).css({
        'backgroundColor': '#12bcd5',
        'color': 'white'
    })
    $('#newinfo .left .btn').click(function () {
        // 点击变色
        // 先所有的变回原样
        $('#newinfo .left .btn').css({
            'backgroundColor': '#f2f2f2',
            'color': 'black'
        })
        // 点击的改颜色
        $(this).css({
            'backgroundColor': '#12bcd5',
            'color': 'white'
        })
    })
}

transformation()

// 新闻分类
function classification() {
    $.ajax({
        url: 'https://mock.apifox.cn/m2/1477307-0-default/35245718',
        dataType: 'json',
        success(data) {
            var content = document.querySelector('#newinfo .content .right')
            // 渲染商品列表
            function showlist(data) {
                content.innerHTML = ''
                data.forEach((item) => {
                    content.innerHTML += `
                    <li>
                        <a>${item.title}</a>
                        <span>${item.time}</span>
                        <p>${item.content}</p>
                    </li>
            `
                })
            }
            let firstres = data.filter((item) => {
                return item.type == 1
            })
            showlist(firstres)

            // // 按钮分类

            function btnclick() {
                // 行业咨询
                $('#newinfo .left .btn').click(function () {
                    let res = data.filter((item) => {
                        return item.type == ($(this).index() + 1)
                    })
                    showlist(res)
                })
            }
            btnclick()
        }
    })

}

classification()