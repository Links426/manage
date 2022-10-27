<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图 -->

    <el-card class="box-card">
      <!-- 搜索与添加区 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary"> 添加用户 </el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->

      <el-table :data="userList" stripe style="width: 100%">
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="username" label="姓名">
        </el-table-column>
        <el-table-column prop="email" label="邮箱">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <el-table-column prop="role_name" label="角色">
        </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.mg_state">

            </el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="" label="操作">
          <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          <el-button type="warning" icon="el-icon-delete" size="mini"></el-button>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination :current-page="queryInfo.pagenum" :page-sizes="[1, 2, 5, 10]" :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="200">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2,
        },
        userList: [],
        total: ''
      }
    },
    created() {
      this.getUserList()

    },
    methods: {
      async getUserList() {
        let { data: res } = await this.$api.users()
        console.log(res.users);
        this.userList = res.users
        this.total = res.total
        if (res.meta.status !== 200) return
        this.$message.error('获取用户列表失败')
   
      },
    },


  }
</script>
<style lang="less" scoped>
</style>