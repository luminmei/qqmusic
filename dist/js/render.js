// 实现页面渲染  img + info + like+btn

(function ($, root){
  function renderImg (src) {
    var img = new Image();
    img.src = src
    img.onload = function () {
      $('.img-box img').attr('src', src)
      root.blurImg(img, $('body'));
    }
  }
  function renderInfo(info) {

  }
  function renderIsLike() {

  }
  root.render = function (data) {
    renderImg(data.image)
    // renderInfo()
  }
})(window.Zepto, window.player || (window.player = {}));
// window.Zepto 在里面本来就可以取到，为了不用每次查找所以传进来了
// 容错处理，第一次加载给window.player赋值