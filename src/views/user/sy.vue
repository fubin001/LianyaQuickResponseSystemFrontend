<template>
    <div class="buttons">
      <el-button @click="adds">adds</el-button>
    </div>
</template>

<script>
import { asyncRoutes, constantRoutes } from '@/router'
import { weather } from "@/api/sy";

export default {
  props:{
    propRoleID:0
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        name: 'name'
      }
    };
  },
  created() {
    this.data=asyncRoutes
    this.on_getRoleIDPermission()
  },
  methods: {

    adds(){
      console.log(1);
      weather().then((res)=>{}).finally(()=>{
        
      })
    },
  }
  
};
</script>

<style scoped>
.buttons {
  margin-top: 20px;
}
</style>
