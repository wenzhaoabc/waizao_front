<template>
  <div>
    <div id="buttons">
      <!-- Form -->
      <el-button type="danger" @click="multiDelete()">多选删除</el-button>
      <el-button type="warning" @click="downloadExcel">下载EXCEL模版</el-button>
      <el-upload
        ref="uploadFile"
        action='#'
        :before-upload="beforeUpload"
        :limit="1"
        :http-request="uploadAction"
        :on-exceed="handleExceed"
        style="display: inline-block;margin-left:1%;margin-right:1%"
      >
      <el-button class="box_text" type="warning">批量导入用户</el-button>
      </el-upload>
      <el-button type="primary" style="margin-right:2%" @click="dialogFormVisible = true">
        新增村民
      </el-button>
      <el-button type="success" @click="exportToExcel()">
        导出EXCEL表格
      </el-button>
      <el-button type="success" @click="exportToPdf()">
        导出PDF
      </el-button>
      <el-dialog v-model="dialogFormVisible" title="新增用户信息" style="width:600px">
        <el-form :model="form" :rules="addUserRules">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form.userName" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="form.citizenId" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form.phone" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="微信id" :label-width="formLabelWidth">
            <el-input v-model="form.wechatId" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker v-model="form.birthdate" type="date" placeholder="请选择你的出生日期" :label-width="formLabelWidth" />
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="form.roles" placeholder="请选择角色">
              <el-option v-for="item in rolesoptions" :key="item.value" :label="item.label" :value="item.value"
                clearable />
            </el-select>
          </el-form-item>
          <el-form-item label="住址" :label-width="formLabelWidth">
            <el-input v-model="form.residence" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" value="male" />
              <el-option label="女" value="female" />
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
            <el-input v-model="form.password" type="password" autocomplete="off" clearable show-password />
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
      <el-dialog v-model="dialogFormVisible1" title="编辑用户信息" style="width:600px">
        <el-form :model="form1" :rules="addUserRules">
          <el-form-item label="姓名" :label-width="formLabelWidth">
            <el-input v-model="form1.userName" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="身份证号" :label-width="formLabelWidth">
            <el-input v-model="form1.citizenId" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="电话号码" :label-width="formLabelWidth">
            <el-input v-model="form1.phone" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="微信id" :label-width="formLabelWidth">
            <el-input v-model="form1.wechatId" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="生日" :label-width="formLabelWidth">
            <el-date-picker v-model="form1.birthdate" type="date" placeholder="请选择你的出生日期" :label-width="formLabelWidth" />
          </el-form-item>
          <el-form-item label="角色" :label-width="formLabelWidth">
            <el-select v-model="form1.roles" placeholder="请选择角色">
              <el-option v-for="item in rolesoptions" :key="item.value" :label="item.label" :value="item.value"
                clearable />
            </el-select>
          </el-form-item>
          <el-form-item label="住址" :label-width="formLabelWidth">
            <el-input v-model="form1.residence" autocomplete="off" clearable />
          </el-form-item>
          <el-form-item label="性别" :label-width="formLabelWidth">
            <el-select v-model="form1.sex" placeholder="请选择性别">
              <el-option label="男" value="male" />
              <el-option label="女" value="female" />
            </el-select>
          </el-form-item>
          <el-form-item label="密码" prop="pass" :label-width="formLabelWidth">
            <el-input v-model="form1.password" type="password" autocomplete="off" clearable show-password />
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogFormVisible1 = false">取消</el-button>
            <el-button type="primary" @click="updateUser">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- <el-button type="warning"  @click="exportExcel">导出EXCEL表格</el-button> -->
      <!-- <el-button type="warning">导出PDF</el-button> -->
    </div>
    <el-table :data="filterTableData" style="width: 100%;" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" />
      <el-table-column label="姓名" prop="userName" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="微信id" prop="wechatId" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column label="生日" prop="birthdate" />
      <el-table-column label="角色" prop="roles" />
      <el-table-column label="住址" prop="residence" width="180"/>
      <el-table-column label="创建时间" prop="created" width="180"/>
      <el-table-column align="right" width="160">
        <template #header>
          <el-input v-model="search" size="small" placeholder="按照姓名查询" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts" name="villager">
