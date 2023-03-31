<template>
  <div>
    <p>用户管理之普通村民管理</p>
    <el-button @click="getUserInfo">测试按钮</el-button>
  </div>
</template>

<script setup lang="ts" name="villager">
import { userInfoApi } from '@/api/modules/login';

const getUserInfo = async () => {
  console.log("测试按钮，获取用户信息");
  const { data } = await userInfoApi();
  console.log(data);
}
</script>

<style scoped></style>
