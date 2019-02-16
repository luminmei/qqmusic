var root = window.player // 全部的模块函数
// var nowIndex = 0
var dataList // 所有的数据
var len  // 总数据长度
var audio = root.audioManager // 控制音频播放、停止、加载的实例
var control// 控制索引，拿到的是控制索引的实例
var timer // 记录计时器

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
      // 绑定拖动事件
      bindTouch()
      // 加载音频资源
      audio.getAudio(data[0].audio)
      $('body').trigger('play:change', 0)
      console.log(dataList)
      console.log(root)
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
      // 记录播放了多少时间
      root.pro.start(0)
      // 旋转图片
      rotated(0)
    }
    // 渲染总时长
    root.pro.renderAllTime(dataList[index].duration)
    // 切歌的时候把位置置为0
    $('.img-box').attr('data-deg', 0)
    $('.img-box').css({
      'transform': 'rotateZ(0deg)',
      'transition': 'none'
    })
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
      // 记录播放了多少时间
      root.pro.start()
      // 旋转图片
      var deg = $('.img-box').attr('data-deg')
      rotated(deg)
    } else {
      audio.pause()
      root.pro.stop()
      // 暂停旋转
      clearInterval(timer)
    }
    $('.play').toggleClass('playing') // 切换按钮的图片
  })
}

function rotated(deg) {
  // 在哪个地方调用的play播放就让转盘旋转
  // 调用pause就让转盘停止
  clearInterval(timer)
  deg = +deg // 做一个类型转换
  timer = setInterval(function () {
    deg += 2
    // 因为获取的时候麻烦，所以直接把值存在标签上
    $('.img-box').attr('data-deg', deg)
    $('.img-box').css({
      'transform': 'rotateZ(' + deg + 'deg)',
      'transition': 'all 1s linear'
    })
  }, 200)
}

// 拖拽进度条
function bindTouch() {
  var $slider = $('.slider')
  var offset = $('.pro-bottom').offset();
  // 进度条距离左边的距离
  var left = offset.left
  // 进度条底部的宽度
  var width = offset.width
  $slider.on('touchstart', function () {
    // 拖动的时候不播放音乐
    root.pro.stop()
  }).on('touchmove', function (e) {
    // 通过移动的距离算百分比
    var x = e.changedTouches[0].clientX;
    var per = (x - left) / width
    if (per > 0 && per <= 1) {
      // 更新进度条
      root.pro.update(per)
    }
  }).on('touchend', function (e) {
    // 音乐需要跳转到百分比的位置
    // 跳转到小圆点的位置
    var x = e.changedTouches[0].clientX;
    var per = (x - left) / width
    if (per > 0 && per <= 1) {
      var curTime = per * dataList[control.index].duration;
      audio.playTo(curTime)
      // 设置按钮样式 为播放
      $('.play').toggleClass('playing')
      root.pro.start(per)
    }
  })
}

getData("../mock/data.json")

// 信息+图片渲染到页面上  render
// 点击按钮
// 音频的播放与暂停 切割
// 图片旋转


// 列表切歌
// 进度条运动与拖拽
