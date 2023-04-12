<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="wechatId" label="微信ID" sortable width="180" />
    <el-table-column prop="nickname" label="微信名称" width="250" />
    <el-table-column prop="loginTime" label="登录时间" width="250" />
    <el-table-column prop="loginAddress" label="登录地址" width="180" />
  </el-table>
</template>

<script setup lang="ts" name="committee">
import type { TableColumnCtx } from "element-plus";
import { onMounted } from "vue";
import { User } from "@/api/interface";
import { getVisitorsApi } from "@/api/modules/userManage";
const tableData: User.ResVisitor[] = [
  {
    wechatId: "123",
    nickname:"123",
    loginTime: "123",
    loginAddress: "123",
  }
];
//Methods
onMounted(async () => {
  getAllVisitor();
});

const getAllVisitor = async () => {
  const { data } = await getVisitorsApi();
  tableData.splice(0, tableData.length, ...data);
};

</script>

<style scoped></style>
