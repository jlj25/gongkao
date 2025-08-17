// 音频工具函数

// 检查是否支持音频
export function isAudioSupported() {
  return !!document.createElement('audio').canPlayType
}

// 播放音频
export function playAudio(url, options = {}) {
  if (!url) return
  
  const audio = new Audio(url)
  
  // 设置选项
  if (options.volume !== undefined) {
    audio.volume = options.volume
  }
  
  if (options.loop !== undefined) {
    audio.loop = options.loop
  }
  
  if (options.muted !== undefined) {
    audio.muted = options.muted
  }
  
  // 播放
  audio.play().catch(error => {
    console.error('播放音频失败:', error)
  })
  
  return audio
}

// 暂停音频
export function pauseAudio(audio) {
  if (audio && typeof audio.pause === 'function') {
    audio.pause()
  }
}

// 停止音频
export function stopAudio(audio) {
  if (audio && typeof audio.pause === 'function') {
    audio.pause()
    audio.currentTime = 0
  }
}

// 设置音量
export function setVolume(audio, volume) {
  if (audio && volume >= 0 && volume <= 1) {
    audio.volume = volume
  }
}

// 获取音频时长
export function getAudioDuration(audio) {
  if (audio && typeof audio.duration === 'number') {
    return audio.duration
  }
  return 0
}

// 获取当前播放时间
export function getCurrentTime(audio) {
  if (audio && typeof audio.currentTime === 'number') {
    return audio.currentTime
  }
  return 0
}