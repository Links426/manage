<template>
    <div>
        <!-- 面包屑导航区 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <!-- 添加角色按钮 -->
            <el-row>
                <el-col>
                    <el-button type="primary" @click="addDialogVisiable = true">添加角色</el-button>
                </el-col>
            </el-row>

            <!-- 角色列表 -->

            <el-table :data="roleList" border stripe>



                <!-- 展开列 -->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <!-- pre标签,将整个数据分行展示 -->
                        <!-- 栅格系统布局 -->
                        <!-- 给行 动态绑定样式,通过三元表达式 -->
                        <el-row v-for="(item1,i1) in scope.row.children" :key="item1.id"
                            :class="['bdBottom','leftMargin',i1===0? 'bdTop':'','vcenter']">
                            <!-- 渲染一级权限 -->
                            <el-col :span="5">
                                <el-tag closable @close="removeRightById(scope.row.id,item1.id)">
                                    {{item1.authName}}
                                </el-tag> <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!-- 渲染二级权限 -->
                            <el-col :span="19">
                                <!-- 通过for循环嵌套渲染二级权限 -->
                                <el-row v-for="(item2,i2) in item1.children" :key="item2.id"
                                    :class="[i2 !== 0 ? 'bdBottom':'','vcenter']">
                                    <el-col :span="6">
                                        <el-tag type="success" closable @close="removeRightById(scope.row.id,item2.id)">
                                            {{item2.authName}}</el-tag> <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row v-for="(item3,i3) in item2.children" :key="item3.id">
                                            <el-tag type="warning" closable
                                                @close="removeRightById(scope.row.id,item3.id)">{{item3.authName}}
                                            </el-tag>
                                        </el-row>
                                    </el-col>
                                </el-row>


                            </el-col>
                            <!-- 渲染三级权限 -->
                        </el-row>
                        <pre>
                        </pre>
                    </template>
                </el-table-column>
                <!-- 索引列 -->
                <el-table-column type="index"></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">
                            编辑
                        </el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="delDialogClosed(scope.row)">
                            删除</el-button>
                        <el-button type="warning" icon="el-icon-setting" size="mini" @click="showSetRightDialog(scope.row)">分配权限
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!-- 添加用户对话框 -->
            <el-dialog title="添加用户" :visible.sync="addDialogVisiable" width="50%" @close="addDialogClosed">
                <!-- 内容主体 -->
                <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="addForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input v-model="addForm.password" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input v-model="addForm.email"></el-input>
                    </el-form-item>
                    <el-form-item label="手机" prop="moible">
                        <el-input v-model="addForm.moible"></el-input>
                    </el-form-item>
                </el-form>
                <!-- ref 引用名称 -->


                <!-- 底部区域 -->
                <span slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisiable = false">取 消</el-button>
                    <el-button type="primary" @click="addUser">确 定</el-button>
                </span>
            </el-dialog>


            <!-- 修改用户对话框 -->
            <el-dialog title="编辑用户" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
                <el-form ref="editFormRef" :model="editForm" label-width="70px">
                    <el-form-item label="用户名">
                        <!-- 禁用输入 -->
                        <el-input v-model="editForm.roleName"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                        <!-- 禁用输入 -->
                        <el-input v-model="editForm.roleDesc"></el-input>
                    </el-form-item>

                </el-form>

                <span slot="footer" class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editUserInfo">确 定</el-button>
                </span>
            </el-dialog>

            <el-dialog title="删除提示" :visible.sync="delDialogVisible" width="50%">
               
                <span slot="footer">
                    <el-button @click="delDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="delDialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>

            <!-- 分配权限对话框 -->

            <el-dialog title="提示" :visible.sync="setRightDialogVisible" width="50%" @close="setRightDialogClosed">
                <!-- Tree 树形控件 -->
                <el-tree :data="rightslist" :props="treeProps" ref="treeRef" show-checkbox node-key="id" default-expand-all :default-checked-keys="defKeys"></el-tree>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="setRightDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="allotRights()">确 定</el-button>
                </span>
            </el-dialog>




        </el-card>



    </div>
