// 添加会员

// 1. 上传图片预览
const inputFile = document.querySelector('#input_avatar')
// 选择的文件变化了执行
inputFile.onchange = function () {
  // inputFile.files
  const file = this.files[0]
  const url = URL.createObjectURL(file)
  document.querySelector('.img-thumbnail').src = url
}

// 2. 上传文件
// 给按钮注册事件
const btn = document.querySelector('#save')
btn.onclick = function (e) {
  // 取消默认行为
  e.preventDefault()

  // 点击按钮的时候，获取用户的输入，判断是否输入
  const name = document.querySelector('#input_name').value
  const bio = document.querySelector('#input_bio').value
  const files = inputFile.files
  if (!name || !bio || files.length === 0) {
    return alert('请输入用户信息')
  }
  const avatar = files[0]
  // 构建formData
  const formData = new FormData()
  formData.append('name', name)
  formData.append('bio', bio)
  formData.append('avatar', avatar)

  // 发送post请求
  axios
    .post('/member-add', formData)
    .then(res => {
      const { code, message } = res.data
      if (code === 201) {
        // 添加成功
        location.href = '/member-list.html'
      } else {
        alert(message)
      }
    })
    .catch(err => {
      console.log(err)
    })
}