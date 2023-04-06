<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="管理公告" name="first">
      <manage-notice></manage-notice>
    </el-tab-pane>
    <el-tab-pane label="编辑公告" name="second">
      <edit-notice></edit-notice>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="notice">
import { ref } from "vue";
import editNotice from "./editNotice.vue";
import manageNotice from "./manageNotice.vue";

const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.label);
};
</script>

<style scoped></style>
