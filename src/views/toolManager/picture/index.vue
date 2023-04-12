<template>
<div>
    <div>
        <el-row
            :span="4"
            v-for="item in tabledata"
            :key="item.url"
            :offset="1"
            style="margin-bottom: 15px">
            <el-card
                :body-style="{
                    padding: '15px',
                    width: '1300px',
                    height: '150px',
                    display: 'flex',
                }"
                shadow="hover">
                <el-image
                    style="width: 400px; height: 150px; flex: 1"
                    :src="item.url"
                    :preview-src-list="[item.url]"
                    fit="cover">
                    <template #error>
                    <div class="image-slot">
                        <el-icon><icon-picture /></el-icon>
                    </div>
                    </template>
                </el-image>
                <div
                    style="
                    display: flex;
                    flex-direction: column;
                    align-items: right;
                    margin-left: 200px;
                    margin-top: 20px;
                    margin-right: 20px;
                    ">
                    <el-text class="mx-1" size="large">图片上传时间：{{ item.time }}</el-text>
                    <br />
                    <el-button type="primary" size="large" @click="deleteImg(item.url)"
                    >点击删除</el-button
                    >
                </div>
            </el-card>
        </el-row>
    </div>
</div>

</template>

<script setup lang="ts" name="picture">
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { Tool } from "@/api/interface";
import { onMounted,reactive } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {
  getShowImgsApi,
  addShowImgApi,
  deleteShowImgApi,
} from "@/api/modules/toolManage";
const tabledata = reactive<Tool.ResShowImg[]>([
  {
    url: "https://s2.loli.net/2022/10/01/B94FhqQpkfdoWbi.jpg",
    time: "2022.10.28",
  },
  {
    url: "https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg",
    time: "2022.10.28",
  },
  {
    url:
      "https://www.easytourchina.com/images/Photo/jiuzhai…u-and-huang-long/p686_d20180326185424_thumb_m.jpg",
    time: "2022.10.28",
  },
]);
onMounted(async () => {
  getAllShowImg();
});
const getAllShowImg = async () => {
  const { data } = await getShowImgsApi();
  tabledata.splice(0, tabledata.length, ...data);
  console.log(tabledata);
};
const deleteImg = async (url: string) => {
  try {
    await ElMessageBox.confirm("你确定删除这张图片?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });
    const index = tabledata.findIndex((item) => item.url === url);
    tabledata.splice(index, 1);
    const { data } = await deleteShowImgApi(url);
    console.log(data);
    ElMessage({
      message: "删除成功",
      type: "success",
    });
  } catch (error) {
    ElMessage.error("删除失败");
  }
};
</script>

<style scoped>
.demo-image .block {
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.demo-image .block:last-child {
  border-right: none;
}
.demo-image .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
.demo-image__error .image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 300px;
}
</style>
