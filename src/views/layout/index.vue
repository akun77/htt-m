<template>
  <div class="layout-container">
    <!-- 路由占位符 -->
    <router-view></router-view>
    <!-- 标签栏 -->
    <van-tabbar route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont iconshouye"></i>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont iconwenda"></i>
        <span class="text">问答</span>
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont iconshipin"></i>
        <span class="text">视频</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my" v-if="user">
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">我的</span>
      </van-tabbar-item>
      <van-tabbar-item to="/my" v-else>
        <i slot="icon" class="iconfont iconwode"></i>
        <span class="text">未登录</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// import { mapState } from '@/store'
export default {
  name: 'LayoutIndex',
  data() {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>
<style lang="less">
.layout-container {
  .iconfont {
    font-size: 40px;
  }
  .text {
    font-size: 20px;
  }
}
</style>
