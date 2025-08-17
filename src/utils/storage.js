// 数据存储工具函数

// 本地存储相关函数

// 设置本地存储
export function setLocalStorage(key, value) {
  try {
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(value))
    } else {
      localStorage.setItem(key, value)
    }
    return true
  } catch (e) {
    console.error('设置本地存储失败:', e)
    return false
  }
}

// 获取本地存储
export function getLocalStorage(key, defaultValue = null) {
  try {
    const value = localStorage.getItem(key)
    if (value === null) return defaultValue
    
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  } catch (e) {
    console.error('获取本地存储失败:', e)
    return defaultValue
  }
}

// 删除本地存储
export function removeLocalStorage(key) {
  try {
    localStorage.removeItem(key)
    return true
  } catch (e) {
    console.error('删除本地存储失败:', e)
    return false
  }
}

// 清空本地存储
export function clearLocalStorage() {
  try {
    localStorage.clear()
    return true
  } catch (e) {
    console.error('清空本地存储失败:', e)
    return false
  }
}

// 检查本地存储项是否存在
export function hasLocalStorage(key) {
  try {
    return localStorage.getItem(key) !== null;
  } catch (error) {
    console.error('检查本地存储项失败:', error);
    return false;
  }
}

// 获取所有本地存储项的键
export function getAllLocalStorageKeys() {
  try {
    return Object.keys(localStorage);
  } catch (error) {
    console.error('获取本地存储键列表失败:', error);
    return [];
  }
}

// 获取本地存储项的数量
export function getLocalStorageLength() {
  try {
    return localStorage.length;
  } catch (error) {
    console.error('获取本地存储长度失败:', error);
    return 0;
  }
}

// 设置带过期时间的本地存储项
export function setLocalStorageWithExpiry(key, value, ttl) {
  try {
    const now = new Date().getTime();
    const item = {
      value: value,
      expiry: now + ttl,
    };
    
    if (typeof value === 'object') {
      localStorage.setItem(key, JSON.stringify(item));
    } else {
      localStorage.setItem(key, JSON.stringify({
        value: String(value),
        expiry: now + ttl
      }));
    }
    
    return true;
  } catch (error) {
    console.error('设置带过期时间的本地存储项失败:', error);
    return false;
  }
}

// 获取带过期时间的本地存储项
export function getLocalStorageWithExpiry(key, defaultValue = null) {
  try {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) return defaultValue;
    
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    
    // 检查是否过期
    if (now > item.expiry) {
      // 过期则删除
      localStorage.removeItem(key);
      return defaultValue;
    }
    
    return item.value;
  } catch (error) {
    console.error('获取带过期时间的本地存储项失败:', error);
    return defaultValue;
  }
}

// 获取本地存储使用情况
export function getLocalStorageUsage() {
  try {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error('获取本地存储使用情况失败:', error);
    return 0;
  }
}

// 批量设置本地存储项
export function setMultipleLocalStorage(items) {
  try {
    for (const [key, value] of Object.entries(items)) {
      setLocalStorage(key, value);
    }
    return true;
  } catch (error) {
    console.error('批量设置本地存储项失败:', error);
    return false;
  }
}

// 批量获取本地存储项
export function getMultipleLocalStorage(keys) {
  try {
    const result = {};
    for (const key of keys) {
      result[key] = getLocalStorage(key);
    }
    return result;
  } catch (error) {
    console.error('批量获取本地存储项失败:', error);
    return {};
  }
}

// 批量删除本地存储项
export function removeMultipleLocalStorage(keys) {
  try {
    for (const key of keys) {
      removeLocalStorage(key);
    }
    return true;
  } catch (error) {
    console.error('批量删除本地存储项失败:', error);
    return false;
  }
}

// 会话存储相关函数

// 设置会话存储
export function setSessionStorage(key, value) {
  try {
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(value))
    } else {
      sessionStorage.setItem(key, value)
    }
    return true
  } catch (e) {
    console.error('设置会话存储失败:', e)
    return false
  }
}

// 获取会话存储
export function getSessionStorage(key, defaultValue = null) {
  try {
    const value = sessionStorage.getItem(key)
    if (value === null) return defaultValue
    
    try {
      return JSON.parse(value)
    } catch (e) {
      return value
    }
  } catch (e) {
    console.error('获取会话存储失败:', e)
    return defaultValue
  }
}

