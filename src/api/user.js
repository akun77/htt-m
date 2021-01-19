import request from '@/utils/request.js'

// 登录
export const login = data => {
  return request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data: data
  })
}

// 短信验证
// 60s一次
export const sendSms = mobile => {
  return request({
    method: 'get',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
