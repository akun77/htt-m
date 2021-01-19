import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage.js'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    // user 存储TOKEN数据
    // user: null
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    // 使用封装进行保存
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser(state, data) {
      // 保存TOKEN
      state.user = data
      // 为了防止刷新丢失 将数据备份到本地
      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {},
  modules: {}
})
