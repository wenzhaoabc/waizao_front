<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="新密码" prop="pass">
        <el-input v-model="ruleForm.pass" type="password" autocomplete="off" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input v-model="ruleForm.checkPass" type="password" autocomplete="off" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="changeUserPwd">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { changeUserPwdApi } from '@/api/modules/login'
const dialogVisible = ref(false);

// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  pass: '',
  checkPass: '',
})
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不可为空'))
  } else {
    if (ruleForm.checkPass !== '') {
      if (!ruleFormRef.value) return
      ruleFormRef.value.validateField('checkPass', () => null)
    }
    callback()
  }
}
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('请再次输入密码'))
  } else if (value !== ruleForm.pass) {
    callback(new Error("两次输入不一致"))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  pass: [{ validator: validatePass, trigger: 'blur' }],
  checkPass: [{ validator: validatePass2, trigger: 'blur' }],
})

const changeUserPwd = () => {
  ruleFormRef.value?.validate(async (valid) => {
    if (valid) {
      const data = await changeUserPwdApi(ruleForm.pass);
      if (data.data == true) {
        ElMessage({ message: "修改成功", type: "success" })
        ruleForm.checkPass = ""
        ruleForm.pass = ""
        dialogVisible.value = false
      } else {
        ElMessage({ message: "修改失败", type: "error" })
      }
    } else {
      ElMessage({ message: "输入不合法", type: "warning" })
    }
  })

}

</script>
