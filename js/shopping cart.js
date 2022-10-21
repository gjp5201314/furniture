//渲染loca的数据
function showcart() {
    let data = JSON.parse(localStorage.getItem('shopping')) || []
    var allgoods = document.querySelector('.allgoods')
    var checkall = document.querySelector('.checkall')
    allgoods.innerHTML = ''
    // data 有数据
    if (data.length > 0) {
        var i = 0
        data.forEach((item) => {
            allgoods.innerHTML += `
                <div class="goods">
                        <div class="selects">
                            <input type="checkbox" class="select" data-id="${item.goods_id}" ${item.is_select?'checked':''} data-ik="${i++}">
                        </div>
                        <div class="message">
                            <a href="product details.html">
                                <img src="${item.img_src}" alt="">
                                <div class="showinfo">
                                    <span>${item.title}</span>
                                    <div class="colorsize">
                                        <div class="showcolor" style="background-color:${item.color}"></div>
                                        <div class="showsize">${item.size}</div>
                                    </div>
                                </div>
                                
                            </a>
                        </div>
                        <div class="pri">${item.price}</div>
                        <div class="add">
                            <span class="sub" data-id="${item.goods_id}">-</span>
                            <input type="text" class="txt" value="${item.cart_number}">
                            <span class="increase" data-id="${item.goods_id}">+</span>
                        </div>
                        <div class="price">${item.price * item.cart_number}元</div>
                        <div class="del" data-id="${item.goods_id}">删除</div>
                </div>
        `
        })
        // 解决
        if (data.length) {
            let res = data.every((item) => {
                return item.is_select == true
            })
            checkall.checked = res
        } else {
            checkall.checked = false
        }
    } else {
        // data 没有数据 渲染空的页面提示
        allgoods.innerHTML +=
            `
                    <div class="emptycart">
                        <img src="images/shopping cart empty.png" alt="">
                        <div>
                            <h2>您的购物车空空如也~</h2>
                            <a href="./product display.html"><button>马上去购物</button></a>
                        </div>
                    </div>
        `
    }
}

showcart()


// 添加和减少 删除点击事件
function cart() {
    var checkall = document.querySelector('.checkall')
    let data = JSON.parse(localStorage.getItem('shopping'))
    // 点击事件 事件委派
    $('.cart').click(function (e) {
        var target = e.target || e.scrElement
        // 减少
        if (target.className == 'sub') {
            // 把每次点击的商品的自定义id找到
            let targetId = target.dataset.id
            // 通过id去遍历 localStroage里的东西 
            // 找出 点击的 数据
            let list = data.find((item) => {
                return item.goods_id == targetId
            })
            if (list.cart_number <= 1) {
                return
            }
            list.cart_number--
        }
        // 增加
        if (target.className == 'increase') {
            // 把每次点击的商品的自定义id找到
            let targetId = target.dataset.id
            // 通过id去遍历 localStroage里的东西 
            // 找出 点击的 数据
            let list = data.find((item) => {
                return item.goods_id == targetId
            })
            if (list.cart_number >= list.goods_number) {
                return
            }
            list.cart_number++
        }

        //全选

        if (target.className == 'checkall') {
            data.forEach((item) => {
                item.is_select = checkall.checked
            })
        }

        // 单选
        if (target.className == 'select') {
            // 把每次点击的商品的自定义id找到
            let targetId = target.dataset.id
            // 把每次点击的商品的自定义id找到
            let targetik = target.dataset.ik
            // 通过id去遍历 localStroage里的东西 

            // 找出 点击的 数据
            let list = data.find((item,inedx) => {
                return (inedx == targetik && item.goods_id == targetId)
            })
            list.is_select = target.checked

            let res = data.every((item) => {
                return item.is_select == true
            })
            checkall.checked = res
        }

        // 删除
        if (target.className == 'del') {
            // 把每次点击的商品的自定义id找到
            let targetId = target.dataset.id
            // 通过id去遍历 localStroage里的东西 把不是这个id的重新赋予给datalist
            data = data.filter((item) => {
                return item.goods_id != targetId
            })
        }

        // 删除选中的个数
        if (target.className == 'dlAll') {
            // 找到选中的数据
            data = data.filter((item) => {
                return item.is_select != true
            })
            // 最后一个删除把全选改掉
            checkall.checked = false
        }

        // 
        // 把数据存储一遍
        localStorage.setItem('shopping', JSON.stringify(data))
        // 渲染再执行一遍
        showcart()
        money()
        count()
    })
}

cart()


// 计算金额和数量
function money() {
    // 结算件数和总金额
    // 计算件数
    // 找到选中的数据
    let data = JSON.parse(localStorage.getItem('shopping')) || []
    let num = 0
    let moey = 0
    let res = data.filter((item) => {
        return item.is_select == true
    })
    res.forEach((item) => {
        num = num + item.cart_number
        moey = moey + (item.cart_number * parseInt(item.price))
    })
    $('.totalNum').text(num)
    $('.money').text(moey)
}

money()