// import XLSX from "xlsx"
// import * as fileSaver from 'file-saver';
import { GlobalStore } from '@/stores';
import { reactive, computed, ref, onMounted } from "vue";
import { ElMessageBox, ElForm, ElMessage } from "element-plus";
import type { UploadRawFile, UploadFile,  Action } from 'element-plus';
import { User } from "@/api/interface";
import { getUsersApi, addUserApi, deleteUserApi,deleteUsersApi, updateUserApi, addExcelApi,getNowExcelApi ,getNowPdfApi} from "@/api/modules/userManage";

const multipleSelection = ref<User.ResUser[]>([])

const uploadFile = ref();
const state = reactive({
    fileList: [],
    fileName: '',
})

const dialogFormVisible = ref(false)
const search = ref("")
const dialogFormVisible1 = ref(false)
const formLabelWidth = '140px'
const tableData = ref<User.ResUser[]>([]);
const form = reactive<User.ResUser>({
  userId: 0,
  citizenId: "",
  phone: "",
  wechatId: "",
  password: "",
  userName: "",
  avatar: "",
  sex: "",
  birthdate: "",
  roles: "",
  setting: "",
  residence: "",
  created: ""
})
const form1 = reactive<User.ResUser>({
  userId: 0,
  citizenId: "",
  phone: "",
  wechatId: "",
  password: "",
  userName: "",
  avatar: "",
  sex: "",
  birthdate: "",
  roles: "",
  setting: "",
  residence: "",
  created: ""
})
const rolesoptions = [
  {
    value: 'user',
    label: '村民',
  },
  {
    value: 'manager',
    label: '村委会',
  },
]
// 定义 formRef（校验规则）
type FormInstance = InstanceType<typeof ElForm>;
const addUserFormRef = ref<FormInstance>();
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Please input the password'))
  } else {
    if (form.password !== '') {
      if (!addUserFormRef.value) return
      addUserFormRef.value.validateField('pass', () => null)
    }
    callback()
  }
}
const addUserRules = reactive({
  pass: [{ validator: validatePass, trigger: 'blur' }],
});

