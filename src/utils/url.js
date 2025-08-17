// URL操作工具函数

// 解析URL参数
export function parseUrlParams(url) {
  const params = {};
  
  try {
    const urlObj = new URL(url);
    for (const [key, value] of urlObj.searchParams) {
      params[key] = value;
    }
  } catch (error) {
    // 如果URL无效，则尝试从查询字符串解析
    const queryString = url.split('?')[1];
    if (queryString) {
      const pairs = queryString.split('&');
      for (const pair of pairs) {
        const [key, value] = pair.split('=');
        if (key) {
          params[decodeURIComponent(key)] = decodeURIComponent(value || '');
        }
      }
    }
  }
  
  return params;
}

// 构建URL参数
export function buildUrlParams(params) {
  if (!params || typeof params !== 'object') return '';
  
  const pairs = [];
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const value = params[key];
      if (value !== undefined && value !== null) {
        pairs.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`);
      }
    }
  }
  
  return pairs.length > 0 ? `?${pairs.join('&')}` : '';
}

// 合并URL和参数
export function mergeUrlParams(url, params) {
  if (!url) return '';
  
  const urlObj = new URL(url, 'http://example.com'); // 使用基础URL以处理相对URL
  
  if (params && typeof params === 'object') {
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        if (value !== undefined && value !== null) {
          urlObj.searchParams.set(key, value);
        } else {
          urlObj.searchParams.delete(key);
        }
      }
    }
  }
  
  // 如果原始URL是相对的，只返回路径和查询参数
  if (!url.startsWith('http')) {
    return urlObj.pathname + urlObj.search;
  }
  
  return urlObj.toString();
}

// 获取URL中的特定参数
export function getUrlParam(url, paramName) {
  const params = parseUrlParams(url);
  return params[paramName];
}

// 删除URL中的特定参数
export function removeUrlParam(url, paramName) {
  const urlObj = new URL(url, 'http://example.com');
  urlObj.searchParams.delete(paramName);
  
  // 如果原始URL是相对的，只返回路径和查询参数
  if (!url.startsWith('http')) {
    return urlObj.pathname + urlObj.search;
  }
  
  return urlObj.toString();
}

// 检查URL是否有效
export function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}

// 获取URL的域名
export function getDomain(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch (error) {
    return '';
  }
}

// 获取URL的路径
export function getPath(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.pathname;
  } catch (error) {
    return '';
  }
}

// 获取URL的协议
export function getProtocol(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol;
  } catch (error) {
    return '';
  }
}

// 获取URL的端口
export function getPort(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.port;
  } catch (error) {
    return '';
  }
}

// 获取URL的查询字符串
export function getQueryString(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.search;
  } catch (error) {
    return '';
  }
}

// 获取URL的哈希值
export function getHash(url) {
  try {
    const urlObj = new URL(url);
    return urlObj.hash;
  } catch (error) {
    return '';
  }
}

// 添加哈希到URL
export function addHash(url, hash) {
  try {
    const urlObj = new URL(url);
    urlObj.hash = hash;
    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

// 构建完整的URL
export function buildUrl(protocol, domain, port, path, params, hash) {
  let url = `${protocol}//${domain}`;
  
  if (port) {
    url += `:${port}`;
  }
  
  if (path) {
    url += path;
  }
  
  if (params) {
    url += buildUrlParams(params);
  }
  
  if (hash) {
    url += `#${hash}`;
  }
  
  return url;
}

// 解析完整的URL
export function parseUrl(url) {
  try {
    const urlObj = new URL(url);
    return {
      protocol: urlObj.protocol,
      domain: urlObj.hostname,
      port: urlObj.port,
      path: urlObj.pathname,
      params: parseUrlParams(urlObj.search),
      hash: urlObj.hash
    };
  } catch (error) {
    return null;
  }
}

// 标准化URL
export function normalizeUrl(url) {
  try {
    const urlObj = new URL(url);
    // 移除默认端口
    if ((urlObj.protocol === 'http:' && urlObj.port === '80') || 
        (urlObj.protocol === 'https:' && urlObj.port === '443')) {
      urlObj.port = '';
    }
    
    // 移除末尾斜杠（如果不是根路径）
    if (urlObj.pathname.length > 1 && urlObj.pathname.endsWith('/')) {
      urlObj.pathname = urlObj.pathname.slice(0, -1);
    }
    
    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

// 比较两个URL是否相等
export function isEqualUrl(url1, url2) {
  try {
    const normalizedUrl1 = normalizeUrl(url1);
    const normalizedUrl2 = normalizeUrl(url2);
    return normalizedUrl1 === normalizedUrl2;
  } catch (error) {
    return url1 === url2;
  }
}

// 检查URL是否为绝对路径
export function isAbsoluteUrl(url) {
  return /^https?:\/\//i.test(url);
}

// 检查URL是否为相对路径
export function isRelativeUrl(url) {
  return !isAbsoluteUrl(url);
}

// 解析相对URL
export function resolveRelativeUrl(baseUrl, relativeUrl) {
  try {
    const urlObj = new URL(relativeUrl, baseUrl);
    return urlObj.toString();
  } catch (error) {
    return relativeUrl;
  }
}

// 获取URL的文件扩展名
export function getUrlExtension(url) {
  try {
    const urlObj = new URL(url);
    const path = urlObj.pathname;
    const match = path.match(/\.([^.\/\?#]+)$/);
    return match ? match[1] : '';
  } catch (error) {
    return '';
  }
}

// 移除URL的查询参数
export function removeUrlParams(url) {
  try {
    const urlObj = new URL(url);
    urlObj.search = '';
    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

// 移除URL的哈希
export function removeUrlHash(url) {
  try {
    const urlObj = new URL(url);
    urlObj.hash = '';
    return urlObj.toString();
  } catch (error) {
    return url;
  }
}

// 获取URL的根域名
export function getRootDomain(url) {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;
    const parts = hostname.split('.');
    
    if (parts.length <= 2) {
      return hostname;
    }
    
    // 对于常见的二级域名，返回主域名
    if (parts.length > 2) {
      const secondLevelDomains = ['com', 'net', 'org', 'gov', 'edu', 'co'];
      if (secondLevelDomains.includes(parts[parts.length - 2])) {
        return parts.slice(-3).join('.');
      }
    }
    
    return parts.slice(-2).join('.');
  } catch (error) {
    return '';
  }
}

// 检查URL是否为同一域名
export function isSameDomain(url1, url2) {
  try {
    const domain1 = new URL(url1).hostname;
    const domain2 = new URL(url2).hostname;
    return domain1 === domain2;
  } catch (error) {
    return false;
  }
}

// 编码URL组件
export function encodeUrlComponent(str) {
  try {
    return encodeURIComponent(str);
  } catch (error) {
    return str;
  }
}

// 解码URL组件
export function decodeUrlComponent(str) {
  try {
    return decodeURIComponent(str);
  } catch (error) {
    return str;
  }
}

// 编码整个URL
export function encodeUrl(url) {
  try {
    return encodeURI(url);
  } catch (error) {
    return url;
  }
}

// 解码整个URL
export function decodeUrl(url) {
  try {
    return decodeURI(url);
  } catch (error) {
    return url;
  }
}