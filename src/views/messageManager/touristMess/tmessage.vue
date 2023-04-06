<template>
  <div>
    <el-row
      :span="4"
      v-for="item in tabledata"
      :key="item.content"
      :offset="1"
      style="margin-top: 15px"
    >
      <el-card
        :body-style="{
          padding: '15px',
          width: '1300px',
          height: '100px',
        }"
        shadow="hover"
      >
        <span>{{ item.content }}</span>
        <div style="display: flex">
          <h5 style="width: 200px">游客：{{ item.role }}</h5>
          <h5 style="width: 300px">发布时间：{{ item.time }}</h5>
          <h5 style="width: 300px">状态：{{ item.status }}</h5>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="tmessage">
interface contentDetail {
  content: string;
  role: string;
  time: string;
  status: string;
}
const tabledata: contentDetail[] = [
  {
    content: "哈哈哈哈，真美",
    role: "赵普来",
    time: "2022.10.28",
    status: "已回复",
  },
  {
    content: "哈哈哈哈，真美",
    role: "赵普来",
    time: "2022.10.28",
    status: "已回复",
  },
  {
    content: "哈哈哈哈，真美",
    role: "赵普来",
    time: "2022.10.28",
    status: "未回复",
  },
  {
    content: "哈哈哈哈，真美",
    role: "赵普来",
    time: "2022.10.28",
    status: "未回复",
  },
];
</script>
<style scoped></style>
