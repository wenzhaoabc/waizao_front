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
          title="敏感内容"
          :column="3"
          :size="size"
          :style="blockMargin"
        >
          <template #extra>
            <el-button type="primary">恢复</el-button>
            <el-button type="warning">删除</el-button>
          </template>
          <el-descriptions-item label="内容" span="3">{{ item.content }}</el-descriptions-item>
          <el-descriptions-item label="身份">{{ item.role }}</el-descriptions-item>
          <el-descriptions-item label="发布时间">{{ item.time }}</el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-row>
  </div>
</template>

<script setup lang="ts" name="square">
import { computed, ref } from "vue";
interface contentDetail {
  content: string;
  role: string;
  roleid: string;
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
