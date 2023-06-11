<template>
  <div>
    <el-form :model="form" label-width="120px">
      <el-form-item label="选择地点">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="地点名称">
        <el-input v-model="form.region" />
      </el-form-item>
      <el-form-item label="添加说明">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">添加</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts" name="editDesign">
import { reactive } from "vue";

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
};
</script>

<style scoped></style>
