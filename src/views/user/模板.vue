<template>
    <div></div>
</template>
  
  <script>
  import { createOrUpdate, deleteUserById, queryUser,getUserApplyOfrList } from "@/api/user";
  
  export default {
    name: "用户信息",
    data() {
      return {
        formData:{},
        search:{
            
        },
        dataList:[],
        dojon:"",
      };
    },
    created() {
    },
    methods: {
    },
  };
  </script>
