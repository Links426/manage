<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avater_box">
        <img src="../assets/logo.png" alt="" />
      </div>

      <!-- 登陆表单区域 -->
      <!-- 给这个表单绑定一个数据集合,在每一个input中绑定相应的每一项 -->
      <!-- 给表单增加一个ref的属性,获取整个表单的实例对象 ,以此来给整个表单添加重置事件 -->
      <!-- ref 被用来给元素或子组件注册引用信息 -->

      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <el-form-item prop="username">
          <!-- 用户名 -->
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-user"
          ></el-input>
        </el-form-item>

        <!-- 密码 -->

        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-3702mima"
            type="password"
          ></el-input>
        </el-form-item>

        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      // 这是登陆表单的数据绑定对象
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      // 表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur',
          },
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '长度在 6 到 15 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    // 点击重置按钮
    resetLoginForm() {
      // 使用form的method方法来清除表单
      // ref可以调用组件中的方法：
      this.$refs.loginFormRef.resetFields()
    },
    login() {
      // validate官方文档中,自身使用有回调函数
      // 在紧挨着await的函数添加一个async,把它变成一个异步任务
      this.$refs.loginFormRef.validate(async (valid) => {
        // 最后返回一个valid,是一个布尔值
        // 如果valid为false,返回
        if (!valid) return
        // 发起请求

        //  ls的返回值是promise,因此可以用await和async来简化promise操作
        const { data: res } = await this.$api.login(
          this.loginForm.username,
          this.loginForm.password
        )
        if (res.meta.status !== 200) return this.$message.error('登陆失败')
        this.$message.success('登陆成功')
        // console.log(res)
        // 把token保存到sessionStorage(仅会话期间生效)
        window.sessionStorage.setItem('token', res.data.token)
        // 进行路由跳转
        this.$router.push('/home')
      })
    },
  },
}
</script>
<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  /* 设置绝对定位就能进行位置移动 */
  /* 通过transform translate 垂直水平剧中 */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avater_box {
    /*绝对定位 垂直居中摆放*/
    position: absolute;
    left: 50%;

    transform: translate(-50%, -50%);

    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    /* padding让图片和边框之间有一些间隙 */
    padding: 10px;
    /*  给头像加一个阴影*/
    box-shadow: 0 0 10px #ddd;
    /*因为阴影是透明的,所以要给头像加一个白色的背景*/
    background-color: #fff;
    img {
      width: 100%;
      border-radius: 50%;
      /*给图片加一个背景,让图片更好看一点*/
      background-color: #eee;
    }
  }
}

.btns {
  display: flex;
  /*剧右对齐(尾部对齐)*/
  justify-content: flex-end;
}

.login_form {
  /*绝对定位,调整位置*/
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  /*form表单默认box-sizing是content;这里设置成borderbox,输入框就不会出来
  
  box-sizing=content 标准盒模型,在宽高之外绘制边距

  box-sizing=border-box IE盒模型,在宽高之内绘制,已得到的内容,需要减去边距,才是他真正的宽高
  
  */
  box-sizing: border-box;
}
</style>