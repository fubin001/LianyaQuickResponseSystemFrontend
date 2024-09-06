<template>
  <div>
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="path"
      :props="defaultProps"
      @check="handleCheck"
    >

      <template v-slot="{ node, data, store }">
        <span>
          <span>{{ data.meta?data.meta.title : data.path }}</span>
        </span>
      </template>
    </el-tree>
    <div class="buttons">
      <el-button @click="adds">保存</el-button>
    </div>
  </div>
</template>

<script>
import { asyncRoutes } from '@/router'
import { addPermissionManu, getRoleIDPermission } from '@/api/permission'

export default {
  props: {
    propRoleID: null
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: 'children',
        name: 'name'
      },
      paths: ['/data', '/data/buyOrder', '/data/saleOrder', '/data/materialOrder', '/data/bom', '/data/storage', '/data/storageDetail', '/data/color']
    }
  },
  created() {
    this.data = asyncRoutes
    this.on_getRoleIDPermission()
  },
  methods: {
    // 获取已有的权限
    on_getRoleIDPermission() {
      console.log(this.paths)
      getRoleIDPermission({ id: this.propRoleID }).then((res) => {
        this.paths = []
        res.data.forEach(item => {
          this.paths.push(item.path)
        })
        console.log(this.paths)
        this.$refs.tree.setCheckedKeys(this.paths)
      })
    },
    // 提交
    adds() {
      console.log(this.$refs.tree.getCheckedNodes())
      const a = this.$refs.tree.getCheckedNodes()
      const b = a.map(obj => ({
        ...obj,
        'type': 1,
        'name': obj.meta ? obj.meta.title : obj.path // 原name的值替换成原meta.title的值
      }))
      addPermissionManu({ roleID: this.propRoleID, permissionList: b }).then((res) => {}).finally(() => {
        this.emitCustomEvent()
      })
    },
    emitCustomEvent() {
      // 触发自定义事件，传递数据给父组件
      this.$emit('custom-event', { message: 'Hello from child component' })
    }
  }

}
</script>

<style scoped>
.buttons {
  margin-top: 20px;
}
</style>
