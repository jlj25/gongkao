// 图表工具函数

// 创建柱状图数据
export function createBarChartData(labels, data, options = {}) {
  return {
    labels: labels,
    datasets: [{
      label: options.label || '数据',
      backgroundColor: options.backgroundColor || 'rgba(54, 162, 235, 0.2)',
      borderColor: options.borderColor || 'rgba(54, 162, 235, 1)',
      borderWidth: options.borderWidth || 1,
      data: data
    }]
  }
}

// 创建折线图数据
export function createLineChartData(labels, data, options = {}) {
  return {
  labels: labels,
  datasets: [{
    label: options.label || '数据',
    fill: options.fill || false,
    borderColor: options.borderColor || 'rgba(54, 162, 235, 1)',
    backgroundColor: options.backgroundColor || 'rgba(54, 162, 235, 0.2)',
    borderWidth: options.borderWidth || 2,
    data: data,
    tension: options.tension || 0.1
  }]
}
}

// 创建饼图数据
export function createPieChartData(labels, data, options = {}) {
  const backgroundColors = options.backgroundColors || [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 205, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ]
  
  const borderColors = options.borderColors || [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 205, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ]
  
  return {
    labels: labels,
    datasets: [{
      label: options.label || '数据',
      data: data,
      backgroundColor: backgroundColors,
      borderColor: borderColors,
      borderWidth: options.borderWidth || 1
    }]
  }
}

// 创建图表配置
export function createChartConfig(type, data, options = {}) {
  return {
    type: type,
    data: data,
    options: {
      responsive: options.responsive !== false,
      maintainAspectRatio: options.maintainAspectRatio !== false,
      plugins: {
        legend: {
          display: options.legend !== false
        },
        title: {
          display: !!options.title,
          text: options.title
        }
      }
    }
  }
}