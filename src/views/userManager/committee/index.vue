<template>
  <el-table
    :data="tableData"
    :default-sort="{ prop: 'date', order: 'descending' }"
    style="width: 100%"
  >
    <el-table-column prop="wechatId" label="微信ID" sortable width="180" />
    <el-table-column prop="nickname" label="微信名称" sortable width="250" />
    <el-table-column prop="loginTime" label="登录时间" sortable width="250" />
    <el-table-column prop="loginAddress" label="登录地址" sortable width="180" />
  </el-table>
</template>

<script setup lang="ts" name="committee">
import type { TableColumnCtx } from "element-plus";
import { onMounted } from "vue";
import { User } from "@/api/interface";
import { getVisitorsApi } from "@/api/modules/userManage";
import { ref } from 'vue';

const tableData = ref<User.ResVisitor[]>([]);
//Methods
onMounted(async () => {
  getAllVisitor();
});

const getAllVisitor = async () => {
  const { data } = await getVisitorsApi();
  tableData.value.splice(0, tableData.value.length, ...data);
  console.log(tableData)
};

</script>

<style scoped></style>
