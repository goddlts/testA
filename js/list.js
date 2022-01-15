// 设置axios的基地址，将来调用get/delete。。。。会自动把baseURL和get/delete后的地址拼接起来
// axios.defaults.baseURL = 'http://82.156.8.100:8000/api/v1'
let last = null
let loading = false
// 1. 会员列表
// function loadList() {
//   axios
//     .get('/member-list-page')
//     .then(res => {
//       // console.log(res.data)
//       const { code, data } = res.data

//       if (code === 200) {
//         // 模板引擎渲染数据
//         let html = template('tpl', {
//           members: data
//         })

//         // 把渲染的html显示到页面上
//         document.querySelector('#members').innerHTML = html
//       } else {
//         alert('获取数据失败')
//       }
//     })
// }

// loadList()


// 2. 删除会员
let members = document.querySelector('#members')
members.onclick = function (e) {
  if (e.target.matches('.text-danger')) {
    // 取消后续内容的执行
    e.preventDefault()
    // 提示用户是否删除
    if (!confirm('是否删除该会员')) return

    // 获取要删除数据的id
    const id = e.target.dataset.id

    // 如果是删除按钮
    axios
      .delete('/member-delete', {
        // 查询字符串
        params: {
          id: id
        }
      })
      .then(res => {
        const { code, message } = res.data
        if (code === 200) {
          // 删除成功，加载第一页数据
          last = null
          axios
            .get('/member-list-last', {
              params: {
                last: last
              }
            })
            .then(res => {
              // console.log(res.data)
              const { code, data } = res.data

              if (code === 200) {
                // 模板引擎渲染数据
                let html = template('tpl', {
                  members: data
                })

                // 记录下来最后一条数据的id
                last = data[data.length - 1].id
                // 把渲染的html显示到页面上
                document.querySelector('#members').innerHTML = html
              } else {
                alert('获取数据失败')
              }
            })
        } else {
          // 删除失败
          alert(message)
        }
      })
      .catch(() => {
        alert('网络出错')
      })
  }
}

// 3. 会员列表，下拉加载更多数据

window.onscroll = function () {
  // 当滚动条滚动的时候，判断当前页面底部还有<100px的时候加载下一页数据

  // 文档的高度
  const docHeight = document.documentElement.scrollHeight
  // 浏览器可视区域的高度
  const winHeight = document.documentElement.clientHeight
  // 文档滚动出去的距离
  const offset = document.documentElement.scrollTop

  if (docHeight - winHeight - offset >= 100) return


  console.log('xxxxx')
  // 文档在浏览器外面的距离如果不到100px，则去加载下一页数据

  // 如果正在加载数据，就不再调用loadList
  if (!loading) {
    loadList()
  }
}


loadList()
function loadList() {
  // 做一个标记，标记当前loadList是否正在执行
  loading = true
  axios
    .get('/member-list-last', {
      params: {
        last: last
      }
    })
    .then(res => {
      // console.log(res.data)
      const { code, data } = res.data

      if (code === 200) {
        // 模板引擎渲染数据
        let html = template('tpl', {
          members: data
        })

        // 记录下来最后一条数据的id
        last = data[data.length - 1].id
        // 把渲染的html显示到页面上
        document.querySelector('#members').innerHTML += html
      } else {
        alert('获取数据失败')
      }

      // 当数据加载完毕以后，再把loading的值设置为false
      loading = false
    })
}

// loadList()