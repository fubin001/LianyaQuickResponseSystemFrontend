<template>
  <div class="app-container">
    <div class="filter-container">
      <span>
        工号：
        <el-input v-model="search.userNo" placeholder="请输入查询工号" @input="on_getUserApplyOfrList()"
          style="width: 150px; margin: 5px 8px 5px 0" class="filter-item" />
      </span>
      <span style="float: right">

        <el-button class="filter-item" type="primary" icon="el-icon-search"
          style="margin: 3px 5px; background-color: #244496" @click="on_getUserApplyOfrList()">
          搜索
        </el-button>
      </span>
    </div>
    <template>
      <!-- <el-input v-model="search.userNo" placeholder="请输入查询工号" @input="
        on_getUserApplyOfrList()"></el-input> -->
      <el-table :data="userApplyOfrList" row-key="id" :header-cell-style="{ background: '#e4e7f0' }" fit
        highlight-current-row style="width: 100%">
        <el-table-column label="申请账号" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.userNo }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请用户名" width="180">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="申请角色" width="700">
          <template slot-scope="scope">
            <el-tag v-for="item in scope.row.roleList" :key="item.name" closable :type="item.name"
              @close="handleClose(scope.row.id, item.id)">
              {{ item.name }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="success" @click="on_newUserBecome(scope.row)">通过</el-button>
            <el-button size="mini" type="danger" @click="on_delUserApplyFor(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="search.current"
      :page-sizes="[10, 20, 30, 100]" :page-size="search.size" layout="total, sizes, prev, pager, next, jumper"
      :total="search.total">
    </el-pagination>
  </div>
</template>

<script>
import { updUserApplyFor, getUserApplyOfrList, newUserBecome, delUserApplyForRole, delUserApplyFor } from "@/api/user";

export default {
  name: "用户申请",
  data() {
    return {
      formData: {},
      userApplyOfrList: [],
      search: {
        userName: '',
        userNo: '',
        current: 0,
        size: 10,
        total: 0,
      }, sy: {
        uid: 1,
        size: 1,
        current: 10,
      },
      dataList: [],
      dojon: "",
      updUser: {
        id: 10018,
        userNo: '',
        userName: '',
        password: '',
        userType: 2,
        roleList: [1, 2],
      },
    };
  },
  created() {
    this.on_getUserApplyOfrList();
    // this.on_updUserApplyFor();
  },
  methods: {
    //获取申请用户
    on_getUserApplyOfrList() {
      getUserApplyOfrList(this.search).then((res) => {
        this.userApplyOfrList = res.data.records
        this.search.total = res.data.total
        console.log("199", res.data.list);
      })
    },
    //通过申请
    on_newUserBecome(data) {
      console.log(data);
      console.log(data.id);
      newUserBecome({ id: data.id }).then((res) => {
        if (res.data) {
          if (res.data) {
            this.$message.success('成功')
            this.getList(this.page)
          } else {
            this.$message.error('失败')
          }
        }
      }).finally(() => {
        this.on_getUserApplyOfrList()
      })
    },
    //修改用户申请
    on_updUserApplyFor() {
      updUserApplyFor(this.updUser).then((res) => {

      }).finally(() => {
        this.on_getUserApplyOfrList()
      })
    },
    //删除用户申请的权限
    handleClose(uid, rid) {
      console.log(uid, rid);
      delUserApplyForRole({ uid: uid, rid: rid }).then((res) => {

      }).finally(() => {
        this.on_getUserApplyOfrList()
      })
    },
    //取消该用户的申请
    on_delUserApplyFor(id) {
      delUserApplyFor({ id: id }).then((res) => {

      }).finally(() => {
        this.on_getUserApplyOfrList()
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.search.size = val
      this.on_getUserApplyOfrList()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.search.current = val
      this.on_getUserApplyOfrList()
    },
  },
};
</script>


<style>
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
</style>

<style lang="scss" scoped>
.app-container {
  background-color: #f7f8fc;

  .filter-container {
    background-color: #ffffff;
    padding: 10px;
    margin-bottom: 10px;
  }

  .table-list {
    background-color: #ffffff;
    padding: 10px;
  }
}

.icon-star {
  margin-right: 2px;
}

.drag-handler {
  width: 20px;
  height: 20px;
  cursor: pointer;
}

.show-d {
  margin-top: 15px;
}
</style>