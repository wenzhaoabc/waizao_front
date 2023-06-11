<template>
  <el-tabs v-model="activeName" type="card" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="代发布公告" name="first">
      <un-notice></un-notice>
    </el-tab-pane>
    <el-tab-pane label="已发布公告" name="second">
      <al-notice></al-notice>
    </el-tab-pane>
    <el-tab-pane label="编辑公告" name="third">
      <edit-notice></edit-notice>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts" name="notice">
import { ref } from "vue";
import editNotice from "./editNotice.vue";
import unNotice from "./unNotice.vue";
import alNotice from "./alNotice.vue";
import { TabsPaneContext } from "element-plus";

const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab.props.label);
};
</script>

<style scoped></style>
