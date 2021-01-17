<template>
  <div id="app">
    <h1>黑马头条</h1>
    <div class="box">123</div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped lang="less">
.box {
  width: 100px;
  height: 100px;
  background-color: pink;
}
</style>
