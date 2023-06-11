import { User } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

// 获取用户列表
export const getUsersApi = () => {
    return http.get<User.ResUser>(PORT3 + `/userManage/getUsers`, {}, { headers: { noLoading: true } }); 
};

// 获取游客列表
export const getVisitorsApi = () => {
    return http.get<User.ResVisitor>(PORT3 + `/userManage/getVisitors`, {}, { headers: { noLoading: true } }); 
};

// 新增用户
export const addUserApi = (params: User.ResUser) => {
	return http.post<Boolean>(PORT3 + `/userManage/addUser`, params, { headers: { noLoading: true } }); 
};

// 删除用户
export const deleteUserApi = (userId: number ) => {
    return http.post(`${PORT3}/userManage/deleteUser?userId=${userId}`);
};

// 批量删除用户
export const deleteUsersApi = (userIds: number[]) => {
    return http.post(`${PORT3}/userManage/deleteUsers`, userIds, {
        headers: { "Content-Type": "application/json" },
    });
};

// 更新用户
export const updateUserApi = (params: User.ResUser) => {
	return http.post<Boolean>(PORT3 + `/userManage/updateUser`, params, { headers: { noLoading: true } }); 
};

// 上传EXCEL文件
export const addExcelApi = (params: FormData) => {
	return http.post<String>(PORT3 + `/userManage/getFileExcel`, params, { headers: { noLoading: true } });
};

// 获得当前用户excel文件
export const getNowExcelApi = () => {
    return http.get<User.ResUser>(PORT3 + `/userManage/getNowFileExcel`, {}, { headers: { noLoading: true } }); 
};

// 获得当前用户pdf文件
export const getNowPdfApi = () => {
    return http.get<User.ResUser>(PORT3 + `/userManage/getNowFilePDF`, {}, { headers: { noLoading: true } }); 
};