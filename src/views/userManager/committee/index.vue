<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="date" label="登录时间" sortable width="180" />
    <el-table-column prop="name" label="微信名ID" width="180" />
    <el-table-column prop="address" label="登录地址" :formatter="formatter" />
    <el-table-column prop="IP" label="IP地址" width="180" />
  </el-table>
</template>

<script setup lang="ts" name="committee">
import type { TableColumnCtx } from "element-plus";
interface User {
  date: string;
  name: string;
  address: string;
  IP: string;
}
const formatter = (row: User, column: TableColumnCtx<User>) => {
  return row.address;
};
const tableData: User[] = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    IP:"10.10.10.10"
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    IP:"10.10.10.10"
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    IP:"10.10.10.10"
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
    IP:"10.10.10.10"
  },
];
</script>

<style scoped></style>
