<template>
  <div >
    <button @click="on_getRoleBrand">获取</button>
  </div>
</template>
<script>
import { createOrUpdate, deleteUserById, queryUser,getRoleBrand } from '@/api/user'
import { getBrandEnum, getRoleEnum } from '@/api/enum'

export default {
  name: 'User',
  data() {
    return {
      dialogStatus: 'create',
      dialogFormVisible: false,
      page: 1,
      size: 10,
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10
      },
      titleMap: {
        create: '新增用户',
        update: '编辑用户'
      },
      sortable: null,
      temp: {},
      brands: [],
      roles: [],
      roleBrand:{
        sizePage:10,
        currentPage:1,
      }
    }
  },
  created() {
    this.getBrands()
    this.getRoles()
    this.getList(1)
  },
  methods: {
    async getList(page) {
      this.listQuery.page = page
      this.listQuery.size = this.size
      this.listLoading = true
      const { data, total } = await queryUser(this.listQuery)
      this.list = data
      this.total = total
      this.listLoading = false
    },

    beforeCreate() {
      this.temp = {}
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },

    beforeUpdate(row) {
      this.temp = JSON.parse(JSON.stringify(row))
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },

    async getBrands() {
      const { data } = await getBrandEnum()
      this.brands = data
    },

    async getRoles() {
      const { data } = await getRoleEnum()
      this.roles = data
    },

    deleteUser(row) {
      deleteUserById(row.id).then((res) => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getList(this.page)
        } else {
          this.$message.error('删除失败')
        }
      })
    },

    on_getRoleBrand(){
      getRoleBrand(this.roleBrand).then((res)=>{
        console.log(res);
      }).catch((error)=>{

      }).finally({

      })
    },

    createOrUpdateUser(status, data) {
      if (status === 'create') {
        data.id = null
      }
      createOrUpdate(data).then((res) => {
        if (res.data) {
          this.$message.success('操作成功')
          this.getList(this.page)
        }
        this.dialogFormVisible = false
      })
    }
  }
}
</script>

  <style>
  </style>
