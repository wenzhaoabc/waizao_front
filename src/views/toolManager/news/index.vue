<template>
  <div class="parent">
    <div class="child1">
      <div style="width:100%">
        <el-row :span="4" v-for="item in tabledata" :key="item.content" :offset="1" style="margin-bottom: 15px" >
          <div style="width:100%">
            <el-card :body-style="{
              padding: '15px',
              width: '100%',
              height: '30%',
              display: 'flex',
            }" shadow="hover">
            <div style="width:100%;height:100%">
              <el-image
              style="width: 600px; height: 200px"
              :src="item.img"
              :preview-src-list="[item.img]"
              fit="cover">
              <template #error>
                <div class="image-slot">
                  <el-icon><icon-picture/></el-icon>
                </div>
              </template>
            </el-image>
            </div>
             
            <div style="width:100%;margin-left:5%;margin-right:5%">
              <el-descriptions :column="4" size="large">
                <template #extra>
                  <el-button type="warning" @click="handleDelete(item.newsId)">删除</el-button>
                </template>
                <el-descriptions-item class="break-line" label="发布内容：" span="4">{{ item.content }}</el-descriptions-item>
                <el-descriptions-item class="break-line" label="链接类型：" span="1" width="180px">
                  <div>
                    <el-tooltip class="item" effect="dark" :content="item.linkType" placement="top-start">
                      <el-link>查看详情</el-link>
                    </el-tooltip>
                  </div>
                 
                </el-descriptions-item>
                <el-descriptions-item class="break-line" label="发布链接：" span="1" width="180px">
                  <div>
                    <el-link :href="item.link" target="_blank" type="primary">点击链接</el-link>
                  </div>
                  
                </el-descriptions-item>
                <el-descriptions-item class="break-line" label="发布时间：" span="2" width="180px">
                  <div>{{item.publishTime}}</div>
                </el-descriptions-item>
              </el-descriptions>
            </div>
            </el-card>
          </div>
          
        </el-row>
      </div>
     
    </div>
    <div class="child2">
      <el-button type="primary" size="large" @click="dialogFormVisible = true">添加要闻</el-button>
    </div>
    <el-dialog v-model="dialogFormVisible" title="添加要闻" style="width:600px;">
      <el-form :model="form">
        <el-form-item label="要闻内容" :label-width="formLabelWidth">
          <el-input v-model="form.content" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item label="要闻链接" :label-width="formLabelWidth">
          <el-input v-model="form.link" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item label="要闻类型" :label-width="formLabelWidth">
          <el-select v-model="form.linkType" placeholder="请选择要闻类型">
            <el-option v-for="item in typesoptions" :key="item.value" :label="item.label" :value="item.value"
              clearable />
          </el-select>
        </el-form-item>
        <el-form-item label="发布日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.publishTime" type="date" placeholder="请选择发布日期" :label-width="formLabelWidth" />
        </el-form-item>
        <el-form-item label="图片">
          <Img v-model:image-url="form.img" height="120px" width="120px"></Img>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button type="primary" @click="confirmDialog">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="news">
import { onMounted, reactive, ref,computed } from "vue";
import { Tool } from "@/api/interface";
import { UploadRawFile, UploadFile, ElMessageBox, ElMessage } from "element-plus";
import Img from '@/components/Upload/Img.vue';
import {getNewsApi,addNewApi,deleteNewApi,addImgApi} from "@/api/modules/toolManage";
const dialogFormVisible = ref(false)
const formLabelWidth = '140px'
const upload = ref()
const showDetails=ref(false)
const tabledata= reactive<Tool.ResNews[]>([
  {
		newsId: 1,
		content: "今日事件",
		img: "https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg",
		link: "https://www.sohu.com/a/666312688_359980",
		linkType: "网页链接",
		publishTime: "2021-2-20"
  },
  {
    newsId: 2,
		content: "今日事件",
		img: "https://s2.loli.net/2022/10/01/NFXyqBG3nhosRft.jpg",
		link: "https://www.sohu.com/a/666312688_359980",
		linkType: "网页链接",
		publishTime: "2021-2-21"
  }
]);
const typesoptions = [
  {
    value: '网页新闻',
    label: '网页新闻',
  },
  {
    value: '公众号新闻',
    label: '公众号新闻',
  }
]
const form = reactive<Tool.ResNews>({
  newsId: 0,
  content: "",
  img: "",
  link: "",
  linkType: "",
  publishTime: ""
})
onMounted(async () => {
  getAllNews();
});
const getAllNews = async () => {
  const { data } = await getNewsApi();
  const modifiedData = data.map(item => {
    const date = new Date(item.publishTime);
    const year = date.getFullYear();
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const day = ("0" + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return {
      ...item,
      publishTime: formattedDate
    };
  });
  tabledata.splice(0, tabledata.length, ...modifiedData);
  console.log(tabledata);
};
const confirmDialog = async () => {
  try {
    var dateee = new Date(form.publishTime).toJSON();
    form.publishTime=new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')[0]
    const { data } = await addNewApi({ ...form });
    console.log(data);
    dialogFormVisible.value = false
    ElMessage({
      message: '添加要闻成功',
      type: 'success',
    })
    location.reload();
    Object.keys(form).forEach(key => {
      form[key] = "";
    });//清空表单
  } catch (error) {
    console.log(error);
    ElMessage.error('添加失败')
  }
}
const handleDelete = async (newsId: number) => {
  try {
    await ElMessageBox.confirm("你确定删除这个要闻?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });
    const index = tabledata.findIndex((item) => item.newsId === newsId);
    tabledata.splice(index, 1);
    const { data } = await deleteNewApi(newsId);
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
.parent {
  position: relative;
  height: 100%;
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
.child1 {
  position: absolute;
  top: 5%;
  left: 0;
  right: 0;
  bottom: 10%;
  height: 100%; /* 设置高度 */
  overflow-y: auto; /* 设置滚动条 */
}
.child2 {
  position: absolute;
  bottom: 5%;
  right: 5%;
  height: 5%;
}
.break-line .el-descriptions__label,
.break-line .el-descriptions__content {
  display: block;
}
.el-descriptions-item {
  width: 100%;
}
</style>
