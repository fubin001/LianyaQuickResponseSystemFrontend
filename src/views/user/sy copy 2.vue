<template>
  <div class="buttons">
    <!-- <el-button @click="adds">adds</el-button> -->
    <el-button @click="ongetAllByCityVoList">查城市数据</el-button>
    <div class="block">
      <span class="demonstration">单选可搜索</span>
      <el-cascader placeholder="试试搜索：指南" ref="city" :props="{emitPath:false}"  v-model="city" :options="optionsCityt" filterable clearable></el-cascader>
    </div>
    <span>{{ city }}</span>
    <el-button @click="on_getWeatherForecast()">获取当前城市天气</el-button>
    {{  }}
  </div>
</template>

<script>
import { asyncRoutes, constantRoutes } from '@/router'
import { weather, getAllByCityVoList,getWeatherForecast } from "@/api/sy";
import axios from 'axios'
export default {
  props: {
    propRoleID: 0
  },
  data() {
    return {
      data: [],
      city:'',
      optionsCityt: [],
      weather:{},
    };
  },
  async created() {
    await this.ongetAllByCityVoList()
    
    // this.data = asyncRoutes
    // this.on_getRoleIDPermission()
  },
  methods: {

    adds() {
      console.log(1);
      weather().then((res) => { }).finally(() => {

      })
    },
    ongetAllByCityVoList() {
      getAllByCityVoList().then((res) => {
        this.optionsCityt = res.data
      }).finally(() => {
      })
    },
    onCity(){
    },
    // 查询当前天气
    on_getWeatherForecast(){
      weather({cityId:this.city}).then((res)=>{
        console.log(res.data);
      })
    }
  }

};
</script>

<style scoped>
.buttons {
  margin-top: 20px;
}
</style>
