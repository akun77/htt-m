// 封装本地存储操作

// 存储数据
export const setItem = (key, value) => {
  // 如果值是对象或者数组，用JSON进行字符串存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

// 获取数据
export const getItem = key => {
  const data = window.localStorage.getItem(key)
  // 为什么使用try catch 而不使用if 原因是因为字符串形式难以判断是否符合JSON 所以直接进行还原 如果失败 则直接返回原值
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}

// 删除数据
export const removeItem = key => {
  window.localStorage.removeItem(key)
}
