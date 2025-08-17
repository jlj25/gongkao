// 数据导入工具函数

// 从 CSV 导入
export function importFromCSV(file) {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'text/csv') {
      reject(new Error('请选择 CSV 文件'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = event => {
      try {
        const csvData = event.target.result
        const lines = csvData.split('\n')
        
        if (lines.length < 2) {
          reject(new Error('CSV 文件内容为空'))
          return
        }
        
        // 解析表头
        const headers = lines[0].split(',').map(header => header.trim())
        
        // 解析数据行
        const data = []
        for (let i = 1; i < lines.length; i++) {
          if (!lines[i].trim()) continue
          
          const values = lines[i].split(',').map(value => {
            // 处理被引号包围的值
            if (value.startsWith('"') && value.endsWith('"')) {
              return value.substring(1, value.length - 1).replace(/""/g, '"')
            }
            return value.trim()
          })
          
          // 创建对象
          const row = {}
          headers.forEach((header, index) => {
            row[header] = values[index] || ''
          })
          
          data.push(row)
        }
        
        resolve(data)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => {
      reject(new Error('读取文件失败'))
    }
    
    reader.readAsText(file, 'UTF-8')
  })
}

// 从 Excel 导入 (简化版本，实际项目中可能需要使用专门的库如 xlsx)
export function importFromExcel(file) {
  // 这里只是一个示例，实际项目中建议使用专门的库
  return importFromCSV(file)
}

// 从 JSON 导入
export function importFromJSON(file) {
  return new Promise((resolve, reject) => {
    if (!file || file.type !== 'application/json') {
      reject(new Error('请选择 JSON 文件'))
      return
    }
    
    const reader = new FileReader()
    reader.onload = event => {
      try {
        const jsonData = JSON.parse(event.target.result)
        resolve(jsonData)
      } catch (error) {
        reject(new Error('JSON 文件格式错误'))
      }
    }
    
    reader.onerror = () => {
      reject(new Error('读取文件失败'))
    }
    
    reader.readAsText(file, 'UTF-8')
  })
}