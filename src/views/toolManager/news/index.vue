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
          height: '150px',
        }"
        shadow="hover"
      >
        <el-descriptions
          class="margin-top"
          title="要闻内容"
          :column="3"
          :size="size"
          :style="blockMargin"
        >
          <template #extra>
            <el-button type="primary">链接新的要闻</el-button>
            <el-button type="warning">删除</el-button>
          </template>
          <el-descriptions-item label="公众号文章" span="3">{{
            item.content
          }}</el-descriptions-item>
          <el-descriptions-item label="发布来源">{{ item.role }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ item.time }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="news">
import { computed, ref } from "vue";
interface contentDetail {
  content: string;
  role: string;
  time: string;
}
const size = ref("");
const blockMargin = computed(() => {
  const marginMap = {
    large: "32px",
    default: "28px",
    small: "24px",
  };
  return {
    marginTop: marginMap[size.value] || marginMap.default,
  };
});
const tabledata: contentDetail[] = [
  {
    content: "某个公众号",
    role: "同济大学",
    time: "2022.10.28",
  },
  {
    content: "某个公众号",
    role: "同济大学",
    time: "2022.10.28",
  },
  {
    content: "某个公众号",
    role: "同济大学",
    time: "2022.10.28",
  },
  {
    content: "某个公众号",
    role: "同济大学",
    time: "2022.10.28",
  },
];
</script>
<style scoped>
.el-descriptions {
  margin-top: 20px;
}
.cell-item {
  display: flex;
  align-items: center;
}
.margin-top {
  margin-top: 0px;
}
</style>
