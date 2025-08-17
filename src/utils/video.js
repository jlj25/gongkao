// 视频工具函数

// 检查是否支持视频
export function isVideoSupported() {
  return !!document.createElement('video').canPlayType
}

// 播放视频
export function playVideo(element, options = {}) {
  if (!element) return
  
  // 设置选项
  if (options.volume !== undefined) {
    element.volume = options.volume
  }
  
  if (options.loop !== undefined) {
    element.loop = options.loop
  }
  
  if (options.muted !== undefined) {
    element.muted = options.muted
  }
  
  // 播放
  element.play().catch(error => {
    console.error('播放视频失败:', error)
  })
  
  return element
}

// 暂停视频
export function pauseVideo(element) {
  if (element && typeof element.pause === 'function') {
    element.pause()
  }
}

// 停止视频
export function stopVideo(element) {
  if (element && typeof element.pause === 'function') {
    element.pause()
    element.currentTime = 0
  }
}

// 设置音量
export function setVideoVolume(element, volume) {
  if (element && volume >= 0 && volume <= 1) {
    element.volume = volume
  }
}

// 设置播放速度
export function setPlaybackRate(element, rate) {
  if (element && typeof element.playbackRate === 'number') {
    element.playbackRate = rate
  }
}

// 进入全屏
export function enterFullscreen(element) {
  if (!element) return
  
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen()
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    element.webkitRequestFullscreen()
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen()
  }
}

// 退出全屏
export function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen()
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen()
  } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    document.webkitExitFullscreen()
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen()
  }
}