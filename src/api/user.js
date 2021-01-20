import request from '@/utils/request.js'
// import store from '@/store'

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

// 获取用户个人资料
export const getUser = () => {
  return request({
    method: 'get',
    url: '/app/v1_0/user'
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  })
}
