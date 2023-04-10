<template>
  <span>待发布</span>
  <div>
    <el-row :span="4" v-for="item in tabledata1" :key="item.content" :offset="1" style="margin-bottom: 15px">
      <el-card :body-style="{
        padding: '15px',
        width: '1300px',
        height: '150px',
      }" shadow="hover">
        <el-descriptions class="margin-top" title="公告内容" :column="3">
          <template #extra>
            <el-button type="primary">删除</el-button>
            <el-button type="warning">重新编辑</el-button>
          </template>
          <el-descriptions-item label="公告内容" span="3">{{
            item.content
          }}</el-descriptions-item>
          <el-descriptions-item label="公告状态">{{ item.state }}</el-descriptions-item>
          <el-descriptions-item label="预定发布时间">{{ item.time }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-row>
  </div>
  <span>已发布</span>
  <div>
    <el-row :span="4" v-for="item in tabledata2" :key="item.content" :offset="1" style="margin-bottom: 15px">
      <el-card :body-style="{
        padding: '15px',
        width: '1300px',
        height: '150px',
      }" shadow="hover">
        <el-descriptions class="margin-top" title="公告内容" :column="3">
          <template #extra>
            <el-button type="primary">撤回</el-button>
          </template>
          <el-descriptions-item label="公告内容" span="3">{{
            item.content
          }}</el-descriptions-item>
          <el-descriptions-item label="公告状态">{{ item.state }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ item.time }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="manageNotice">
interface draft {
  content: string;
  state: string;
  time: string;
}
interface news {
  content: string;
  state: string;
  time: string;
}
const tabledata1: draft[] = [
  {
    content: "草稿1",
    state: "未发布",
    time: "2022.10.28",
  },
  {
    content: "草稿2",
    state: "未发布",
    time: "2022.10.28",
  },
];

const tabledata2: news[] = [
  {
    content: "公告1",
    state: "已发布",
    time: "2022.10.28",
  },
  {
    content: "公告2",
    state: "已发布",
    time: "2022.10.28",
  },
];
</script>

<style scoped></style>