// 删除会话存储
export function removeSessionStorage(key) {
  try {
    sessionStorage.removeItem(key)
    return true
  } catch (e) {
    console.error('删除会话存储失败:', e)
    return false
  }
}

// 清空会话存储
export function clearSessionStorage() {
  try {
    sessionStorage.clear()
    return true
  } catch (e) {
    console.error('清空会话存储失败:', e)
    return false
  }
}

// 检查会话存储项是否存在
export function hasSessionStorage(key) {
  try {
    return sessionStorage.getItem(key) !== null;
  } catch (error) {
    console.error('检查会话存储项失败:', error);
    return false;
  }
}

// 获取所有会话存储项的键
export function getAllSessionStorageKeys() {
  try {
    return Object.keys(sessionStorage);
  } catch (error) {
    console.error('获取会话存储键列表失败:', error);
    return [];
  }
}

// 获取会话存储项的数量
export function getSessionStorageLength() {
  try {
    return sessionStorage.length;
  } catch (error) {
    console.error('获取会话存储长度失败:', error);
    return 0;
  }
}

// 设置带过期时间的会话存储项
export function setSessionStorageWithExpiry(key, value, ttl) {
  try {
    const now = new Date().getTime();
    const item = {
      value: value,
      expiry: now + ttl,
    };
    
    if (typeof value === 'object') {
      sessionStorage.setItem(key, JSON.stringify(item));
    } else {
      sessionStorage.setItem(key, JSON.stringify({
        value: String(value),
        expiry: now + ttl
      }));
    }
    
    return true;
  } catch (error) {
    console.error('设置带过期时间的会话存储项失败:', error);
    return false;
  }
}

// 获取带过期时间的会话存储项
export function getSessionStorageWithExpiry(key, defaultValue = null) {
  try {
    const itemStr = sessionStorage.getItem(key);
    if (!itemStr) return defaultValue;
    
    const item = JSON.parse(itemStr);
    const now = new Date().getTime();
    
    // 检查是否过期
    if (now > item.expiry) {
      // 过期则删除
      sessionStorage.removeItem(key);
      return defaultValue;
    }
    
    return item.value;
  } catch (error) {
    console.error('获取带过期时间的会话存储项失败:', error);
    return defaultValue;
  }
}

// 获取会话存储使用情况
export function getSessionStorageUsage() {
  try {
    let total = 0;
    for (let key in sessionStorage) {
      if (sessionStorage.hasOwnProperty(key)) {
        total += sessionStorage[key].length + key.length;
      }
    }
    return total;
  } catch (error) {
    console.error('获取会话存储使用情况失败:', error);
    return 0;
  }
}

// 批量设置会话存储项
export function setMultipleSessionStorage(items) {
  try {
    for (const [key, value] of Object.entries(items)) {
      setSessionStorage(key, value);
    }
    return true;
  } catch (error) {
    console.error('批量设置会话存储项失败:', error);
    return false;
  }
}

// 批量获取会话存储项
export function getMultipleSessionStorage(keys) {
  try {
    const result = {};
    for (const key of keys) {
      result[key] = getSessionStorage(key);
    }
    return result;
  } catch (error) {
    console.error('批量获取会话存储项失败:', error);
    return {};
  }
}

// 批量删除会话存储项
export function removeMultipleSessionStorage(keys) {
  try {
    for (const key of keys) {
      removeSessionStorage(key);
    }
    return true;
  } catch (error) {
    console.error('批量删除会话存储项失败:', error);
    return false;
  }
}

// IndexedDB 相关函数

// 打开数据库
function openDB(dbName, version, upgradeCallback) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version)
    
    request.onerror = function(event) {
      reject(new Error('打开数据库失败: ' + event.target.error))
    }
    
    request.onsuccess = function(event) {
      resolve(event.target.result)
    }
    
    request.onupgradeneeded = function(event) {
      const db = event.target.result
      if (upgradeCallback) {
        upgradeCallback(db, event.oldVersion, event.newVersion)
      }
    }
  })
}

// 创建对象存储空间
export async function createObjectStore(dbName, version, storeName, keyPath, indexes = []) {
  return openDB(dbName, version, (db, oldVersion, newVersion) => {
    if (!db.objectStoreNames.contains(storeName)) {
      const objectStore = db.createObjectStore(storeName, { keyPath })
      
      // 创建索引
      indexes.forEach(index => {
        objectStore.createIndex(index.name, index.keyPath, index.options || {})
      })
    }
  })
}

