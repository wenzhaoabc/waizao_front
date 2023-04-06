<template>
  <div>
    <div style="text-align: center">
      <el-input
        v-model="input1"
        size="large"
        placeholder="输入关键词搜素"
        :prefix-icon="Search"
        style="width: 400px"
      />
      <el-select
        v-model="value"
        placeholder="筛选"
        size="large"
        style="margin-left: 20px"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-date-picker
        style="margin-left: 20px"
        v-model="value2"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="To"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        size="large"
      />
    </div>
    <tmessage></tmessage>
  </div>
</template>

<script setup lang="ts" name="touristMess">
import { Search } from "@element-plus/icons-vue";
import { ref } from "vue";
import tmessage from "./tmessage.vue";
const value = ref("");
const input1 = ref("");
const options = [
  {
    value: "已回复",
    label: "已回复",
  },
  {
    value: "未回复",
    label: "未回复",
  },
];
const value2 = ref("");

const shortcuts = [
  {
    text: "Last week",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      return [start, end];
    },
  },
  {
    text: "Last month",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
      return [start, end];
    },
  },
  {
    text: "Last 3 months",
    value: () => {
      const end = new Date();
      const start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
      return [start, end];
    },
  },
];
</script>

<style scoped></style>
