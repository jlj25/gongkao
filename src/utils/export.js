// 数据导出工具函数

// 导出为 CSV
export function exportToCSV(data, filename = 'data.csv') {
  if (!data || !Array.isArray(data) || data.length === 0) return
  
  // 创建 CSV 内容
  let csvContent = ''
  
  // 添加表头
  if (data[0]) {
    const headers = Object.keys(data[0])
    csvContent += headers.join(',') + '\n'
  }
  
  // 添加数据行
  data.forEach(row => {
    const values = Object.values(row).map(value => {
      // 处理包含逗号或换行符的值
      if (typeof value === 'string' && (value.includes(',') || value.includes('\n'))) {
        return `"${value.replace(/"/g, '""')}"`
      }
      return value
    })
    csvContent += values.join(',') + '\n'
  })
  
  // 创建下载链接
  const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}

// 导出为 Excel (简化版本，实际项目中可能需要使用专门的库如 xlsx)
export function exportToExcel(data, filename = 'data.xlsx') {
  // 这里只是一个示例，实际项目中建议使用专门的库
  exportToCSV(data, filename.replace('.xlsx', '.csv'))
}

// 导出为 PDF (简化版本，实际项目中可能需要使用专门的库如 jsPDF)
export function exportToPDF(content, filename = 'data.pdf') {
  // 这里只是一个示例，实际项目中建议使用专门的库
  console.warn('PDF 导出功能需要使用专门的库，如 jsPDF')
  
  // 创建简单的文本文件作为替代
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename.replace('.pdf', '.txt'))
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}