import Vue from 'vue'
import dayjs from 'dayjs'

// 加载中文语言包
import 'dayjs/locale/zh-cn'
// 加载相对时间的插件
import relativeTime from 'dayjs/plugin/relativeTime'
// import relativeTime from 'dayjs/plugin/relativeTime'
// 配置使用处理相应时间的插件
dayjs.extend(relativeTime)
// 配置语言为中文
dayjs.locale('zh-cn')

// 定义过滤器
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
