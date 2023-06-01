<template>
	<div>
		<div style="text-align: center">
			<el-input v-model="input1" size="large" placeholder="输入关键词搜索" :prefix-icon="Search" style="width: 400px" />
			<el-select v-model="value" placeholder="筛选" size="large" style="margin-left: 20px">
				<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
			</el-select>
			<el-button type="primary" style="margin-left: 15px;" @click="reset()">
				重置
			</el-button>
		</div>

		<div>
			<el-row :span="4" v-for="(item,index) in filterTableData" :key="index" :offset="1" style="margin-top: 10px">
				<el-card :body-style="{
					padding: '15px',
					width: '1300px',
					height: '120px',
				}" shadow="hover">
					<span>提问内容：{{ item.content }}</span>
					<div style="display: flex">
						<h5 style="width: 200px">村民id：{{ item.wechatId }}</h5>
						<h5 style="width: 300px">发布时间：{{ item.feedbackTime }}</h5>
						<h5 style="width: 300px">状态：{{ item.replyState }}</h5>
					</div>
					<el-button v-show="item.replyState == '未回复' " type="primary"
						style="margin-right:15px;margin-bottom: 15px;height: 30px;" @click="showReply(item.feedbackId)">
						回复
					</el-button>
					<h5 v-show="item.replyState != '未回复'">回复内容：{{ item.replyContent }} &nbsp; 回复时间：{{ item.replyTime }}</h5>
				</el-card>
				
			</el-row>
		</div>
		<el-dialog v-model="show" title="回复反馈" style="width:600px">
        <el-form>
          <el-form-item label="回复内容">
            <el-input v-model="replyContent" autocomplete="off" clearable />
          </el-form-item>
				</el-form>
				<template #footer>
          <span class="dialog-footer">
            <el-button @click="show = false">取消</el-button>
            <el-button type="primary" @click="addReply()">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>

	</div>
</template>

<script setup lang="ts" name="villagerMess">
import { Search } from "@element-plus/icons-vue";
import { Feedback } from "@/api/interface";
import { getFeedbackApi, addReplyApi } from "@/api/modules/feedbackManager";
import { reactive, computed, ref, onMounted } from "vue";
import { ElMessageBox, ElForm, ElMessage } from "element-plus";


const tabledata: Feedback.ResFeedback[] = [
	{
		feedbackId: 0,
		type: "",
		content: "",
		wechatId: "",
		userType: "",
		feedbackTime: "",
		replyContent: "",
		replyTime: "",
		replyState: "",
		replyEr: ""
	},
];

const value = ref("");
const feedbackId = ref(0);
const show = ref(false);
const replyContent = ref("");
const input1 = ref("");
const options = [
	{
		value: "已回复",
		label: "已回复",
	},
	{
		value: "未回复",
		label: "未回复",
	},
];
const search = ref("村民");

const shortcuts = [
	{
		text: "Last week",
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
			return [start, end];
		},
	},
	{
		text: "Last month",
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
			return [start, end];
		},
	},
	{
		text: "Last 3 months",
		value: () => {
			const end = new Date();
			const start = new Date();
			start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
			return [start, end];
		},
	},
];

const filterTableData = computed(() =>
	tabledata.filter(
		(data) =>
			data.userType == search.value
			&&  (value.value == ""?data.userType == search.value:data.replyState == value.value) 
			&& data.content.includes(input1.value)
	)
);
//
onMounted(async () => {
	getAllFeedback();
	refreshdata();
});

const refreshdata = () => {
	search.value = ""
	search.value = "村民"
	//此步是为了触发computed
};

const getAllFeedback = async () => {
	const { data } = await getFeedbackApi();
	console.log(data);
	tabledata.splice(0, tabledata.length, ...data);
	refreshdata();
};

const reset = () => {
	value.value=""
	input1.value=""
};

const addReply = async () => {
	if(replyContent.value==""){
		ElMessage({
			message: '答复内容不能为空',
			type: 'warning',
		})
	}else{
		const reply: Feedback.ResReply = {
		feedbackId: feedbackId.value,
		replyContent: replyContent.value,
		replyEr: "管理员"
	};

	const { data } = await addReplyApi(reply);
	console.log(data);
	if(data!=null){
		ElMessage({
			message: '回复成功',
			type: 'success',
		})
		getAllFeedback();
		refreshdata();
	}else{
		ElMessage.error('网络错误，回复失败')
	}
	show.value=false
	replyContent.value=""
	}
};

const showReply = (id: number) => {
  show.value = true
  feedbackId.value=id
};
</script>

<style scoped></style>
