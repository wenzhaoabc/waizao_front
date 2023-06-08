<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <!-- <span>This is userInfo</span> -->
    <div class="content-box">
      <el-avatar :src="userInfo.avatar"></el-avatar>
      <br />
      <h4>{{ userInfo.userName }}</h4>
      <!-- <br /> -->
      <p>{{ userInfo.phone }}</p>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { GlobalStore } from "@/stores";
const globalStore = GlobalStore();
const userInfo = globalStore.userInfo;

const dialogVisible = ref(false);
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
