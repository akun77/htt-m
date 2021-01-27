import Vue from 'vue'
// 引入dayjs
import dayjs from 'dayjs'
// 加载中文
require('dayjs/locale/zh-cn')
//配置语言为中文
dayjs.locale('zh-cn')
import relativeTime from ('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)

Vue.filter('relativeTime',(value)=>{
  
} )