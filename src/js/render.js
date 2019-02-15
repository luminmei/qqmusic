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
    var str = `
    <div class="song-name">` + info.song + `</div>
    <!-- 歌手名字 -->
    <div class="singer-name">` +  info.singer + `</div>
    <!-- 专辑名字 -->
    <div class="album-name">` + info.album + `</div>`;
    $('.song-info').html(str)
  }
  function renderIsLike(like) {
    if (like) {
      $('.like').addClass('liking')
    } else {
      $('.like').removeClass('liking')
    }
  }
  root.render = function (data) {
    renderImg(data.image)
    renderInfo(data)
    renderIsLike(data.isLike)
  }
})(window.Zepto, window.player || (window.player = {}));
// window.Zepto 在里面本来就可以取到，为了不用每次查找所以传进来了
// 容错处理，第一次加载给window.player赋值