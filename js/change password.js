mask('修改成功')
// 修改密码
function changeWord() {
    // 获取元素
    // 用户名
    var username = document.querySelector('.username')
    // 电话号码
    var phone = document.querySelector('.phone')
    // 旧密码
    var usedpassword = document.querySelector('.usedpassword')
    // 新密码
    var newpassword = document.querySelector('.newpassword')
    // 确认密码
    var checkpassword = document.querySelector('.checkpassword')
    // 修改
    var btn = document.querySelector('#change button')


    btn.addEventListener('click', () => {
        // 获取loca 的数据
        let data = JSON.parse(localStorage.getItem('name'))
        // 获取name是否已经存在 存在返回ture
        let nameres = data.some((item) => {
            return item.username == username.value
        })
        // 获取phone和name都一致 是否已经存在 存在返回ture
        let phoneandnameres = data.some((item) => {
            return (item.phone == phone.value && item.username == username.value)
        })
        // 获取旧密码是否存在 存在返回ture
        let oldwordres = data.some((item) => {
            return (item.username == username.value && item.password == usedpassword.value)
        })
        // 获取新密码password是否和旧密码一样 存在返回ture
        let passwordres = data.some((item) => {
            return (item.password == newpassword.value && item.username == username.value)
        })
        // 获取新密码是否和确认密码一样 存在返回ture
        let checkwordres = data.some((item) => {
            return (newpassword.value == checkpassword.value)
        })

        if (!username.value || !phone.value || !usedpassword.value || !newpassword.value || !checkpassword.value) {
            if (!username.value) {
                username.nextElementSibling.style.visibility = 'visible'
                username.nextElementSibling.innerText = '请输入用户名'
            }
            if (!phone.value) {
                phone.nextElementSibling.style.visibility = 'visible'
                phone.nextElementSibling.innerText = '请输入电话号码'
            } else {
                phone.nextElementSibling.style.visibility = 'hidden'
            }
            if (!usedpassword.value) {
                usedpassword.nextElementSibling.style.visibility = 'visible'
                usedpassword.nextElementSibling.innerText = '请输入旧密码'
            } else {
                usedpassword.nextElementSibling.style.visibility = 'hidden'
            }
            if (!newpassword.value) {
                newpassword.nextElementSibling.style.visibility = 'visible'
                newpassword.nextElementSibling.innerText = '请输入新密码'
            } else {
                newpassword.nextElementSibling.style.visibility = 'hidden'
            }
            if (!checkpassword.value) {
                checkpassword.nextElementSibling.style.visibility = 'visible'
                checkpassword.nextElementSibling.innerText = '请输入确认密码'
            } else {
                checkpassword.nextElementSibling.style.visibility = 'hidden'
            }
        } else {
            // 判断用户 是否存在
            if (!nameres) {
                username.nextElementSibling.style.visibility = 'visible'
                username.nextElementSibling.innerText = '用户名不存在'
            } else {
                username.nextElementSibling.innerText = ''
            }
            // 判断此用户的电话号码 是否正确
            if (!phoneandnameres) {
                phone.nextElementSibling.style.visibility = 'visible'
                phone.nextElementSibling.innerText = '电话号码错误'
            } else {
                phone.nextElementSibling.innerText = ''
            }
            // 判断旧密码 是否正确
            if (!oldwordres) {
                usedpassword.nextElementSibling.style.visibility = 'visible'
                usedpassword.nextElementSibling.innerText = '旧密码错误'
            } else {
                usedpassword.nextElementSibling.innerText = ''
            }
            // 判断新密码与旧密码 是否一样
            if (passwordres) {
                newpassword.nextElementSibling.style.visibility = 'visible'
                newpassword.nextElementSibling.innerText = '此密码已使用过'
            } else {
                newpassword.nextElementSibling.innerText = ''
            }
            // 判断新密码与确认密码 是否一致
            if (!checkwordres) {
                checkpassword.nextElementSibling.style.visibility = 'visible'
                checkpassword.nextElementSibling.innerText = '新密码与确认密码不一致'
            } else {
                checkpassword.nextElementSibling.innerText = ''
            }


            // 如果全部通过即可修改密码
            if (nameres && phoneandnameres && oldwordres && !passwordres && checkwordres) {
                data.forEach((item, index) => {
                    if (item.username == username.value) {
                        item.password = newpassword.value
                    }
                })
                localStorage.setItem('name', JSON.stringify(data))
                succss()
            }
        }

    })
}
changeWord()


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