//Methods
const multiDelete = async () => {
  console.log(multipleSelection.value)
  const userIds = multipleSelection.value.map(item => item.userId);
  console.log("下面是用户的id")
  console.log(userIds);
  const globalStore = GlobalStore();
  console.log("下面是用户的角色")
  console.log(globalStore.userInfo.roles)
  if (!globalStore.userInfo.roles.includes('manager')) {
    console.warn('警告：roles数组中不包含manager！');
    ElMessage.error("删除失败，您不是管理员");
    return;
  }
  try {
    const len=userIds.length
    await ElMessageBox.confirm(`共${len}个用户，你确定删除这些用户的信息吗?`, "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });

    const { data } = await deleteUsersApi(userIds);
    getAllUser();
    console.log(data);
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
  } catch (error) {
    ElMessage.error('删除失败')
  }
}
const handleSelectionChange = (val: User.ResUser[]) => {
  multipleSelection.value = val
  // console.log(multipleSelection.value)
}

onMounted(async () => {
  getAllUser();
  refreshdata();
});
const updateUser = async () => {
  try {
    console.log(form1)
    if(form1.roles.length==0){
      ElMessage.error('请选择角色')
      return
    }
    form1.birthdate = new Date(+new Date(form1.birthdate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')[0]
    const { data } = await updateUserApi({ ...form1 });
    console.log(data);
    dialogFormVisible1.value = false
    getAllUser();
    refreshdata();
    ElMessage({
      message: '修改成功',
      type: 'success',
    })
  } catch {
    ElMessage.error('修改失败')
  }
}
const getAllUser = async () => {
    const { data } = await getUsersApi();
    console.log(data);
    tableData.value.splice(0, tableData.value.length, ...data);
    // 遍历tableData数组，替换sex和roles属性
    tableData.value = tableData.value.map((item) => {
    // 将sex属性中的'male'替换为'男'，'female'替换为'女'
    item.sex = item.sex === 'male' ? '男' : '女';
    // 将roles属性中的'admin'替换为'村委会'，'manager'替换为'管理员'，'user'替换为'村民'
    // 将多个角色用逗号分隔，并分割成角色数组
    const rolesArray = item.roles.split(',');
    // 遍历角色数组，替换角色名称
    item.roles = rolesArray.map((role) => {
      switch (role) {
        case 'admin':
          return '村委会';
        case 'manager':
          return '管理员';
        case 'user':
          return '村民';
        default:
          return role;
      }
    }).join(','); // 将替换后的角色数组用逗号拼接成字符串

      // 输出替换后的roles属性
      console.log(item.roles);

    return item;
  });
  refreshdata();
};
const confirmDialog = async () => {
  try {
    const dateString = new Date().toLocaleString().replace(/\//g, "-");
    form.created = dateString
    if(form.roles.length==0){
      ElMessage.error('请选择角色')
      return
    }
    form.birthdate = new Date(+new Date(form.birthdate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')[0]
    console.log(form)
    const { data } = await addUserApi({ ...form });
    console.log(data);
    dialogFormVisible.value = false
    getAllUser();
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
    Object.keys(form).forEach(key => {
      form[key] = "";
    });//清空表单
  } catch (error) {
    console.log(error);
    ElMessage.error('添加失败')
  }
}
const filterTableData = computed(() =>
  tableData.value.filter(
    (data) =>
      !search.value || data.userName.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User.ResUser) => {
  console.log(row['roles'])
  const nowrow = row['roles']
  if (nowrow.includes('manager')) {
    const globalStore = GlobalStore();
    console.log("下面是用户的角色")
    console.log(globalStore.userInfo.roles)
    if (!globalStore.userInfo.roles.includes('manager')) {
      console.warn('警告：roles数组中不包含manager！');
      ElMessage.error("编辑失败，您不是管理员");
      return;
    }
  } 
  dialogFormVisible1.value = true
  Object.keys(form1).forEach(key => {
      form1[key] = row[key];
  });//赋值
};
const handleDelete = async (index: number, row: User.ResUser) => {
  const globalStore = GlobalStore();
  console.log("下面是用户的角色")
  console.log(globalStore.userInfo.roles)
  if (!globalStore.userInfo.roles.includes('manager')) {
    console.warn('警告：roles数组中不包含manager！');
    ElMessage.error("删除失败，您不是管理员");
    return;
  }
  try {
    await ElMessageBox.confirm("你确定删除这个用户的信息吗?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });

    const index = tableData.value.findIndex((item) => item.userId === row.userId);
    tableData.value.splice(index, 1);
    refreshdata();
    console.log(row.userId)
    const { data } = await deleteUserApi(row.userId);
    console.log(data);
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
  } catch (error) {
    ElMessage.error('删除失败')
  }
};
const refreshdata = () => {
  search.value = "1";
  search.value = ""; //此步是为了触发computed
};

const downloadExcel=()=> {
  // const url = "/example.xlsx";
  const url ="http://1.15.177.18:8080/例子.xlsx"
  const downloadWindow = window.open(url, "_blank");
  downloadWindow?.focus();
  setTimeout(() => {
    downloadWindow?.close();
  }, 2000);
}

 //上传文件之前先判断该文件是否是Excel文件
const beforeUpload=(file: UploadRawFile) =>{
  const suffix = file.name.substr(file.name.lastIndexOf('.') + 1).toLowerCase();
  if (suffix !== 'xlsx') {
    ElMessage.error('上传的文件必须是 XLSX 格式!');
    return false;
  } else if (file.size / 1024 / 1024 > 2) {
    ElMessage.error('文件大小不能超过2MB!');
    return false;
  }
  return true;
}
//上传超过限制
const handleExceed = (files: File[], fileList: UploadFile[]) => {
    if (state.fileList.length >= 1) {
        ElMessage.error('只能上传一个图片')
        return;
    }
}

const uploadAction = async (option: any) => {
  console.log("下面是获取到的文件")
  console.log(option.file)
  const formData = new FormData();
  formData.append("file", option.file);
  try {
    const { data } = await addExcelApi(formData);
    console.log(data);
    getAllUser();
    ElMessage({
      message: "成功",
      type: "success",
    });
    uploadFile.value.clearFiles()
  } catch (error) {
    ElMessage.error("上传失败");
  }
}
const exportToExcel = async function () {
  const { data } = await getNowExcelApi();
  console.log(data)
  const url = data.fileUrl;
  const downloadWindow = window.open(url, "_blank");
  downloadWindow?.focus();
  setTimeout(() => {
    downloadWindow?.close();
  }, 2000);
}

const exportToPdf = async function () {
  const { data } = await getNowPdfApi();
  console.log(data)
  const url = data.fileUrl;
  const downloadWindow = window.open(url, "_blank");
  downloadWindow?.focus();
}
</script>

<style scoped>
#buttons {
  width:100%;
  right:5%;
  margin-bottom: 1%;
  text-align: right;
}

.dialog-footer button:first-child {
  margin-right: 10%;
}

.el-input {
  width: 300px;
}
</style>
