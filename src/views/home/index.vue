<template>
  <div class="home-container">
    <!-- 搜索栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        round
        icon="search"
      >
        搜索
      </van-button>
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" animated swipeable v-model="active">
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChannelEditShow = true"
      >
        <i class="iconfont icongengduo"></i>
      </div>
      <div slot="nav-right" class="placeholder"></div>
      <van-tab
        v-for="(channel, index) in channels"
        :title="channel.name"
        :key="index"
      >
        <articlelist :channel="channel"></articlelist>
      </van-tab>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChannelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channelEdit
        :myChannels="channels"
        :active="active"
        @updateActive="onUpdateActive"
      ></channelEdit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/views/home/components/article-list'
import ChannelEdit from '@/views/home/components/channel-edit'

export default {
  name: 'HomeIndex',
  components: {
    articlelist: ArticleList,
    channelEdit: ChannelEdit
  },
  data() {
    return {
      channels: [],
      active: 0,
      isChannelEditShow: false // 控制弹出层的状态
    }
  },
  created() {
    this.loadChannels()
  },
  methods: {
    async loadChannels() {
      try {
        const { data } = await getUserChannels()
        console.log(data)
        this.channels = data.data.channels
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    onUpdateActive(index, isChannelEditShow = true) {
      this.active = index
      this.isChannelEditShow = isChannelEditShow
    }
  }
}
</script>
<style scoped lang="less">
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    color: #fff;
    background-color: #5babfb;
    border: none;
    font-size: 28pxv;
  }
  .van-icon {
    font-size: 32px;
  }
  /deep/ .channel-tabs {
    .van-tabs__wrap {
      height: 82px;
      position: fixed;
      top: 92px;
      left: 0;
      right: 0;
      z-index: 1;
      .van-tab {
        border-right: 1px solid #edeff3;
        min-width: 200px;
        font-size: 30px;
        color: #777;
      }
      .van-tab--active {
        color: #333;
      }
      .van-tabs__line {
        background-color: #3296fa;
        width: 31px;
        height: 6px;
        margin-bottom: 10px;
      }
    }
  }
  .hamburger-btn {
    position: fixed;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 66px;
    height: 82px;
    background-color: rgb(255, 255, 255);
    opacity: 0.902;
    i.iconfont {
      font-size: 33px;
    }
    &:before {
      content: '';
      position: absolute;
      left: 0;
      width: 2px;
      height: 100%;
      background-image: url('~@/assets/gradient-gray-line.png');
      background-size: contain;
    }
  }
  .placeholder {
    flex-shrink: 0; // 不参与FLEX布局
    width: 66px;
    height: 82px;
  }
}
</style>
