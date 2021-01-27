import request from '@/utils/request.js'

// 获取全部频道列表
export const getChannels = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/channels'
  })
}

// 添加用户频道列表
export const addUserChannels = channel => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channel]
    }
  })
}

// 删除指定用户频道
export const deleteUserChannels = channelId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/channels/${channelId}`
  })
}
