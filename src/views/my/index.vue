<template>
  <div class="my-container">
    <!-- 登录状态头部 -->
    <header class="login" v-if="user">
      <div class="login-info">
        <div class="left">
          <van-image
            fit="cover"
            class="head-portrait"
            round
            :src="userInfo.photo"
          />
          <span class="name">{{ userInfo.name }}</span>
        </div>
        <button class="edit-info-btn">编辑资料</button>
      </div>
      <ul class="login-buttom">
        <li class="data">
          <span class="count">{{ userInfo.art_count }}</span>
          <span class="text">头条</span>
        </li>
        <li class="data">
          <span class="count">{{ userInfo.follow_count }}</span>
          <span class="text">关注</span>
        </li>
        <li class="data">
          <span class="count">{{ userInfo.fans_count }}</span>
          <span class="text">粉丝</span>
        </li>
        <li class="data">
          <span class="count">{{ userInfo.like_count }}</span>
          <span class="text">获赞</span>
        </li>
      </ul>
    </header>
    <!-- 未登录状态头部 -->
    <header class="not-login" v-else>
      <div class="login-btn" @click="$router.push('/login')">
        <img class="img" src="@/assets/mobile.png" alt="" />
        <p class="text">登录 / 注册</p>
      </div>
    </header>
    <!-- 宫格导航 -->
    <van-grid :column-num="2" class="center-grid" clickable>
      <van-grid-item>
        <i slot="icon" class="iconfont iconshoucang"></i>
        <span slot="text" class="text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="iconfont iconlishi"></i>
        <span slot="text" class="text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 消息通知 -->
    <van-cell-group class="btnlist">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link class=" robot-btn" />
      <van-cell
        title="退出登录"
        v-if="user"
        clickable
        class="logout-btn"
        @click="logout"
      />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getUser } from '@/api/user'

export default {
  name: 'MyIndex',
  data() {
    return {
      userInfo: {} // 用户信息
    }
  },
  created() {
    // 如果用户登录了 则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    ...mapMutations(['setUser']),
    logout() {
      this.$dialog
        .confirm({
          title: '确认退出'
        })
        .then(() => {
          // on confirm
          // 确认退出 清除登录状态， 并且清空容器中的USER和 本地存储中的 user
          this.setUser(null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async loadUserInfo() {
      try {
        const { data } = await getUser()
        this.userInfo = data.data
        this.$toast('获取信息成功')
        console.log(this.userInfo)
      } catch (err) {
        this.$toast('获取用户信息失败，请稍后重试')
      }
    }
  }
}
</script>
b
<style lang="less">
.my-container {
  header {
    height: 361px;
    background: url(~@/assets/banner.png);
    background-size: cover;
  }
  .not-login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img {
      width: 132px;
      height: 132px;
    }
    .text {
      font-size: 28px;
      color: #fff;
      margin: 15px 0 0 0;
    }
  }
  .login-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 231px;
    padding: 75px 32px 22px;
    .left {
      display: flex;
      align-items: center;
      .head-portrait {
        width: 136px;
        height: 136px;
        border: 4px solid #fff;
        margin-right: 22px;
      }
      .name {
        font-size: 30px;
        color: #fff;
      }
    }
    .edit-info-btn {
      padding: 0;
      width: 118px;
      height: 33px;
      line-height: 33px;
      border: none;
      font-size: 10px;
      border-radius: 17px;
    }
  }
  .login-buttom {
    display: flex;
    color: #fff;
    .data {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 130px;
      .count {
        font-size: 36px;
      }
      .text {
        font-size: 23px;
      }
    }
  }
  .center-grid {
    margin-bottom: 10px;
    .iconfont {
      font-size: 45px;
    }
    .iconshoucang {
      color: #eb5253;
    }
    .iconlishi {
      color: #ff9d1d;
    }
    .text {
      font-size: 28px;
    }
  }
  .btnlist {
    .robot-btn {
      // margin-bottom: 10px;
      border-bottom: 10px solid #f5f7f9;
    }
    .logout-btn {
      text-align: center;
      color: #d86262;
    }
  }
}
</style>
