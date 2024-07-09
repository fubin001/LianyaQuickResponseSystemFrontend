<template>
  <div>
    <span>{{ propRoleID }}</span>
    <el-tree
      :data="data"
      show-checkbox
      
      node-key="path"
      ref="tree"
      highlight-current
      :check-strictly="true"
      :props="defaultProps"
      @check="handleCheck">
      <template v-slot="{ node, data, store }">
        <span>
          <span>{{ data.name || data.path }}</span>
        </span>
      </template>
    </el-tree>

    <div class="buttons">
      <!-- <el-button @click="getCheckedNodes">通过 node 获取</el-button>
      <el-button @click="getCheckedKeys">通过 key 获取</el-button>
      <el-button @click="setCheckedNodes">通过 node 设置</el-button>
      <el-button @click="setCheckedKeys">通过 key 设置</el-button>
      <el-button @click="resetChecked">清空</el-button> -->
      <el-button @click="adds">adds</el-button>
    </div>
  </div>
</template>

<script>
import { asyncRoutes, constantRoutes } from '@/router'
import {addPermissionManu ,getRoleIDPermission} from "@/api/permission";

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
    // renderContent(h, { node, data, store }) {
    //   return (
    //     <span>
    //       <span>{data.name?data.name:data.path}</span>
    //     </span>
    //   );
    // },
    adds(){
      console.log(this.$refs.tree.getCheckedNodes());
      const a= this.$refs.tree.getCheckedNodes()
      const b = a.map(obj=>({
        ...obj,
        "roleID":this.propRoleID
      }))
      addPermissionManu(b).then((res)=>{}).finally(()=>{
        this.emitCustomEvent()
      })
    },
    emitCustomEvent() {
      // 触发自定义事件，传递数据给父组件
      this.$emit('custom-event', { message: 'Hello from child component' });
    },
    on_getRoleIDPermission(){
      getRoleIDPermission({id:this.propRoleID}).then((res)=>{
        this.$refs.tree.setCheckedNodes(res.data)
      })
    },
    getCheckedNodes() {
      console.log(this.$refs.tree.getCheckedNodes());
    },
    getCheckedKeys() {
      console.log(this.$refs.tree.getCheckedKeys());
    },
    setCheckedNodes() {
      this.$refs.tree.setCheckedNodes([
        {
          path: "/sy",
          name: '二级 2-1'
        },
        {
          path: 9,
          name: '三级 1-1-1'
        }
      ]);
    },
    setCheckedKeys() {
      this.$refs.tree.setCheckedKeys([3]);
    },
    resetChecked() {
      this.$refs.tree.setCheckedKeys([]);
    },
    handleCheck(checkedNodes, checkedKeys) {
      console.log('Checked nodes:', checkedNodes);
      console.log('Checked keys:', checkedKeys);
    }
  },
  
};
</script>

<style scoped>
.buttons {
  margin-top: 20px;
}
</style>
