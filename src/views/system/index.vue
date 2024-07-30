<template>
    <div></div>
  </template>
  
  <script>
  import { createOrUpdate, deleteUserById, queryUser, getUserApplyOfrList } from "@/api/user";
  
  export default {
    name: "系统管理",
    data() {
      return {
        formData: {},
        search: {
          current: 0,
          size: 10
        },
        dataList: [],
        dojon: "",
      };
    },
    created() {
    },
    methods: {
    },
  };
  </script>
  