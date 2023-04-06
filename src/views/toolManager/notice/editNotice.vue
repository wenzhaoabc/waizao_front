<template>
  <div class="card content-box">
    <WangEditor height="400px" v-model:value="content" />
    <div>
      <el-button>即时发布</el-button>
      <el-button>定时发布</el-button>
      <el-button>存为草稿</el-button>
      <el-button type="primary" @click="dialogVisible = true">内容预览</el-button>
      <el-dialog v-model="dialogVisible" title="富文本内容预览" width="1300px" top="50px">
        <div class="view" v-html="content" />
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts" name="editNotice">
import { ref } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";

const content = ref("");

const dialogVisible = ref(false);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
