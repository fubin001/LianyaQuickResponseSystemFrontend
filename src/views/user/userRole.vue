<template>
  <div>
    <el-row :gutter="12" class="el-row">
      <el-col :span="8">
        <el-card shadow="always">
          用户信息
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="hover">
          角色信息
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          从不显示
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap
  }
 
  .el-card {
    min-width: 100%;
    height: 80vh; 
    margin-right: 20px;
    transition: all .5s;
  }
</style>