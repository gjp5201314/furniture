// 随机数 获取 a——b之间的数字 包括a和b
function getNum(a, b) {
    var max = Math.max(a, b)
    var min = Math.min(a, b)
    return Math.round((Math.random() * max) + min)
}
// 例如 getNum(1,100)


// 获得一个十六进制的随机颜色的字符串(例如：#20CD4F)
function Hexcolor() {
    return '#' + Math.round(Math.random() * 16777215)
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
    }, 30)
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


// 设置cookie
// Key所要设置的属性 value所要设置的值 time过期的时间(多少s之后)
function setCookie(Key, value, time) {
    let expires = ''
    if (time) {
        let d = new Date()
        d.setTime(d.getTime() + time * 1000)
        expires = d.toUTCString()
    }
    document.cookie = `${Key}=${value};expires=${expires};path=/`
}
//例如 setCookie('name', '100' , '60')


// 获取cookie
function getCookie(Key) {
    let arr = document.cookie.split('; ')
    let obj = {}
    arr.forEach(item => {
        let res = item.split('=')
        obj[res[0]] = res[1]
    })
    return obj[Key]
}


// 删除某个cookie
function delCookie(Key) {
    setCookie(Key, '-1', -1)
}


// 删除所有的cookie
function clearAllCookie() {
    //  获取所有的cookie名称  
    let arr = document.cookie.split('; ')
    let newArr = []
    arr.forEach((item) => {
        let res = item.split('=')
        newArr.push(res[0])
    })
    // 循环所有的cookie名称 依次删除
    newArr.forEach((result) => {
        delCookie(result)
    })
}



/*
       ajax_get请求方式封装 
       @param {String}  url 表示请求地址
       @param {Object}  query 表示请求参数
       @param {Function}  success 表示成功时候的回调函数
       @param {Function}  error 表示失败时候的回调函数
       */
function pAjaxGet(options) {
    return new Promise((resolve, reject) => {
        // 判断url必传
        if (!options.url) {
            alert('请填写请求地址')
            return false
        }
        //  创建对象
        var xhr = new XMLHttpRequest()
        if (options.query) {
            var str = '?'
            for (var key in options.query) {
                str += `${key}=${options.query[key]}`
                str += '&'
            }

            str = str.slice(0, -1)
            xhr.open('get', options.url + str)
        } else {
            xhr.open('get', options.url)
        }
        //  三元表达式 判断是否有传递的参数 
        // xhr.open('get', query ? url + str : url)

        xhr.send()
        xhr.onreadystatechange = () => {

            if (xhr.readyState == 4) {

                if (xhr.status == 200) {
                    // options.success && options.success(xhr.response)
                    resolve(xhr.response)

                } else {
                    //  options.error && options.error(xhr.response)
                    reject(xhr.response)
                }

            }

        }
    })

}




/*
ajax_post请求方式封装 
@param {String}  url 表示请求地址
@param {Object}  query 表示请求参数
@param {Function}  success 表示成功时候的回调函数
@param {Function}  error 表示失败时候的回调函数
*/
function ajaxPost(options) {
    // 判断url必传
    if (!options.url) {
        alert('请填写请求地址')
        return false
    }
    //  创建对象
    var xhr = new XMLHttpRequest()
    xhr.open('post', options.url)
    //如果需要像 HTML 表单那样 POST 数据,以&形式传输数据
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    if (options.query) {
        var str = ''
        for (var key in options.query) {
            str += `${key}=${options.query[key]}`
            str += '&'
        }
        str = str.slice(0, -1)
        xhr.send(str)
    } else {
        xhr.send()
    }
    //  三元表达式 判断是否有传递的参数 
    // xhr.send( options.query ?  str : '')

    xhr.onreadystatechange = () => {

        if (xhr.readyState == 4) {

            if (xhr.status == 200) {
                options.success && options.success(xhr.response)

            } else {
                options.error && options.error()
            }

        }

    }

}
// 例如
// var obj = {
//     url:'https://mock.apifox.cn/m1/1088284-0-default/m2/1088284-0-default/32187267',
//     query:{
//         username:username.value,
//         password:password.value
//     },
//     success:()=>{
//         console.log('我成功了')
//     }
//   }
// ajaxPost(obj)


// Promise 封装 Ajaxpost

// Promise 封装 Ajaxget