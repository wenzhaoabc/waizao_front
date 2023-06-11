<template>
    <span>待发布</span>
    <div class="container">
      <div style="width:100%">
        <el-row :span="4" v-for="item in tabledata1" :key="item.noticeId" :offset="1" style="margin-bottom: 15px">
          <div style="width:100%">
            <el-card class="card" shadow="hover">
              <el-descriptions class="margin-top" title="公告内容" :column="4">
                <template #extra>
                  <el-button type="primary" @click="deleteNotice(item.noticeId)">删除</el-button>
                  <el-button type="warning" @click="textcontent=item.content,nownoticeid=item.noticeId,editdialogVisible=true">重新编辑</el-button>
                  <el-button type="success" @click="publishNotice(item.noticeId)">发布</el-button>
                </template>
                <el-descriptions-item label="公告状态："  span="2" width="400px">{{ item.state }}</el-descriptions-item>
                <el-descriptions-item label="发布部门："  span="2" width="400px">{{ item.publisher }}</el-descriptions-item>
                <el-descriptions-item label="预定发布时间："  span="2" width="400px">{{ item.willTime }}</el-descriptions-item>
                <el-descriptions-item label="公告内容：" span="2"><el-button @click="previewcontent(item.content)" type="primary" plain>点击预览</el-button></el-descriptions-item>
              </el-descriptions>
            </el-card>
          </div>
         
        </el-row>
      </div>
     
    </div>
    <div class="container">  
  
      <el-dialog v-model="dialogFormVisible" title="确认时间" style="width:500px;height: 250px">
        <el-form :model="form">
          <el-form-item label="发布日期" :label-width="formLabelWidth">
            <el-date-picker v-model="form.willTime" type="date" placeholder="请选择发布日期" :label-width="formLabelWidth" />
          </el-form-item>
        </el-form>
        <el-form-item style="margin-left:200px">
          <el-button @click="dialogFormVisible = false">取消</el-button>
            <el-button type="primary" @click="revertNotice">确认</el-button>
        </el-form-item>
      </el-dialog>
  
      <el-dialog v-model="textdialogVisible" title="富文本内容预览" width="1300px" top="50px">
        <div class="view" v-html="textcontent" />
      </el-dialog>
  
      <el-dialog v-model="editdialogVisible" title="富文本内容编辑" width="1300px" top="50px">
        <WangEditor height="400px" v-model:value="textcontent" />
          <span class="dialog-footer">
            <el-button @click="timedialogVisible = true">修改时间</el-button>
            <el-button @click="editdialogVisible = false">取消</el-button>
            <el-button type="primary" @click="editNotice">确认 </el-button>
          </span>
      </el-dialog>
  
      <el-dialog v-model="timedialogVisible" title="修改发布时间" style="width:500px;height: 250px">
        <el-form :model="form">
          <el-form-item label="发布日期" :label-width="formLabelWidth">
            <el-date-picker v-model="form.willTime" type="date" placeholder="请选择发布日期" :label-width="formLabelWidth" />
          </el-form-item>
        </el-form>
        <el-form-item style="margin-left:200px">
          <el-button @click="textdialogVisible = false">取消</el-button>
          <el-button type="primary" @click="editTimeNotice">确认</el-button>
        </el-form-item>
        <!-- <template #footer>
          <span class="dialog-footer" style="margin-top:0px">
            
          </span>
        </template> -->
      </el-dialog>
    </div>
  </template>
  
  <script setup lang="ts" name="manageNotice">
  import WangEditor from "@/components/WangEditor/index.vue";
  import { reactive, computed, ref, onMounted } from "vue";
  import { ElMessageBox, ElForm,ElMessage } from "element-plus";
  import { Tool } from "@/api/interface";
  import { GlobalStore } from '@/stores';
  import { getFinalNoticeApi,getUnFinalNoticeApi,getNoticeApi,addNoticeApi,deletNoticeApi,updateNoticeApi } from "@/api/modules/toolManage";
  const tabledata1= reactive<Tool.ResNotices[]>( [
    {
          noticeId: 0,
          publishTime: "",
      publisher: "",
          content: "发布草稿",
          state: "未发布",
          willTime: "2023-2-23"
    },
    {
          noticeId: 2,
          publishTime: "",
      publisher: "管理员",
          content: "发布草稿",
          state: "未发布",
          willTime: "2023-2-23"
    },
  ])
  
  const tabledata2= reactive<Tool.ResNotices[]>( [
    {
      noticeId: 3,
          publishTime: "",
      publisher: "",
          content: "发布草稿",
          state: "未发布",
          willTime: "2023-2-23"
    }
  ]);
  
  const form= reactive({
    willTime: ""
  })
  const textdialogVisible = ref(false);
  const dialogFormVisible = ref(false);
  const editdialogVisible = ref(false);
  const timedialogVisible = ref(false);
  const formLabelWidth = '140px'
  const nownoticeid = ref(0)
  const textcontent = ref("");
  onMounted(async () => {
    getAllNotices();
  });
  const getAllNotices = async () => {
    getFinalAllNotices();
    getUnFinalAllNotices();
  };
  const getFinalAllNotices = async () => { //table是已经发布的
    const { data } = await getFinalNoticeApi();
    tabledata2.splice(0, tabledata2.length, ...data);
  };
  const getUnFinalAllNotices = async () => {//table2是未发布的
    const { data } = await getUnFinalNoticeApi();
    tabledata1.splice(0, tabledata1.length, ...data);
  };
  const revertNotice = async () => {
      const index = tabledata2.findIndex((item) => item.noticeId === nownoticeid.value);
      const item = tabledata2[index];
      tabledata2.splice(index, 1);
      const res = await updateNoticeApi({
        noticeId:item.noticeId,
        publishTime:"",
        publisher: item.publisher,
        content: item.content,
        state: "未发布",
        willTime: new Date(+new Date(form.willTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')[0]
      });
      if (res.code === 200) {
        ElMessage.success("撤回成功");
        dialogFormVisible.value = false;
        getAllNotices();
      } else {
        ElMessage.error("撤回失败");
      }
  }
  const publishNotice = async (noticeId:number) => {
    const index = tabledata1.findIndex((item) => item.noticeId === noticeId);
    const item = tabledata1[index];
    console.log(item)
    const globalStore = GlobalStore();
    console.log("下面是用户的角色")
    console.log(globalStore.userInfo.roles)
    if (!globalStore.userInfo.roles.includes('manager')) {
      console.warn('警告：roles数组中不包含manager！');
      ElMessage.error("发布失败，您不是管理员");
      return;
    }
    const res = await updateNoticeApi({
        noticeId:item.noticeId,
        publishTime:new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
        publisher: item.publisher,
        content: item.content,
        state: "已发布",
        willTime: item.willTime
      });
      if (res.code === 200) {
        ElMessage.success("发布成功");
        dialogFormVisible.value = false;
        getAllNotices();
      } else {
        ElMessage.error("发布失败");
      }
      getAllNotices();
  }
  const deleteNotice = async (noticeId: number) => {
      try {
        await ElMessageBox.confirm("你确定删除这个公告?", "提示", {
          confirmButtonText: "确认",
          cancelButtonText: "取消",
          type: "warning",
        });
        const res = await deletNoticeApi(noticeId);
        if (res.code === 200) {
          ElMessage.success("删除成功");
          getAllNotices();
        } else {
          ElMessage.error("删除失败");
        }
      } catch (error) {
        return;
      }
  }
  const previewcontent = async (precontent: string) => {
    textcontent.value = precontent;
    textdialogVisible.value = true;
  }
  const editNotice = async () => {
    const index = tabledata1.findIndex((item) => item.noticeId === nownoticeid.value);
    const item = tabledata1[index];
    const res = await updateNoticeApi({
        noticeId:item.noticeId,
        publishTime:item.publishTime,
        publisher: item.publisher,
        content: textcontent.value,//更新内容
        state: "未发布",
        willTime: new Date(+new Date(item.willTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')[0]
      });
      if (res.code === 200) {
        ElMessage.success("修改成功");
        getAllNotices();
      } else {
        ElMessage.error("修改失败");
      }
      editdialogVisible.value = false;
      getAllNotices()
  }
  const editTimeNotice = async () => {
    const index = tabledata1.findIndex((item) => item.noticeId === nownoticeid.value);
    tabledata1[index].willTime = form.willTime;
    timedialogVisible.value=false;
  }
  </script>
  
  <style scoped lang="scss">
  @import "./index.scss";
  .container {
    margin-right:0;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between; /* 可选 */
    width: 100%;
  }
  .card {
    width: 100%; /* 设置卡片宽度为容器宽度的 100% */
    max-width: 1300px;
    height: 100%;
    padding: 15px;
    margin-right:0%;
  }
  </style>
  