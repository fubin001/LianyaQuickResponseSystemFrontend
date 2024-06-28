<template>
    <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="auto" style="max-width: 600px"
            class="demo-ruleForm">
            <el-form-item label="工号" prop="userNo">
                <el-input v-model="ruleForm.userNo" />
            </el-form-item>
            <el-form-item label="名称" prop="userName">
                <el-input v-model="ruleForm.userName" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" />
            </el-form-item>
            <el-form-item label="申请角色" prop="roleList">
                <el-select v-model="ruleForm.roleList" placeholder="please select your zone" multiple @visible-change="on_getNewRole()"
                    style="width:300px">
                    <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import { createOrUpdate, deleteUserById, queryUser } from '@/api/user'
import { getBrandEnum, getRoleEnum } from '@/api/enum'
import { userApplyOfr } from "@/api/user";
import { getNewRole } from "@/api/role";

export default {
    name: 'register',
    data() {
        return {
            dialogStatus: 'create',
            dialogFormVisible: [],
            ruleForm: {
                userNo: '',
                userName: '',
                password: '',
                userType: 2,
                roleList: [],
            },
            searchRole:{
                name:'',
                sizePage:0, 
                currentPage:1,
            },
            roleList: [
            ],
            rules: {
                userNo: [
                    { required: true, message: '请输入注册账号', trigger: 'blur' },
                    { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
                ],
                userName: [
                    { required: true, message: '请输入注册昵称', trigger: 'blur' },
                    { min: 2, max: 7, message: '长度在 2 到 7个字符', trigger: 'blur' }
                ],
                roleList: [
                    { required: true, message: '请选择活动区域', trigger: 'change' }
                ],
                password: [
                    { required: true, message: '请输入名称', trigger: 'blur' },
                    { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
                ],

            }
        }
    },
    created() {
    },
    methods: {
        on_ss() {
            this.ruleForm.name = "65691"
        },
        //注册申请
        on_userApplyOfr() {
            console.log(1);
            userApplyOfr(this.ruleForm).then((res) => {
                if (res.data) {
                    this.$message.success("操作成功");
                    this.getList(this.page);
                }
                this.dialogFormVisible = false;
            });
        },
        on_getNewRole(){
            getNewRole(this.searchRole).then((res)=>{
                this.roleList = res.data.roleList.map(item => ({
                    ...item,
                    value: item.id,
                    label: undefined,  // 可选，如果不希望在模板中显示
                    label: item.name,
                    name: undefined,  // 可选，如果不希望在模板中显示
                }));
            })
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.on_userApplyOfr()
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }


    }
}
</script>
