<template>
  <div>
    <el-table :data="filterTableData" style="width: 100%" height="630px">
      <el-table-column label="姓名" prop="userName" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="微信id" prop="wechatId" />
      <el-table-column label="性别" prop="sex" />
      <el-table-column label="生日" prop="birthdate" />
      <el-table-column label="角色" prop="roles" />
      <el-table-column label="住址" prop="residence" />
      <el-table-column label="创建时间" prop="created" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="按照姓名查询" />
        </template>
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div id="buttons">
      <!-- Form -->
      <el-button type="primary" style="margin-right:15px" @click="dialogFormVisible = true">
        新增村民
      </el-button>
      <el-dialog v-model="dialogFormVisible" title="新增村民信息" style="width:600px">
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
            <el-select v-model="form.roles" multiple placeholder="请选择角色">
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
      <el-dialog v-model="dialogFormVisible1" title="编辑村民信息" style="width:600px">
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
            <el-select v-model="form1.roles" multiple placeholder="请选择角色">
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
            <!-- <el-button type="warning">以EXCEL导入</el-button> -->
            <el-button @click="dialogFormVisible1 = false">取消</el-button>
            <el-button type="primary" @click="updateUser">
              确认
            </el-button>
          </span>
        </template>
      </el-dialog>
      <!-- <el-button type="warning"  @click="exportExcel">导出EXCEL表格</el-button>
      <el-button type="warning">导出PDF</el-button> -->
    </div>
  </div>
</template>

<script setup lang="ts" name="villager">
// import XLSX from "xlsx"
// import * as fileSaver from 'file-saver';
import { reactive, computed, ref, onMounted } from "vue";
import { ElMessageBox, ElForm,ElMessage } from "element-plus";
import { User } from "@/api/interface";
import { getUsersApi, addUserApi, deleteUserApi,updateUserApi } from "@/api/modules/userManage";

//Data
const search = ref("");
const dialogFormVisible = ref(false)
const dialogFormVisible1 = ref(false)
const formLabelWidth = '140px'
const tableData: User.ResUser[] = [
  {
    userId: 0,
    citizenId: "123456",
    phone: "123456",
    wechatId: "123",
    password: "123",
    userName: "张三",
    avatar: "123",
    sex: "123",
    birthdate: "123",
    roles: "123",
    setting: "123",
    residence: "123",
    created: "123"
  },
  {
    userId: 1,
    citizenId: "123456",
    phone: "123456",
    wechatId: "123",
    password: "123",
    userName: "李四",
    avatar: "123",
    sex: "123",
    birthdate: "123",
    roles: "123",
    setting: "123",
    residence: "123",
    created: "123"
  }
];
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
    value: 'admin',
    label: '管理员',
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
onMounted(async () => {
  getAllUser();
  refreshdata();
});
const updateUser = async () => {
  try {
    form1.roles = form1.roles.join(",");
    console.log(form1)
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
  tableData.splice(0, tableData.length, ...data);
  refreshdata();
};
const confirmDialog = async () => {
  try {
    const dateString = new Date().toLocaleString()
    form.created = dateString
    if(form.roles.length==0){
      ElMessage.error('请选择角色')
      return
    }
    form.roles = form.roles.join(",");
    form.birthdate=new Date(+new Date(form.birthdate) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').split(' ')[0]
    const { data } = await addUserApi({ ...form });
    console.log(data);
    dialogFormVisible.value = false
    getAllUser();
    ElMessage({
      message: '添加成功',
      type: 'success',
    })
    refreshdata();
    Object.keys(form).forEach(key => {
      form[key] = "";
    });//清空表单
  } catch (error) {
    console.log(error);
    ElMessage.error('添加失败')
  }
}
const filterTableData = computed(() =>
  tableData.filter(
    (data) =>
      !search.value || data.userName.toLowerCase().includes(search.value.toLowerCase())
  )
);
const handleEdit = (index: number, row: User.ResUser) => {
  dialogFormVisible1.value = true
  Object.keys(form1).forEach(key => {
      if (key != "roles") {
          form1[key] = row[key];
      } else {
          form1[key] = ""
      }
    });//赋值
};
const handleDelete = async (index: number, row: User.ResUser) => {
  try {
    await ElMessageBox.confirm("你确定删除这个村民的信息吗?", "提示", {
      confirmButtonText: "确认",
      cancelButtonText: "取消",
      type: "warning",
    });

    const index = tableData.findIndex((item) => item.userId === row.userId);
    tableData.splice(index, 1);
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
// const exportExcel = () => {
//   const sheetData = tableData as any[]
//   const worksheet = XLSX.utils.json_to_sheet(sheetData)
//   const workbook = XLSX.utils.book_new()
//   XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1')
//   const binaryData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' })
//   const blob = new Blob([s2ab(binaryData)], { type: 'application/octet-stream' })
//   fileSaver.saveAs(blob, 'table.xlsx')
// }
// const s2ab = (s: any) => {
//   const buf = new ArrayBuffer(s.length)
//   const view = new Uint8Array(buf)
//   for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
//   return buf
// }
</script>

<style scoped>
#buttons {
  margin-top: 20px;
  text-align: right;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}

.el-input {
  width: 300px;
}
</style>
