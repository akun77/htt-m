<template>
  <div class="channel-edit">
    <!-- 我的频道 -->
    <van-cell :border="false">
      <div slot="title" class="title">我的频道</div>
      <van-button
        round
        type="danger"
        plain
        size="mini"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid :gutter="10" class="my-grid">
      <van-grid-item
        class="grid-item"
        v-for="(channel, index) in myChannels"
        :key="index"
        @click="onMyChannelClick(channel, index)"
      >
        <van-icon
          v-show="isEdit && !fiexdChannels.includes(channel.id)"
          slot="icon"
          name="clear"
        ></van-icon>
        <span
          :class="index === active ? 'active' : ''"
          slot="text"
          class="text"
          >{{ channel.name }}</span
        >
      </van-grid-item>
    </van-grid>
    <!-- 频道推荐 -->
    <van-cell :border="false">
      <div slot="title" class="title">频道推荐</div>
    </van-cell>
    <van-grid :gutter="10" class="recommends-grid">
      <van-grid-item
        class="grid-item"
        v-for="(recommendchannel, index) in recommendChannels"
        :key="index"
        :text="recommendchannel.name"
        icon="plus"
        @click="onAddChannel(recommendchannel)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getChannels } from '@/api/channels'

export default {
  name: 'ChannelEdit',
  data() {
    return {
      allChannels: [], // 全部频道列表
      isEdit: false,
      fiexdChannels: [0] // 固定频道， 不允许被删除
    }
  },
  created() {
    this.loadAllChannels()
  },
  computed: {
    // 计算数据会观测内部数据的变化 当数据发生改变的时候 会更新值
    reChannels() {
      // 1.设置一个空数组接收数据
      const channels = []
      // 2.遍历全部数据列表
      this.allChannels.forEach(channel => {
        // 3.使用find方法获取相同id的元素项 find遍历数组 找到满足条件的元素项目
        const ret = this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
        // 4.如果我的频道中不包含该频道，则收集到推荐频道
        if (!ret) {
          channels.push(channel)
        }
      })
      return channels
    },
    recommendChannels() {
      // filter遍历数组 符合条件的元素存储到新数组并且返回 在内部创建了一个新数组
      return this.allChannels.filter(channel => {
        // 把符合条件的第一个元素返回 取非！
        return !this.myChannels.find(myChannel => {
          return myChannel.id === channel.id
        })
      })
    }
  },
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  methods: {
    // 获取全部频道列表
    async loadAllChannels() {
      try {
        const { data } = await getChannels()
        console.log(data)
        this.allChannels = data.data.channels
      } catch (error) {
        console.log(error)
      }
    },
    // 添加频道
    onAddChannel(recommendchannel) {
      this.myChannels.push(recommendchannel)
    },
    // 我的频道点击事件
    onMyChannelClick(channel, index) {
      if (this.isEdit) {
        // 判断是否是第一个元素 如果是 直接停止
        if (this.fiexdChannels.includes(channel.id)) {
          return
        }
        if (index <= this.active) {
          this.$emit('updateActive', this.active - 1, true)
        }
        // 编辑状态下，进行删除
        // splice参数1：要删除元素的索引 包括本身
        // splice参数2：要删除的个数
        this.myChannels.splice(index, 1)
      } else {
        // 非编辑状态下，进行切换
        this.$emit('updateActive', index, false)
      }
    }
  }
}
</script>

<style scoped lang="less">
.channel-edit {
  margin: 85px 0;
  .title {
    font-size: 32px;
    color: #333333;
  }
  .edit-btn {
    width: 104px;
    height: 48px;
    line-height: 48px;
    font-size: 26px;
    color: #f85959;
    border: 1px solid #f85959;
  }
  /deep/.grid-item {
    width: 160px;
    height: 86px;
    .van-grid-item__content {
      white-space: nowrap;
      background-color: #f4f5f6;
      .van-grid-item__text,
      .text {
        margin: unset;
        font-size: 28px;
        color: #222222;
      }
      .active {
        color: red;
      }
    }
  }
  /deep/.recommends-grid {
    .grid-item {
      .van-grid-item__content {
        flex-direction: row;
        .van-icon-plus {
          font-size: 24px;
          margin-right: 6px;
        }
      }
    }
  }
  /deep/.my-grid {
    .van-grid-item__icon-wrapper {
      position: unset;
      .van-icon-clear {
        position: absolute;
        right: -14px;
        top: -12px;
        font-size: 30px;
        color: #cacaca;
        z-index: 2;
      }
    }
  }
}
</style>
