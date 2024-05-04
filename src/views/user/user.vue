<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.useNo" placeholder="员工工号" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-input v-model="listQuery.usename" placeholder="员工姓名" style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" style=" margin: 5px 8px 5px 0">
        搜索
      </el-button>
      <el-button class="filter-item" type="primary" icon="el-icon-edit" style="margin: 5px 8px 5px 0">
        增加
      </el-button>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-download" style="margin: 5px 8px 5px 0">
        导出
      </el-button>
    </div>

    <!-- Note that row-key is necessary to get a correct row order. -->
    <el-table ref="dragTable" v-loading="listLoading" :data="list" row-key="id" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="ID" width="65">
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="userNo" width="180px" align="center" label="员工工号" />
      <el-table-column prop="username" width="180px" align="center" label="员工姓名" />
      <el-table-column prop="roles" label="角色" />
      <el-table-column prop="brands" label="管理品牌" />

    </el-table>
  </div>
</template>

<script>
import { queryUser } from '@/api/user'

export default {
  name: 'User',
  data() {
    return {
      list: null,
      total: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      sortable: null
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.listLoading = false

      // const response = await queryUser(this.listQuery)
      // console.log(response)
      const { data, total } = await queryUser(this.listQuery)
      // console.log(response)
      this.list = data
      this.total = total
      this.listLoading = false
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
