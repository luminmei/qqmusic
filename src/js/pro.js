// 进度条模块
(function ($, root) {

  var $scope = $(document.body)
  var curDuration // 总时长
  var frameId // frame用于计时的
  var startTime // 开始时间
  var lastPer = 0// 停止时间的百分比

  var flag = true // 标记是否在播放歌曲

  // 每一首歌的总时间是  duration
  function renderAllTime(time) {
    // 获取到总时间
    curDuration = time

    // 设置左侧时间为0
    lastPer = 0

    // 将时间格式转换一下
    // 拿到的是秒
    time = formatTime(time)
    $scope.find('.all-time').html(time)
  }
  // 将时间格式转换一下  253 -->  04:13
  function formatTime(t) {
    // 取整
    t = Math.round(t)
    var m = Math.floor(t / 60)
    var s = t - m * 60
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    return m + ':' + s
  }

  // 触发开始按钮的时候就调用 音乐播放  有play的地方都有它
  function start() {
    flag = false
    // 获取当前系统的时间
    startTime = new Date().getTime();
    function frame() {
      // 获取当前系统的时间
      var curTime = new Date().getTime()
      // 走过的时间 / 总时间
      // 转为毫秒就乘1000
      // 获取到百分比
      // lasetPer 记录停止的时间
      var percent = lastPer + (curTime - startTime) / (curDuration * 1000)
      // 因为左侧时间不能比右侧大，所以小于等于1的时候才去渲染时间
      if (percent <= 1 && (flag == false)) {
        update(percent)
      } else {
        cancelAnimationFrame(frameId)
      }
      // 隔着屏幕刷新频率的时间  动起来
      frameId =  requestAnimationFrame(frame)
    }
    frame()
  }
  // 取消时间流逝  停止计时
  function stop() {
    flag = true
    cancelAnimationFrame(frameId)
    // 记录当前停止时间
    var stopTime = new Date().getTime()
    // 记录一下停止的百分比  
    // 也要加上之前的lastPer
    lastPer = lastPer + (stopTime - startTime) / (curDuration * 1000)
  }

  // 更新区域      左侧时间 + 进度条运动
  function update (per) {
    var curTime = curDuration * per  // 当前时间*百分比 = 走过的时间
    curTime = formatTime(curTime)
    $scope.find('.cur-time').html(curTime)
  }

  root.pro = {
    renderAllTime: renderAllTime,
    start: start,
    stop: stop
  }
})(window.Zepto, window.player || (window.player = {}))