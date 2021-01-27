import request from '@/utils/request.js'
// import store from '@/store'

// 获取文章
export const getArticles = params => {
  return request({
    method: 'get',
    url: '/app/v1_1/articles',
    params
  })
}
