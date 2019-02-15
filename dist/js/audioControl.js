(function ($, root) {
  // play pause getAudio
  function AudioManager (src) {
    // 创建音频对象
    this.audio = new Audio()
    // this.src = src
    // audio默认状态
    this.status = 'pause'
  }
  AudioManager.prototype = {
    play:function() {
      this.audio.play()
      this.status = 'play'
    },
    pause:function() {
      this.audio.pause()
      this.status = 'pause'
    },
    // 获取到音频
    getAudio:function(src) {
      this.audio.src = src
      // 加载音频，并不进行播放
      this.audio.load()
    }
  }
  root.audioManager = new AudioManager()
})(window.Zepto, window.player = (window.player = {}))