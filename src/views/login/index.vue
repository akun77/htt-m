<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar title="登录" class="page-nav-bar">
      <template #left>
        <van-icon name="arrow-left" @click="$router.back()" />
      </template>
    </van-nav-bar>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" ref="loginFromRef">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
      >
        <i slot="left-icon" class="iconfont iconshouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
      >
        <i slot="left-icon" class="iconfont iconyanzhengma"></i>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down
            v-if="isShowCountDown"
            :time="time"
            format="ss s"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="primary"
            native-type="button"
            @click="onSendSms"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div class="nav-buttom">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
// 注册使用api接口
import { login, sendSms } from '@/api/user.js'

export default {
  name: 'loginIndex',
  data() {
    return {
      user: {
        mobile: '13911111114', // 手机号
        code: '246810' // 验证码
      },
      // 验证规则
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
            message: '请输入正确格式'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      },
      // 倒计时时间
      time: 6 * 1000,
      // 是否展示倒计时
      isShowCountDown: false
    }
  },
  methods: {
    // 登录
    async onSubmit() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 是否禁止背景点击
        duration: 0 // 持续时长
      })
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        this.$toast.success('登录成功')
        // 登录成功返回上一页
        this.$router.back()
      } catch (error) {
        if (error.response.status === 400) {
          this.$toast.fail('手机或验证码错误')
        } else if (error.reponse.status === 507) {
          this.$toast.fail('服务器错误')
        } else {
          this.$toast.fail('未知错误，请稍后再试')
        }
      }
    },
    // 短信验证
    async onSendSms() {
      // 1.校验手机号
      try {
        await this.$refs.loginFromRef.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2.验证通过，显示倒计时
      this.isShowCountDown = true
      // 3.发送短信验证请求
      try {
        await sendSms(this.user.mobile)
        this.$toast('短信发送成功')
      } catch (err) {
        // 发送失败,关闭倒计时
        this.isShowCountDown = false
        this.$toast('短信发送失败')
        if (err.response.status === 429) {
          this.$toast('发送频发，请稍后再试')
        } else {
          this.$toast('数据错误，请稍后再试')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .iconfont {
    font-size: 37px;
    margin-right: 21px;
  }
  .send-sms-btn {
    width: 162px;
    height: 46px;
    line-height: 46px;
    font-size: 24px;
    background-color: #ededed;
    border: none;
    color: #666666;
  }
  .nav-buttom {
    margin: 53px 28px 0;
  }
}
</style>
