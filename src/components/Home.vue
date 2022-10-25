<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <!-- el-header 可以作为一个类名 -->
    <el-header>
      <div>
        <img src="../assets/heima.png" alt="" />
        <span>电商后台管理系统</span>
      </div>

      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <!-- 三元运算符,如果折叠,就是64px,如果不是,就是200px -->

      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>

        <!-- 侧边栏菜单 -->
        <!-- 这里设置属性都是以字符串的形式设置的,但是collapse需要一个布尔值,因此需要在前面加一个冒号,这样就可以让这个属性由js来加载,就可以正常使用布尔值了 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#4380ff"
          unique-opened
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <!-- 如果index一样,那么如果点击一个,所有的都会下拉 -->
          <!-- 对index进行动态绑定,加上一个“:”,但是index只能接收字符串,不能接收数值,所以在后面+'' 加上一个空的字符串,来进行类型转换-->
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <!-- 一级菜单的模版区 -->
            <template slot="title">
              <!-- i 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <!-- span文本 -->
              <span>{{ item.authName }}</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item
              :index="'/' + subitem.path + ''"
              v-for="subitem in item.children"
              :key="subitem.id"
              @click="saveNavState('/' + subitem.path)"
            >
              <template slot="title">
                <!-- 保存导航链接状态 -->
                <!-- i 图标 -->
                <i class="el-icon-menu"></i>
                <!-- span文本 -->
                <span>{{ subitem.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
export default {
  created() {
    // 在组件一加载时,就执行create的生命周期函数; 渲染左侧菜单
    this.getMenuList(),
      (this.activePath = window.sessionStorage.getItem('activePath'))
  },
  data() {
    return {
      // 左侧菜单
      menuList: [],
      //   通过每个id设置对应的icon类
      iconsObj: {
        125: 'iconfont icon-users',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-danju',
        102: 'iconfont icon-shangpin',
        145: 'iconfont icon-baobiao',
      },
      isCollapse: false,
      //   激活链接地址
      activePath: '',
    }
  },

  name: 'home',
  methods: {
    logout() {
      // 清除本地token
      window.sessionStorage.clear()
      // 跳转回登陆页
      this.$router.push('/login')
    },
    // 获取所有的菜单
    async getMenuList() {
      // 通过结构赋值,获取data里面的详细值
      const { data: res } = await this.$api.menus()
      //如果请求失败,就把meta里面的请求失败信息提示出来

      if (res.meta.status !== 200) return
      this.menuList = res.data
    },
    // 点击按钮,切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // activePath接收传参
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      //   点击之后,为activePath重新赋值
      this.activePath = activePath
    },
  },
}
</script>
<style lang="less" scope>
/* 让整个页面布满全屏 */
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  /* align-items 弹性容器内的项目指定默认对齐方式,默认stretch,项目被拉伸来适合容器 ,center 项目位于容器的中央*/
  /*这里设置align-items:center 使得按钮位于顶部栏中央*/
  align-items: center;
  color: #fff;
  font-size: 20px;

  /* 给左边的div也设置一个flex(使得左边两个元素全部居中对齐), align-items 必须flex布局才能设置 */
  div {
    display: flex;
    align-items: center;

    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #eaedf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #4a5064;
  color: #fff;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  /*设置字间距*/
  letter-spacing: 0.2em;
  cursor: pointer;
}
</style>