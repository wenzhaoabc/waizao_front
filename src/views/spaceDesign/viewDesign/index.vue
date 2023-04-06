<template>
  <el-row :span="4" v-for="o in 4" :key="o" :offset="1" style="margin-top: 15px">
    <el-card
      :body-style="{
        padding: '15px',
        width: '1300px',
        height: '100px',
      }"
      shadow="hover"
    >
      <el-button text @click="dialogTableVisible = true" type="primary">
        查看详情
      </el-button>
      <el-dialog v-model="dialogTableVisible" title="设计方案">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 6" :key="item">
            <h3 text="2xl" justify="center">{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>
        <span>
          <h4 style="display: inline">设计点位：</h4>
          <el-link style="display: inline">链接地图</el-link>
        </span>
        <br />
        <span>
          <h4 style="display: inline">设计说明：</h4>
          <h6 style="display: inline">XXXXXXXX</h6>
        </span>
      </el-dialog>
    </el-card>
  </el-row>
</template>

<script setup lang="ts" name="editDesign">
import { ref } from "vue";
const dialogTableVisible = ref(false);
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
