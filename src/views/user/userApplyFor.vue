<template>
    <div>

    </div>
</template>
  
  <script>
  import { createOrUpdate, deleteUserById, queryUser,getUserApplyOfrList } from "@/api/user";
  
  export default {
    name: "用户申请",
    data() {
      return {
        formData:{},
        userApplyOfrList:[],
        search:{
            
        },
        dataList:[],
        dojon:"",
      };
    },
    created() {
    },
    methods: {
        on_getUserApplyOfrList(){
            getUserApplyOfrList().then((res)={

            })
        }
    },
  };
  </script>
