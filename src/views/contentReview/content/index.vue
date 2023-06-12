<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="广场" name="first">
      <square></square>
    </el-tab-pane>
    <!-- <el-tab-pane label="设计" name="second">
      <design></design>
    </el-tab-pane> -->
  </el-tabs>
</template>

<script setup lang="ts" name="content">
import { ref } from "vue";
import type { TabsPaneContext } from "element-plus";
import square from "./square.vue";
import design from "./design.vue";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.label);
};
</script>
<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>
