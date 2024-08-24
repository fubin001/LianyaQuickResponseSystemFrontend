<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style>
/**修改全局的滚动条*/
/**滚动条的宽度*/
::-webkit-scrollbar {
	width: 8px;
}
::-webkit-scrollbar-thumb {
	background-color: #a1a3a9;
	border-radius: 3px;
}
/*表格*/
.el-table__body-wrapper::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}
.el-table__body-wrapper::-webkit-scrollbar-thumb {
	background-color: #a1a3a9;
	border-radius: 3px;
}
</style>
<script>
export default {
  name: 'App'
}
</script>
