// 设备信息检测工具函数

// 检测是否为移动端设备
export function isMobile() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

// 检测是否为iOS设备
export function isIOS() {
  return /iPad|iPhone|iPod/.test(navigator.userAgent);
}

// 检测是否为Android设备
export function isAndroid() {
  return /Android/.test(navigator.userAgent);
}

// 检测是否为微信浏览器
export function isWechat() {
  return /MicroMessenger/i.test(navigator.userAgent);
}

// 检测是否为企业微信浏览器
export function isWeCom() {
  return /WxWork/i.test(navigator.userAgent);
}

// 检测是否为QQ浏览器
export function isQQ() {
  return /QQ/i.test(navigator.userAgent);
}

// 检测是否为支付宝浏览器
export function isAlipay() {
  return /AlipayClient/i.test(navigator.userAgent);
}

// 检测是否为桌面端
export function isDesktop() {
  return !isMobile();
}

// 获取设备类型
export function getDeviceType() {
  if (isMobile()) {
    if (isIOS()) return 'iOS';
    if (isAndroid()) return 'Android';
    return 'Mobile';
  }
  return 'Desktop';
}

// 获取浏览器类型
export function getBrowserType() {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('MSIE') || userAgent.includes('Trident')) return 'IE';
  
  return 'Unknown';
}

// 获取操作系统信息
export function getOS() {
  const userAgent = navigator.userAgent;
  
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS') || userAgent.includes('iPhone') || userAgent.includes('iPad')) return 'iOS';
  
  return 'Unknown';
}

// 获取屏幕信息
export function getScreenInfo() {
  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelDepth: screen.pixelDepth
  };
}

// 获取窗口信息
export function getWindowInfo() {
  return {
    width: window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
    height: window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
    scrollX: window.pageXOffset || document.documentElement.scrollLeft,
    scrollY: window.pageYOffset || document.documentElement.scrollTop
  };
}

// 检测是否支持触摸
export function isTouchSupported() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
}

// 检测是否支持地理位置
export function isGeolocationSupported() {
  return 'geolocation' in navigator;
}

// 检测是否支持摄像头
export function isCameraSupported() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
}

