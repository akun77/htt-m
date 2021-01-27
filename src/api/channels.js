import request from '@/utils/request.js'

// 获取全部频道列表
export const getChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}
