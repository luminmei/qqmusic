var root = window.player // 全部的模块函数
// var nowIndex = 0
var dataList // 所有的数据
var len  // 总数据长度
var audio = root.audioManager // 控制音频播放、停止、加载的实例
var control// 控制索引，拿到的是控制索引的实例

function getData(url) {
  $.ajax({
    type: 'GET',
    url: url,
    success: function (data) {   
      dataList = data
      len = dataList.length
      control = new root.controlIndex(len) // 把长度传到控制的索引
      // 渲染背景图片和圆盘图片
      root.render(dataList[0])
      // 绑定事件
      bindEvent()
      // 加载音频资源
      audio.getAudio(data[0].audio)
      console.log(dataList)
    },
    error: function () {
      console.log(error)
    }
  })
}

function bindEvent() {
  // 自定义事件
  $('body').on('play:change', function (e, index) { // 第一个参数是自定义事件
    root.render(dataList[index])
    audio.getAudio(dataList[index].audio)
    if (audio.status == 'play') {
      audio.play()
    }
  })
  $('.prev').on('click', function () {
    // if (nowIndex == 0) {
    //   nowIndex = len - 1
    // } else {
    //   nowIndex--
    // }
    var i = control.prev() // 返回当前的索引值
    // root.render(dataList[i])
    // audio.getAudio(dataList[i].audio)
    // if (audio.status == 'play') {
    //   audio.play()
    // }
    $('body').trigger('play:change', i) // 触发自定义事件
  })
  $('.next').on('click', function () {
    // if (nowIndex == len - 1) {
    //   nowIndex = 0
    // } else {
    //   nowIndex++
    // }
    var i = control.next() // 返回当前的索引值
    // root.render(dataList[i])
    // audio.getAudio(dataList[i].audio)
    // if (audio.status == 'play') { // 为了在切换歌曲的时候，播放就继续播放
    //   audio.play()
    // }
    $('body').trigger('play:change', i)
  })
  $('.play').on('click', function () {
    if (audio.status == 'pause') {
      audio.play()
    } else {
      audio.pause()
    }
    $('.play').toggleClass('playing') // 切换按钮的图片
  })
}


getData ("../mock/data.json")


// 信息+图片渲染到页面上  render
// 点击按钮
// 音频的播放与暂停 切割
// 图片旋转


// 列表切歌
// 进度条运动与拖拽