// 检测是否支持本地存储
export function isLocalStorageSupported() {
  try {
    const test = 'test';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// 检测是否支持会话存储
export function isSessionStorageSupported() {
  try {
    const test = 'test';
    sessionStorage.setItem(test, test);
    sessionStorage.removeItem(test);
    return true;
  } catch (e) {
    return false;
  }
}

// 检测是否支持Cookie
export function isCookieSupported() {
  try {
    document.cookie = 'cookietest=1';
    const ret = document.cookie.indexOf('cookietest=') !== -1;
    document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
    return ret;
  } catch (e) {
    return false;
  }
}

// 检测是否支持Canvas
export function isCanvasSupported() {
  const elem = document.createElement('canvas');
  return !!(elem.getContext && elem.getContext('2d'));
}

// 检测是否支持WebGL
export function isWebGLSupported() {
  try {
    const canvas = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
  } catch (e) {
    return false;
  }
}

// 检测是否支持Service Worker
export function isServiceWorkerSupported() {
  return 'serviceWorker' in navigator;
}

// 检测是否支持Push API
export function isPushSupported() {
  return 'PushManager' in window;
}

// 检测是否支持Notification API
export function isNotificationSupported() {
  return 'Notification' in window;
}

// 检测是否支持WebSocket
export function isWebSocketSupported() {
  return 'WebSocket' in window || 'MozWebSocket' in window;
}

// 检测是否支持WebRTC
export function isWebRTCSupported() {
  return navigator.mediaDevices && navigator.mediaDevices.getUserMedia &&
         window.RTCPeerConnection && window.RTCSessionDescription && window.RTCIceCandidate;
}

// 获取网络信息
export function getNetworkInfo() {
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  
  if (connection) {
    return {
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
      saveData: connection.saveData || false
    };
  }
  
  return {
    effectiveType: 'unknown',
    downlink: 0,
    rtt: 0,
    saveData: false
  };
}

// 检测是否在线
export function isOnline() {
  return navigator.onLine;
}

// 获取电池信息（如果支持）
export async function getBatteryInfo() {
  try {
    if ('getBattery' in navigator) {
      const battery = await navigator.getBattery();
      return {
        charging: battery.charging,
        level: battery.level,
        chargingTime: battery.chargingTime,
        dischargingTime: battery.dischargingTime
      };
    }
    return null;
  } catch (error) {
    return null;
  }
}

// 获取设备内存信息（如果支持）
export function getMemoryInfo() {
  if ('deviceMemory' in navigator) {
    return {
      deviceMemory: navigator.deviceMemory, // GB
      memory: performance.memory ? {
        usedJSHeapSize: performance.memory.usedJSHeapSize,
        totalJSHeapSize: performance.memory.totalJSHeapSize,
        jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
      } : null
    };
  }
  
  return {
    deviceMemory: undefined,
    memory: performance.memory ? {
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit
    } : null
  };
}

// 检测是否为横屏
export function isLandscape() {
  return window.innerWidth > window.innerHeight;
}

// 检测是否为竖屏
export function isPortrait() {
  return window.innerHeight > window.innerWidth;
}

// 监听屏幕方向变化
export function onOrientationChange(callback) {
  if (typeof callback !== 'function') return;
  
  const handleChange = () => callback({
    isLandscape: isLandscape(),
    isPortrait: isPortrait(),
    orientation: window.orientation || 0
  });
  
  window.addEventListener('resize', handleChange);
  window.addEventListener('orientationchange', handleChange);
  
  // 返回取消监听的函数
  return () => {
    window.removeEventListener('resize', handleChange);
    window.removeEventListener('orientationchange', handleChange);
  };
}

// 获取DPI
export function getDPI() {
  try {
    const devicePixelRatio = window.devicePixelRatio || 1;
    const tempDiv = document.createElement('div');
    tempDiv.style.width = '1in';
    document.body.appendChild(tempDiv);
    const dpi = tempDiv.offsetWidth * devicePixelRatio;
    document.body.removeChild(tempDiv);
    return dpi;
  } catch (error) {
    return 96 * (window.devicePixelRatio || 1);
  }
}

// 检测是否支持语音识别
export function isSpeechRecognitionSupported() {
  return 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window;
}

// 检测是否支持语音合成
export function isSpeechSynthesisSupported() {
  return 'speechSynthesis' in window;
}

// 检测是否支持剪贴板API
export function isClipboardSupported() {
  return navigator.clipboard && navigator.clipboard.writeText && navigator.clipboard.readText;
}

// 检测是否支持全屏API
export function isFullscreenSupported() {
  return document.fullscreenEnabled || 
         document.webkitFullscreenEnabled || 
         document.mozFullScreenEnabled || 
         document.msFullscreenEnabled;
}

// 检测是否支持震动API
export function isVibrateSupported() {
  return 'vibrate' in navigator;
}

// 检测是否支持蓝牙API
export function isBluetoothSupported() {
  return 'bluetooth' in navigator;
}

// 检测是否支持USB API
export function isUSBSupported() {
  return 'usb' in navigator;
}

// 检测是否支持NFC API
export function isNFCSupported() {
  return 'NDEFReader' in window;
}

// 检测是否支持支付API
export function isPaymentSupported() {
  return 'PaymentRequest' in window;
}

// 检测是否支持环境光传感器
export function isAmbientLightSensorSupported() {
  return 'AmbientLightSensor' in window;
}

// 检测是否支持加速度传感器
export function isAccelerometerSupported() {
  return 'Accelerometer' in window;
}

// 检测是否支持陀螺仪传感器
export function isGyroscopeSupported() {
  return 'Gyroscope' in window;
}

// 检测是否支持地理位置传感器
export function isGeolocationSensorSupported() {
  return 'GeolocationSensor' in window;
}