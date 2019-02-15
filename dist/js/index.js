var root = window.player
var nowIndex = 0
var dataList
var len 
function getData(url) {
  $.ajax({
    type: 'GET',
    url: url,
    success: function (data) {   
      dataList = data
      len = dataList.length
      root.render(dataList[0])
      bindEvent()
      console.log(dataList)
    },
    error: function () {
      console.log(error)
    }
  })
}

function bindEvent() {
  $('.prev').on('click', function () {
    if (nowIndex == 0) {
      nowIndex = len - 1
    } else {
      nowIndex--
    }
    root.render(dataList[nowIndex])
  })
  $('.next').on('click', function () {
    if (nowIndex == len - 1) {
      nowIndex = 0
    } else {
      nowIndex++
    }
    root.render(dataList[nowIndex])
  })
}


getData ("../mock/data.json")


// 信息+图片渲染到页面上  render
// 点击按钮
// 音频的播放与暂停 切割
// 进度条运动与拖拽
// 图片旋转
// 列表切歌