<template>
  <div>
    <el-row
      :span="4"
      v-for="item in tabledata"
      :key="item.content"
      :offset="1"
      style="margin-bottom: 15px"
    >
      <el-card
        :body-style="{
          padding: '15px',
          width: '1300px',
          height: '100px',
          display: 'flex',
        }"
        shadow="hover"
      >
        <el-image style="width: 100px; height: 100px; margin-right: 50px" :src="url" />
        <div style="display: flex">
          <h5 style="width: 500px; margin-right: 40px">
            文字说明：{{ item.content }}
          </h5>
          <h5 style="width: 150px">身份：{{ item.role }}</h5>
          <h5 style="width: 150px">ID：{{ item.roleid }}</h5>
          <h5 style="width: 300px">发布时间：{{ item.time }}</h5>
        </div>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="design">
interface contentDetail {
  content: string;
  role: string;
  roleid: string;
  time: string;
}
const url = "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg";
const tabledata: contentDetail[] = [
  {
    content: "外灶村很美丽，上海大都市近郊风貌建设很棒。",
    role: "游客",
    roleid: "圆心个",
    time: "2022.10.28",
  },
  {
    content:
      "来这里已经有1年了，作为新搬来的村民，我感触颇多。离开家乡，独自来这里闯荡，经历了上半年的疫情，幸亏有村里的同伴一起关照，才能顺利渡过难关…",
    role: "村民",
    roleid: "李坦德",
    time: "2022.10.28",
  },
  {
    content: "作为一个资深设计师，我很支持外灶村的建设。",
    role: "设计师",
    roleid: "汪德发",
    time: "2022.10.28",
  },
  {
    content: "真无语，环境脏乱差！",
    role: "游客",
    roleid: "冯蜡笔",
    time: "2022.10.28",
  },
];
</script>
<style scoped></style>
