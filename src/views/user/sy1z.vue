<template>
  <div class="container">
    <div class="row">
      <div class="item horizontal">折线图</div>
    </div>
    <div class="row">
      <div class="item vertical">竖着长方形表格1</div>
      <div class="item vertical">竖着长方形表格2</div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.row {
  display: flex;
  gap: 10px;
}

.item {
  padding: 10px;
  border: 1px solid #ddd;
}

.horizontal {
  flex: 1;
  height: 300px; /* 可以根据需要调整高度 */
}

.vertical {
  flex: 1;
  height: 200px; /* 可以根据需要调整高度 */
}
</style>
