mask('注册成功')
// 注册账户
function register() {
    // 获取元素
    var form = document.querySelector('.form')
    var username = document.querySelector('.username')
    var phone = document.querySelector('.phone')
    var password = document.querySelector('.password')
    var checkpassword = document.querySelector('.checkpassword')
    var btn = document.querySelector('#register button')
    // 获取name是否已经存在
    let nameres = false
    // 获取phone是否已经存在
    let phoneres = false
    // 获取两个密码是否都填写了
    let checkwordres = false
    // 获取前后密码是否一致
    let passwordres = false
    // 监听输入
    form.addEventListener('input', (e) => {
        var e = e || window.event
        var target = e.target || e.scrElement
        let data = JSON.parse(localStorage.getItem('name')) || []
        if (target.nodeName == 'INPUT') {
            let rightphone = /1\d{10}/
            // 获取name是否已经存在 存在返回ture
            nameres = data.some((item) => {
                return item.username == username.value
            })
            // 获取phone是否已经存在 存在返回ture
            phoneres = data.some((item) => {
                return item.phone == phone.value
            })
            // 获取两个密码是否都填写了 都填返回ture
            checkwordres = (password.value && checkpassword.value)
            // 获取前后密码是否一致 密码一致返回ture
            passwordres = (password.value == checkpassword.value)
            // 若已经存在 提示信息
            if (nameres) {
                username.nextElementSibling.innerText = '用户名已存在'
                username.nextElementSibling.style.visibility = 'visible'
            } else {
                username.nextElementSibling.style.visibility = 'hidden'
            }
            if (phone.value == '') {
                phone.nextElementSibling.style.visibility = 'hidden'
            } else if (!(rightphone.test(phone.value))) {
                phone.nextElementSibling.style.visibility = 'visible'
                phone.nextElementSibling.innerText = '请输入11位的电话号码'
            } else if (phoneres) {
                phone.nextElementSibling.style.visibility = 'visible'
                phone.nextElementSibling.innerText = '电话号码已注册'
            } else {
                phone.nextElementSibling.style.visibility = 'hidden'
            }
            // 两个密码都填上
            if (checkwordres) {
                if (!passwordres) {
                    checkpassword.nextElementSibling.style.visibility = 'visible'
                } else {
                    checkpassword.nextElementSibling.style.visibility = 'hidden'
                }
            } else {
                checkpassword.nextElementSibling.style.visibility = 'hidden'
            }

            if (!password.value) {
                password.nextElementSibling.style.visibility = 'hidden'
            }
        }
    })

    // 注册
    btn.addEventListener('click', () => {
        if (!username.value || !phone.value || !password.value || !checkpassword.value) {
            if (!username.value) {
                username.nextElementSibling.style.visibility = 'visible'
                username.nextElementSibling.innerText = '请输入用户名'
            }
            if (!phone.value) {
                phone.nextElementSibling.style.visibility = 'visible'
                phone.nextElementSibling.innerText = '请输入电话号码'
            }
            if (!password.value) {
                password.nextElementSibling.style.visibility = 'visible'
                password.nextElementSibling.innerText = '请输入密码'
            }
            if (!checkpassword.value) {
                checkpassword.nextElementSibling.style.visibility = 'visible'
                checkpassword.nextElementSibling.innerText = '请输入确认密码'
            }
        } else {
            // 若名字存在、电话号码存在、密码不一致 就return出去
            // 否则才能够存入localStroage
            // 名字存在  前后密码不一致 电话号码存在 都return
            if (nameres || !passwordres || phoneres) {
                return
            } else {
                let data = JSON.parse(localStorage.getItem('name')) || []
                let obj = {
                    username: username.value,
                    phone: phone.value,
                    password: password.value
                }
                data.push(obj)
                localStorage.setItem('name', JSON.stringify(data))
                succss()
            }
        }
    })
}

register()

function mask(message) {
    // 创建遮罩和提示信息
    $('body')[0].innerHTML +=
        `  <div id="Tips">
      <div class="succss">
          <span><i class="fa fa-check" aria-hidden="true"></i></span>
          ${message}
      </div>
  </div>
  `
}

function succss() {
    $('#Tips').css({
        'top': '10%'
    })
    setTimeout(function () {
        $('#Tips').css({
            'opacity': '0'
        })
        location.href = './login.html'
    }, 3000)
}