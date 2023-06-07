<template>
  <div>
      <el-table :data="tableData2" style="width: 100%" height="630px">
          <el-table-column label="会议号" prop="videoId" />
          <el-table-column label="参会人数" prop="personnum" />
          <el-table-column label="当前状态" prop="status" />
          <el-table-column label="开始时间" prop="starttime" />
          <el-table-column label="结束时间" prop="endtime" />
          <el-table-column label="会议描述" prop="descrip" />
          <el-table-column align="right">
            <template #default="scope">
              <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
      </el-table>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { GlobalStore } from '@/stores';
import { Video } from "@/api/interface";
import {getMyVideosApi,deleteMyVideosApi } from "@/api/modules/videoManage";
import { ElMessageBox, ElForm,ElMessage } from "element-plus";
const tableData2: Video.ResVideo[] = [
];
//Methods
onMounted(async () => {
  getMyAllVideo();
});

const getMyAllVideo = async () => {
  const globalStore = GlobalStore();
  console.log("下面是用户的手机号")
  console.log(globalStore.userInfo.phone)
  const phone = globalStore.userInfo.phone;
  const { data } = await getMyVideosApi(phone);
  console.log(data)
  tableData2.splice(0, tableData2.length, ...data);
};

const handleDelete = async (index: number, row: Video.ResVideo) => {
try {
  await ElMessageBox.confirm("你确定删除这条参会记录吗?", "提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning",
  });

  const index = tableData2.findIndex((item) => item.videoId === row.videoId);
  tableData2.splice(index, 1);
  console.log("下面是用户的手机号")
  const globalStore = GlobalStore();
  console.log(globalStore.userInfo.phone)
  const phone = globalStore.userInfo.phone;
  const { data } = await deleteMyVideosApi(phone,row.videoId);
  console.log(data);
  ElMessage({
    message: '删除成功',
    type: 'success',
  })
} catch (error) {
  ElMessage.error('删除失败')
}
};
</script>

<style>

</style>