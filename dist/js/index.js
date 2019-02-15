function getData(url) {
  $.ajax({
    type: 'GET',
    url: url,
    success: function (data) {
      console.log(data)
    },
    error: function () {
      console.log(error)
    }
  })
}

getData ("../mock/data.json")


// 信息+图片渲染到页面上
// 点击按钮
// 音频的播放与暂停 切割
// 进度条运动与拖拽
// 图片旋转
// 列表切歌