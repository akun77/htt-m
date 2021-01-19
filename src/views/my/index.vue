<template>
  <div class="my-container">
    <!-- 未登录状态 -->
    <header class="not-login">
      <div class="login-btn" @click="$router.push('/login')">
        <img class="img" src="@/assets/mobile.png" alt="" />
        <p class="text">登录 / 注册</p>
      </div>
    </header>
    <!-- 登录状态 -->
    <header class="login">
      <div class="login-info">
        <div class="left">
          <van-image
            fit="cover"
            class="head-portrait"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
          <span class="name">黑马头条号</span>
        </div>
        <button class="edit-info-btn">编辑资料</button>
      </div>
      <ul class="login-buttom">
        <li class="data">
          <span class="count">10</span>
          <span class="text">头条</span>
        </li>
        <li class="data">
          <span class="count">10</span>
          <span class="text">头条</span>
        </li>
        <li class="data">
          <span class="count">10</span>
          <span class="text">头条</span>
        </li>
        <li class="data">
          <span class="count">10</span>
          <span class="text">头条</span>
        </li>
      </ul>
    </header>
  </div>
</template>

<script>
export default {}
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
}
</style>
