<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="isRefreshLoding"
      :success-text="refreshSuccessText"
      :success-duration="1500"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <articleItem
          v-for="(article, index) in list"
          :key="index"
          :article="article"
        ></articleItem>
        <!-- <van-cell
          v-for="(article, index) in list"
          :key="index"
          :title="article.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article-item'

export default {
  name: 'article-list',
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      isRefreshLoding: false,
      timestamp: null, // 时间戳
      error: false, // 控制列表加载失败的状态
      refreshSuccessText: ''
    }
  },
  props: {
    channel: {
      type: Object,
      requierd: true
    }
  },
  components: {
    articleItem: ArticleItem
  },
  methods: {
    async onLoad() {
      // 1.异步更新数据
      try {
        const { data } = await getArticles({
          // 当前表单的数据数据
          channel_id: this.channel.id,
          // 时间戳 可以根据时间获取列表
          timestamp: this.timestamp || Date.now(),
          // 是否需要置顶
          with_top: 0
        })
        console.log(data)
        // 模拟随机失败的情况

        // if (Math.random() > 0.5) {
        //   JSON.parse('ewqewqeqwe')
        // }

        // 2.把请求结果放进lIST数组
        const { results } = data.data
        // ...将两组数据展开合并
        this.list.push(...results)
        // 3.本次数据结束之后 将加载状态结束
        this.loading = false
        // 4.判断数据是否加载完成
        if (results.length) {
          // 更新获取下一页时间戳
          this.timestamp = data.data.pre_timestamp
        } else {
          // 没有数据了
          this.finished = true
        }
      } catch (error) {
        console.log('数据出错', error)
        this.error = true
        this.loading = false
      }
    },
    async onRefresh() {
      // 请求获取数据
      try {
        // if (Math.random() > 0.5) {
        //   JSON.parse('ewqewqeqwe')
        // }
        const { data } = await getArticles({
          // 当前表单的数据数据
          channel_id: this.channel.id,
          // 时间戳  获取最近数据
          timestamp: Date.now(),
          // 是否需要置顶
          with_top: 0
        })
        const { results } = data.data
        // 将数据追加到列表的顶部
        this.list.unshift(...results)
        // 关闭下拉刷新
        this.isRefreshLoding = false
        // 刷新成功提示文本
        this.refreshSuccessText = `刷新成功，更新了${results.length}条数据`
      } catch (error) {
        this.refreshSuccessText = '刷新失败'
        this.isRefreshLoding = false
      }

      // 重新加载数据
      // 将 loading 设置为 true，表示处于加载状态
    }
  }
}
</script>
<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