// 添加数据
export async function addData(dbName, version, storeName, data) {
  const db = await openDB(dbName, version)
  const transaction = db.transaction([storeName], 'readwrite')
  const objectStore = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = objectStore.add(data)
    
    request.onsuccess = function() {
      resolve(request.result)
    }
    
    request.onerror = function(event) {
      reject(new Error('添加数据失败: ' + event.target.error))
    }
  })
}

// 获取数据
export async function getData(dbName, version, storeName, key) {
  const db = await openDB(dbName, version)
  const transaction = db.transaction([storeName], 'readonly')
  const objectStore = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = objectStore.get(key)
    
    request.onsuccess = function() {
      resolve(request.result)
    }
    
    request.onerror = function(event) {
      reject(new Error('获取数据失败: ' + event.target.error))
    }
  })
}

// 更新数据
export async function updateData(dbName, version, storeName, key, data) {
  const db = await openDB(dbName, version)
  const transaction = db.transaction([storeName], 'readwrite')
  const objectStore = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = objectStore.put({ ...data, [objectStore.keyPath]: key })
    
    request.onsuccess = function() {
      resolve(request.result)
    }
    
    request.onerror = function(event) {
      reject(new Error('更新数据失败: ' + event.target.error))
    }
  })
}

// 删除数据
export async function deleteData(dbName, version, storeName, key) {
  const db = await openDB(dbName, version)
  const transaction = db.transaction([storeName], 'readwrite')
  const objectStore = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = objectStore.delete(key)
    
    request.onsuccess = function() {
      resolve()
    }
    
    request.onerror = function(event) {
      reject(new Error('删除数据失败: ' + event.target.error))
    }
  })
}

// 获取所有数据
export async function getAllData(dbName, version, storeName) {
  const db = await openDB(dbName, version)
  const transaction = db.transaction([storeName], 'readonly')
  const objectStore = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = objectStore.getAll()
    
    request.onsuccess = function() {
      resolve(request.result)
    }
    
    request.onerror = function(event) {
      reject(new Error('获取所有数据失败: ' + event.target.error))
    }
  })
}

// 清空存储空间
export async function clearObjectStore(dbName, version, storeName) {
  const db = await openDB(dbName, version)
  const transaction = db.transaction([storeName], 'readwrite')
  const objectStore = transaction.objectStore(storeName)
  
  return new Promise((resolve, reject) => {
    const request = objectStore.clear()
    
    request.onsuccess = function() {
      resolve()
    }
    
    request.onerror = function(event) {
      reject(new Error('清空存储空间失败: ' + event.target.error))
    }
  })
}

// 删除数据库
export function deleteDB(dbName) {
  return new Promise((resolve, reject) => {
    const request = indexedDB.deleteDatabase(dbName)
    
    request.onsuccess = function() {
      resolve()
    }
    
    request.onerror = function(event) {
      reject(new Error('删除数据库失败: ' + event.target.error))
    }
    
    request.onblocked = function() {
      reject(new Error('删除数据库被阻止'))
    }
  })
}

// Cookie 相关函数

// 设置 Cookie
export function setCookie(name, value, days = 7, path = '/') {
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=' + path
}

// 获取 Cookie
export function getCookie(name) {
  const cookies = document.cookie.split(';')
  for (let cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=')
    if (cookieName === name) {
      return decodeURIComponent(cookieValue)
    }
  }
  return null
}

// 删除 Cookie
export function removeCookie(name, path = '/') {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=' + path
}

// 清空所有 Cookie
export function clearCookies() {
  const cookies = document.cookie.split(';')
  
  for (let cookie of cookies) {
    const eqPos = cookie.indexOf('=')
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/'
  }
}

// 保留原有的函数以保持向后兼容

// 设置本地存储 (向后兼容)
export function setStorage(key, value) {
  return setLocalStorage(key, value)
}

// 获取本地存储 (向后兼容)
export function getStorage(key) {
  return getLocalStorage(key)
}

// 删除本地存储 (向后兼容)
export function removeStorage(key) {
  return removeLocalStorage(key)
}

// 清空本地存储 (向后兼容)
export function clearStorage() {
  return clearLocalStorage()
}