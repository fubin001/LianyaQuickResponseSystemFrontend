<template>
  <div></div>
</template>

<script>
import { createOrUpdate, deleteUserById, queryUser, getUserApplyOfrList } from "@/api/user";

export default {
  name: "用户信息",
  data() {
    return {
      formData: {},
      search: {
        currentPage: 0,
        sizePage: 10
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
