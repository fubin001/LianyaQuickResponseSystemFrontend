<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.useNo" placeholder="员工工号" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.usename" placeholder="员工姓名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0" @click="getList(1)">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin: 5px 8px 5px 0" @click="beforeCreate">
        增加
      </el-button>
    </div>

    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row>
      <el-table-column align="center" label="ID" prop="id" width="65" />
      <el-table-column prop="userNo" width="180px" align="center" label="员工工号" />
      <el-table-column prop="username" width="180px" align="center" label="员工姓名" />
      <el-table-column prop="roles" label="角色">
        <template slot-scope="{row}">
          <el-tag v-for="role in row.roles" :key="role" style="margin: 2px 2px" type="danger"> {{ role }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="brands" label="管理品牌">
        <template slot-scope="{row}">
          <el-tag v-for="brand in row.brands" :key="brand" style="margin: 2px 2px"> {{ brand }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" min-width="200" class-name="small-padding fixed-width">
        <template slot-scope="{row}">
          <el-button type="warning" size="mini" @click="beforeUpdate(row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="deleteUser(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-sizes="[10, 20, 50, 100]"
      :current-page="page"
      :page-size="size"
      align="center"
      @size-change="getList(page)"
      @current-change="getList(page)"
    />

    <el-dialog :title="titleMap[dialogStatus]" :visible.sync="dialogFormVisible" width="500px">
      <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 300px; margin-left:50px;">
        <el-form-item label="员工工号" prop="userNo">
          <el-input v-if="dialogStatus==='create'" v-model="temp.userNo" style="width: 300px" />
          <el-input v-else v-model="temp.userNo" style="width: 300px" disabled />
        </el-form-item>
        <el-form-item label="员工姓名" prop="username">
          <el-input v-model="temp.username" style="width: 300px" />
        </el-form-item>

        <el-form-item v-if="dialogStatus === 'create'" label="登陆密码">
          <el-input v-model="temp.password" show-password style="width: 300px" />
        </el-form-item>

        <el-form-item label="负责品牌">
          <el-select v-model="temp.brandIds" class="filter-item" multiple clearable filterable placeholder="请选择" style="width: 300px">
            <el-option v-for="item in brands" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="管理权限">
          <el-select v-model="temp.roleIds" class="filter-item" multiple clearable filterable placeholder="请选择" style="width: 300px">
            <el-option v-for="item in roles" :key="item.name" :label="item.name" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="createOrUpdateUser(dialogStatus, temp)">
          确定
        </el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import { createOrUpdate, deleteUserById, queryUser } from '@/api/user'
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
        'create': '新增用户',
        'update': '编辑用户'
      },
      sortable: null,
      temp: {},
      brands: [],
      roles: []
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
      deleteUserById(row.id).then(res => {
        if (res.data) {
          this.$message.success('删除成功')
          this.getList(this.page)
        } else {
          this.$message.error('删除失败')
        }
      })
    },

    createOrUpdateUser(status, data) {
      if (status === 'create') {
        data.id = null
      }
      createOrUpdate(data).then(res => {
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
.sortable-ghost{
  opacity: .8;
  color: #fff!important;
  background: #42b983!important;
}
</style>

<style scoped>
.icon-star{
  margin-right:2px;
}
.drag-handler{
  width: 20px;
  height: 20px;
  cursor: pointer;
}
.show-d{
  margin-top: 15px;
}
</style>
