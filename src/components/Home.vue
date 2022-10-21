<template>
  <div>
    <el-button type="info" @click="logout">退出</el-button>
  </div>
</template>
<script>
export default {
  name: 'home',
  methods: {
    logout() {
      // 清除本地token
      window.sessionStorage.clear()
      // 跳转回登陆页
      this.$router.push('/login')
    },
  },
}
</script>
<style lang="less" scope>
</style>