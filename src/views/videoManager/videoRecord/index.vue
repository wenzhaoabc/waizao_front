<template>
    <div>
        <div>
            <a href="https://1.15.177.18:8103/" target="_blank">进入会议</a>
        </div>
        <el-table :data="tableData3" style="width: 100%" height="630px">
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
import { Video } from "@/api/interface";
import {getVideosApi,deleteVideosApi } from "@/api/modules/videoManage";
import { ElMessageBox, ElForm,ElMessage } from "element-plus";
import { ref } from 'vue';

const tableData3 = ref<Video.ResVideo[]>([]);
//Methods
onMounted(async () => {
    getAllVideo();
});

const getAllVideo = async () => {
  const { data } = await getVideosApi();
  // console.log(data)
  tableData3.value.splice(0, tableData3.value.length, ...data);
  console.log("下面是tabldata3的数据")
  console.log(tableData3)
};

const handleDelete = async (index: number, row: Video.ResVideo) => {
  try {
    await ElMessageBox.confirm("你确定删除这条会议记录吗?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });

    const index = tableData3.value.findIndex((item) => item.videoId === row.videoId);
    tableData3.value.splice(index, 1);
    console.log(row.videoId)
    const { data } = await deleteVideosApi(row.videoId);
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