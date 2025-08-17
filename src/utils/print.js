// 打印工具函数

// 打印指定元素
export function printElement(element) {
  if (!element) return
  
  // 保存原始样式
  const originalStyle = element.style.cssText
  
  // 设置打印样式
  element.style.position = 'absolute'
  element.style.left = '0'
  element.style.top = '0'
  element.style.width = '100%'
  element.style.height = 'auto'
  element.style.margin = '0'
  element.style.padding = '20px'
  
  // 创建打印窗口
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>打印</title>
        <style>
          body { margin: 0; padding: 20px; }
          * { font-family: Microsoft Yahei, sans-serif; }
        </style>
      </head>
      <body>
        ${element.outerHTML}
      </body>
    </html>
  `)
  
  printWindow.document.close()
  printWindow.focus()
  
  // 打印完成后恢复原始样式
  printWindow.onload = () => {
    printWindow.print()
    printWindow.close()
    element.style.cssText = originalStyle
  }
}

// 打印表格
export function printTable(tableElement) {
  if (!tableElement || tableElement.tagName.toLowerCase() !== 'table') return
  
  // 创建打印窗口
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>打印表格</title>
        <style>
          body { margin: 0; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #000; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
        </style>
      </head>
      <body>
        ${tableElement.outerHTML}
      </body>
    </html>
  `)
  
  printWindow.document.close()
  printWindow.focus()
  
  // 打印
  printWindow.onload = () => {
    printWindow.print()
    printWindow.close()
  }
}