</template>
<script>
    export default {
        data() {
            // 验证邮箱的规则
            var checkEmail = (rule, value, cb) => {
                // 验证邮箱的正则表达式
                const regEmail = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/
                // 合法邮箱
                if (!regEmail.test(value)) {
                    // 如果不满足.就通过回掉提示错误信息
                    cb(new Error('请输入合法的邮箱'))
                }
            }
            // 验证手机号的规则
            var checkMobile = (rule, value, cb) => {
                const regMobile = /^[1][3,4,5,7,8][0-9]{9}$/
                if (!regMobile.test(value)) {
                    cb(new Error('请输入合法的手机'))
                }
            }



            return {
                // 所有角色列表数据
                roleList: [],
                // 控制添加用户对话框的显示与隐藏
                // 修改用户对话框
                editDialogVisible: false,
                editForm: {},
                delDialogVisible: false,
                // 控制分配权限对话框
                setRightDialogVisible: false,
                addDialogVisiable: false,
                setRightDialogVisible:false,
                // 添加用户的表单数据
                addForm: {
                    username: '',
                    password: '',
                    email: '',
                    moible: ''
                },
                addFormRules: {
                    username: [{ required: true, message: '请输入活动名称', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }],
                    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' },
                    { validator: checkEmail, trigger: "blur" }
                    ],
                    moible: [{ required: true, message: '请输入手机号', trigger: 'blur' }, { validator: checkMobile, trigger: "blur" }
                        // 通过validator来指定具体的自定义校验规则
                    ]
                },// 添加表单的验证规则对象

                rightslist:[],
                treeProps:{
                    label:'authName',
                    children:'children',
                },
                // 默认选中的节点ID值数组
                defKeys:[],
                // 选中分配权限的用户id
                roleId:''
            }
        },
        created() {
            this.getRolesList()
        },
        methods: {
            async getRolesList() {
                const { data: res } = await this.$api.roles()

                if (res.meta.status !== 200) {
                    return this.$message.error('获取角色列表失败')
                }
                this.roleList = res.data
            },
            // 监听添加用户窗口关闭
            addDialogClosed() {
                // 通过refs引用,调用resetFields来重新设置表单数据
                this.$refs.addFormRef.resetFields()
            },
            async addUser() {
                // 进行表单校验

                // 发起添加请求
                const { data: res } = await this.$api.addRoles(this.addForm.username)

                if (res.meta.status !== 201) { return this.$message.error('添加失败') }
                this.$message.success('添加成功')

                // 关闭对话框
                this.addDialogVisiable = false
                //刷新列表           
                this.getRolesList()
            },
            // 展示编辑用户的对话框
            async showEditDialog(id) {
                this.editDialogVisible = true
                const { data: res } = await this.$api.checkRoles(id)
                if (res.meta.status !== 200) {
                    return
                    this.$message.error('获取失败')
                }
                this.editForm = res.data

                


            },
            editDialogClosed() {
                // 重置表单
                this.$refs.editFormRef.resetFields()
            },
            async editUserInfo() {
                this.editDialogVisible = false
                const ls = await this.$api.publishRoles(this.editForm.roleId, this.editForm.roleName, this.editForm.roleDesc)
                this.getRolesList()
            },

            async delDialogClosed(id) {
                this.delDialogVisible = true
                
                const { data: res } = await this.$api.delRoles(id)
                if (res.meta !== 200) {
                    return
                    this.$message.error('删除失败')
                }
                this.getRolesList()
            },
            async removeRightById(role, rightId) {
                // 弹窗提示是否删除
                // 结果会返回一个confirm或者cancel

                const confirmResult = await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).catch(err => err)

                if (confirmResult !== 'confirm') {
                    return this.$message.info('取消了删除')
                }
                console.log('确定了删除');
                // console.log(info);
                const { data: res } = await this.$api.delRights(role.id, rightId)

                // role.children = res.data
                //    把服务器返回的数据直接设置为children属性,避免整个页面的刷新

            },


            async showSetRightDialog(role) {
                // 获取即将分配权限的id
                this.roleId = role.id
                // 获取权限的数据
                const {data:res} = await this.$api.getRolesTree()
                if(res.meta.status !== 200) {
                    return this.$message.error('获取失败')
                }                
                // 把获取出来的数据保存到本地
                this.rightslist = res.data
                this.setRightDialogVisible = true
                this.getLeafKeys(role,this.defKeys)

            },

            // 通过递归的方式获取选中的id(没有children的就是三级权限),并保存到数组中
            getLeafKeys(node,arr){
                if(!node.children) {
                    // 一定要return返回操作
                  return arr.push(node.id)
                }
                node.children.forEach(item => {
                    this.getLeafKeys(item,arr)
                });
               
            },
            // 在页面关闭以后,防止递归进数组的数据越来越多,所以在每次关闭后,都要对数组进行清空
            setRightDialogClosed(){
                this.defKeys = []
            },
            // 点击为角色分配权限
            async allotRights(){

                this.setRightDialogVisible = false
                // 获取选中的id
                // 通过展开运算符,放入数组中
                // 把两个数组合成为一个新数组
                const keys = [
                    ...this.$refs.treeRef.getCheckedKeys(),
                    ...this.$refs.treeRef.getHalfCheckedKeys()
                ]
                // 将数组转为以逗号分隔的字符串
                const resId = keys.join(',')
                
                
               const {data:res} = await this.$api.rolesRight(this.roleId,resId)
               if(res.meta.status !== 200) {
                return this.$message.error('获取失败')
               }
               this.$message.success('分配权限成功')
               this.getRolesList()
            }
        },



    }
</script>
<style lang="less" scoped>
    .el-tag {
        margin: 7px;
    }

    .leftMargin {
        margin-left: 30px;
    }

    .bdTop {
        border-top: 1px solid #eee;
    }

    .bdBottom {
        border-bottom: 1px solid #eee;
    }

    .vcenter {
        display: flex;
        align-items: center;
    }
</style>