<template>
  <div class="parent">
    <div class="child1">
      <el-row
        :span="1"
        v-for="item in tabledata"
        :key="item.url"
        :offset="1"
        style="margin-bottom: 2%"
      >
        <el-card
          :span="1"
          :body-style="{
            padding: '2%',
            width: '100%',
            height: '10%',
            display: 'flex',
          }"
         
        >
          <el-image
            style="width:900px;height: 150px; flex: 1; object-fit: cover;"
            :src="item.url"
            :preview-src-list="[item.url]"
            fit="cover"
          >
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
              margin-left: 20%;
              margin-top: 5%;
              margin-right: 5%;
            "
          >
            <el-text class="mx-1" size="large">图片上传时间：{{ item.time }}</el-text>
            <br />
            <el-button type="primary" size="large" @click="deleteImg(item.url)"
              >点击删除</el-button
            >
          </div>
        </el-card>
      </el-row>
    </div>
    <div class="child2">
        <el-button size="large" type="primary" @click="isaddPicture = true;">添加图片</el-button>
    </div>
    <el-dialog v-model="isaddPicture" title="添加图片">
      <el-form :model="newPicture">
        <el-form-item label="图片">
          <Img v-model:image-url="newPicture.imgPath" height="120px" width="120px"></Img>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isaddPicture = false">取消</el-button>
          <el-button type="primary" @click="addPicture"> 确认 </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="picture">
import { Picture as IconPicture } from "@element-plus/icons-vue";
import { Tool } from "@/api/interface";
import { onMounted, reactive, ref } from "vue";
import Img from '@/components/Upload/Img.vue';
import { ElMessageBox, ElMessage } from "element-plus";
import type { UploadRawFile, UploadFile, FormInstance, Action } from "element-plus";
import {
  getShowImgsApi,
  addShowImgApi,
  deleteShowImgApi,
} from "@/api/modules/toolManage";
// 添加图片
const isaddPicture = ref<boolean>(false)
const newPicture = reactive({
    imgPath: ""
})
const tabledata = reactive<Tool.ResShowImg[]>([
  {
    url: "https://s2.loli.net/2022/10/01/B94FhqQpkfdoWbi.jpg",
    time: "2022.10.28",
  },
  {
    url: "https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg",
    time: "2022.10.28",
  },
]);
onMounted(async () => {
  getAllShowImg();
});
const addPicture = async () => {
    console.log(newPicture)
    if (newPicture.imgPath.length > 0) {
        const { data } = await addShowImgApi(newPicture.imgPath);
        console.log(data)
        getAllShowImg();
        ElMessage({ message: "添加成功", type: "success" })
        isaddPicture.value = false;
        newPicture.imgPath = ""
    } else {
        ElMessage({ message: "上传图片不可为空", type: "error" })
    }
}
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
const handleExceed = (files: File[], fileList: UploadFile[]) => {
  if (fileList.length >= 1) {
    ElMessage.error("只能上传一个图片");
    return;
  }
};
const beforeUpload = (file: UploadRawFile) => {
  const type = ["image/jpeg", "image/jpg", "image/png"];
  if (type.indexOf(file.type) === -1) {
    ElMessage.error("上传的文件必须是JPG、JPEG、PNG三种之一!");
    return false;
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error("图片大小不能超过2MB!");
    return false;
  }
  return true;
};
const upload = ref();
// 自定义上传函数
const uploadImage = async (val: any) => {
  const formData = new FormData();
  formData.append("file", val.file);
  try {
    const { data } = await addShowImgApi(formData);
    console.log(data);
    ElMessage({
      message: "成功",
      type: "success",
    });
  } catch (error) {
    ElMessage.error("上传失败");
  }
  upload.clearFiles();
  getAllShowImg();
};
</script>

<style scoped>
.block {
  padding: 10% 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
  display: inline-block;
  width: 20%;
  box-sizing: border-box;
  vertical-align: top;
}
.block:last-child {
  border-right: none;
}
.demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 5%;
}
.image-slot {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: var(--el-fill-color-light);
  color: var(--el-text-color-secondary);
  font-size: 300px;
}
.parent {
  position: relative;
  width: 98%;
  height: 98%;
}

.child1 {
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  bottom: 5%;
  height: 100%; /* 设置高度 */
  overflow-y: auto; /* 设置滚动条 */
}
.child2 {
  position: absolute;
  bottom: -5%;
  right: 5%;
  height: 10%;
}
</style>
