mask('登陆成功')
// 登录
function login() {
    // 获取元素
    var username = document.querySelector('.username')
    var password = document.querySelector('.password')
    var btn = document.querySelector('#register button')
    var remember = document.querySelector('#register .remember input')
    // 查看是否有 记住密码这个keep
    let remem = JSON.parse(localStorage.getItem('keep')) || []

    if (remem.length > 0) {
        // 若有 获取里面的数据 
        let keepname = remem[0].name
        let keepword = remem[0].word
        username.value = keepname
        password.value = keepword
        remember.checked = true
    }

    btn.addEventListener('click', () => {
        password.nextElementSibling.style.visibility = 'hidden'
        username.nextElementSibling.style.visibility = 'hidden'
        let data = JSON.parse(localStorage.getItem('name')) || []


        // 获取user是否存在
        let usernameres = data.some((item) => {
            return item.username == username.value
        })
        // 获取 用户名和密码 是否存在 且一致
        let wordnameres = data.some((item) => {
            return (item.username == username.value && item.password == password.value)
        })
        if (!username.value && !password.value) {
            username.nextElementSibling.innerHTML = '请输入用户名'
            password.nextElementSibling.innerHTML = '请输入密码'
            password.nextElementSibling.style.visibility = 'visible'
            username.nextElementSibling.style.visibility = 'visible'
        } else if (!username.value) {
            username.nextElementSibling.innerHTML = '请输入用户名'
            username.nextElementSibling.style.visibility = 'visible'
        } else if (!password.value) {
            password.nextElementSibling.innerHTML = '请输入密码'
            password.nextElementSibling.style.visibility = 'visible'
        } else if (!usernameres) {
            username.nextElementSibling.innerHTML = '用户名不存在'
            username.nextElementSibling.style.visibility = 'visible'
        } else if (!wordnameres) {
            password.nextElementSibling.innerHTML = '密码错误'
            password.nextElementSibling.style.visibility = 'visible'
        } else {
            // 以上全部不通过 进入登录
            // 若勾选上记住密码 就另存一个keep 进入localstroage
            if (remember.checked) {
                let recall = {
                    name: username.value,
                    word: password.value
                }
                let res = JSON.parse(localStorage.getItem('sign')) || []
                res.push(recall)
                localStorage.setItem('keep', JSON.stringify(res))
            } else {
                // 没有勾选则 删除keep
                localStorage.removeItem('keep')
            }
            // 成功跳转 提示信息
            succss()
        }

    })
}

login()


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
        location.href = './index.html'
    }, 3000)
}