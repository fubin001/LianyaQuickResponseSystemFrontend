<template>
  <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
    <el-table-column prop="date" label="日期" width="180" />
    <el-table-column prop="name" label="姓名" width="180" />
    <el-table-column prop="address" label="地址" />
  </el-table>
</template>

<style lang="scss" scoped>

  .el-table .warning-row {
    background: rgb(12, 11, 9);
  }

  .el-table .success-row {
    background: #000000;
  }

// .app-container {
//   background-color: #f7f8fc;

//   .filter-container {
//     background-color: #ffffff;
//     padding: 10px;
//     margin-bottom: 10px;

//     span {
//       float: left;
//       width: 240px;
//       text-align: end;
//     }

//     .end {
//       float: right;
//     }
//   }

//   .filter-container2 {
//     background-color: #ffffff;
//     padding: 10px;
//     margin-bottom: 10px;

//     .search-item {
//       width: 450px;
//       float: left;

//       span {
//         float: left;
//         text-align: end;
//       }

//       .end {
//         float: right;
//       }
//     }
//   }

//   .table-list {
//     background-color: #ffffff;
//     padding: 10px;
//   }
// }

// .border-set {
//   div {
//     border: 1px solid #d5d5d5;
//     // border-left-style: none;
//     // border-top-style: none;
//     padding: 0.2rem;
//   }

//   div:nth-child(1) {
//     color: #cccccc;
//   }
// }

// .icon-star {
//   margin-right: 2px;
// }

// .drag-handler {
//   width: 20px;
//   height: 20px;
//   cursor: pointer;
// }

// .show-d {
//   margin-top: 15px;
// }

// .metric-name {
//   width: 150px;
//   font-weight: bold;
//   /* 设置字体*/
//   float: left;
// }

// .metric-value {
//   color: red;
//   /* 设置字体颜色为红色 */
//   font-weight: bold;
//   /* 设置字体*/
//   float: left;
// }

// .clickable-text {
//   color: blue;
//   cursor: pointer;
// }
</style>

<script>
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
