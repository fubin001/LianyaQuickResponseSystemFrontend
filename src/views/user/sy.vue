<template>
  <div class="buttons">
    <el-button @click="adds">adds</el-button>
    <el-button @click="ongetAllByCityVoList">查城市数据</el-button>
    <div class="block">
      <span class="demonstration">单选可搜索</span>
      <el-cascader placeholder="试试搜索：指南" v-model="city" :options="optionsCityt" filterable clearable></el-cascader>
    </div>
    <span>{{ city }}</span>
    <div></div>
    <i class="el-icon-lightning"></i>
    <i class="el-icon-heavy-rain"></i>
    <i class="el-icon-sunny"></i>
    <i class="el-icon-cloudy"></i>
    <!-- el-icon-lightning  -->
    <!-- el-icon-heavy-rain -->
    <!-- el-icon-sunny -->
    <!-- el-icon-cloudy -->
  </div>
</template>

<script>
import { asyncRoutes, constantRoutes } from '@/router'
import { getAllByCityVoList } from "@/api/sy";
import axios from 'axios'
export default {
  // props: {
  //   propRoleID
  // },
  data() {
    return {
      data: [],
      city:'',
      openweathermap:{},
      optionsCityt: [],
    };
  },
  async created() {
    await this.ongetAllByCityVoList()
    
    // this.data = asyncRoutes
    // this.on_getRoleIDPermission()
  },
  methods: {

    // adds() {
    //   console.log(1);
    //   weather().then((res) => { }).finally(() => {

    //   })
    // },
    ongetAllByCityVoList() {
      getAllByCityVoList().then((res) => {
        this.optionsCityt = res.data
      }).finally(() => {
      })
    },
    onCity(val){
      console.log(val[val.length-1]);
    },

  }

};
</script>

<style scoped>
.buttons {
  margin-top: 20px;
}
</style>
