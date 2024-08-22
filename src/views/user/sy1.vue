<template>
  <div>
    <el-button @click="apiRel" />
  </div>
</template>

<style lang="scss" scoped>

  .el-table .warning-row {
    background: rgb(12, 11, 9);
  }

  .el-table .success-row {
    background: #000000;
  }

</style>

<script>
import { apiRel } from '@/api/sy'
export default {
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  },
  methods: {
    apiRel,
    tableRowClassName({ row, rowIndex }) {
      console.log('541:', row)
      // console.log("542:",row.brand);

      if (row.existsFeedbackOrder) {
        return 'warning-row'
      } else {
        return 'warning-row'
      }
    }
  }
}
</script>
