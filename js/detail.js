// location.search 查询字符串

// 写一个函数：把查询字符串转换成对象，?nickname=484&abc=aa ---》 { nickname: 484, abc: 'aa' }
function qs(search) {
  // search --> ?nickname=484&abc=aa
  // nickname=484&abc=aa
  search = search.replace('?', '')

  // ['nickname=484', 'abc=aa']
  const arr = search.split('&')
  const obj = {}
  arr.forEach(item => {
    // item ---> nickname=484
    // ['nickname', '484']
    const tmpArr = item.split('=')
    if (tmpArr.length === 2) {
      const key = tmpArr[0]
      const value = tmpArr[1]
      obj[key] = value
    }
  })
  return obj
}

// 把查询字符串解析以后的对象
const query = qs(location.search)

// 获取会员id
const id = query.id

axios
  .get('/member-detail', {
    params: {
      id
    }
  })
  .then(res => {
    const { code, data } = res.data
    if (code === 200) {
      // 数据获取成功
      const html = template('tpl', {
        member: data
      })
      console.log(html)
      document.querySelector('#detail').innerHTML = html
    } else {
      // 数据获取失败
      alert('会员信息获取失败')
    }
  })
  .catch(err => {
    console.log(err)
  })

