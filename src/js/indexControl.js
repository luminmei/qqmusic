// 控制索引的
(function ($, root){
  function Control (len) {
    // 这里的this指向构造函数的
    // this --》Control
    this.index = 0

    // 数据总长度
    this.len = len
  }
  Control.prototype = {
    prev: function () {
      // if (this.index == 0) {
      //   this.index = len - 1
      // } else {
      //   this.index--
      // }
      // return this.index
      return this.getIndex(-1)
    },
    next:function () {
      // if (this.index == len - 1) {
      //   this.index = 0
      // } else {
      //   this.index++
      // }
      // return this.index
      return this.getIndex(1)
    },
    // 计算改变后的索引
    getIndex: function (val) {
      // 当前对应的索引
      var index = this.index
      // 数据总长度
      var len = this.len
      // 返回改变后的索引
      var curIndex = (index + val + len) % len;
      // 更新索引
      this.index = curIndex
      return curIndex
    }
  }
  root.controlIndex = Control
})(window.Zepto, window.player || (window.player = {}))