<template>
  <div class="card content-box">
    <WangEditor height="400px" v-model:value="textcontent" />
    <div>
      <el-button @click="nowpublish">即时发布</el-button>
      <el-button @click="dialogFormVisible=true">定时发布</el-button>
      <el-button type="primary" @click="dialogVisible = true">内容预览</el-button>
      <el-dialog v-model="dialogVisible" title="富文本内容预览" width="1300px" top="50px">
        <div class="view" v-html="textcontent" />
      </el-dialog>
    </div>
    <el-dialog v-model="dialogFormVisible" title="确认时间" style="width:500px;height: 250px">
      <el-form :model="form">
        <el-form-item label="发布日期" :label-width="formLabelWidth">
          <el-date-picker v-model="form.willTime" type="date" placeholder="请选择发布日期" :label-width="formLabelWidth" />
        </el-form-item>
      </el-form>
      <el-form-item style="margin-left:200px">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="laterpublish">确认</el-button>
      </el-form-item>
      <!-- <template #footer>
        <span class="dialog-footer" style="margin-top:0px">
          
        </span>
      </template> -->
    </el-dialog>
  </div>
</template>

<script setup lang="ts" name="editNotice">
import { ref,reactive } from "vue";
import WangEditor from "@/components/WangEditor/index.vue";
import { ElMessageBox, ElForm,ElMessage } from "element-plus";
import { Tool } from "@/api/interface";
import { getFinalNoticeApi,getUnFinalNoticeApi,getNoticeApi,addNoticeApi,deletNoticeApi,updateNoticeApi } from "@/api/modules/toolManage";
const textcontent = ref("");
const dialogVisible = ref(false);
const dialogFormVisible = ref(false);
const formLabelWidth = '140px'
const form= reactive({
  willTime: ""
})
const nowpublish = async () => {
    // console.log(textcontent.value);
    const res = await addNoticeApi({
        noticeId:0,
        publishTime:new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),
        publisher: "村委会",
        content: textcontent.value,
        state: "已发布",
        willTime:""
    });
    if (res.code === 200) {
      ElMessage.success("发布成功");
    } else {
      ElMessage.error("发布失败");
    }
};
const laterpublish = async () => {
  // console.log(textcontent);
  const res = await addNoticeApi({
        noticeId:0,
        publishTime:"",
        publisher: "村委会",
        content: textcontent.value,
        state: "未发布",
        willTime:new Date(+new Date(form.willTime) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')[0]
    });
    if (res.code === 200) {
      ElMessage.success("提交成功");
    } else {
      ElMessage.error("提交失败");
    }
    dialogFormVisible.value = false;
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
