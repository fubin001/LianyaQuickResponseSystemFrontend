<template>
  <div class="app-container">
    <div class="filter-container">
      品牌名：<el-input
        v-model="listQuery.name"
        placeholder="请输入品牌名"
        style="width: 150px; margin: 5px 8px 5px 0"
        class="filter-item"
      />
      <el-button
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        style="margin: 5px 8px 5px 0; background-color: #244496; float: right"
        @click="getList(1)"
      >
        搜索
      </el-button>
    </div>

    <div class="table-list">
      <el-table
        ref="dragTable"
        v-loading="listLoading"
        :data="list"
        row-key="id"
        fit
        highlight-current-row
        :header-cell-style="{ background: '#e4e7f0' }"
        style="width: 90%"
      >
        <el-table-column align="center" label="id" width="65">
          <template slot-scope="{ row }">
            <span>{{ row.id }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="name"
          width="180px"
          align="center"
          label="品牌名称"
        />
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
    </div>
  </div>
</template>

<script>
import { query } from "@/api/brand";

export default {
  name: "User",
  data() {
    return {
      list: null,
      total: null,
      page: 1,
      size: 10,
      listLoading: true,
      listQuery: {
        page: 1,
        size: 10,
      },
      sortable: null,
    };
  },
  created() {
    this.getList(1);
  },
  methods: {
    async getList(page) {
      this.listQuery.page = page;
      this.listQuery.size = this.size;
      const { data, total } = await query(this.listQuery);
      this.list = data;
      this.total = total;
      this.listLoading = false;
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
