<template>
  <div id="app">
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>
<script>

  export default {

    components: {

    },mounted() {
      this.getData()
    },
    methods: {
      getData() {
        // this.$axios.get('/api/get/user').then(res=>{
        //   console.log(res);
        // })
      }
    },
  }
</script>
<style>

</style>