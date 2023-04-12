import { Tool } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

// 获取图片列表
export const getShowImgsApi = () => {
    return http.get<Tool.ResShowImg>(PORT3 + `/toolManage/getShowImgs`, {}, { headers: { noLoading: true } }); 
};

// 新增图片
export const addShowImgApi = (params: Tool.ResShowImg) => {
	return http.post<Boolean>(PORT3 + `/toolManage/addShowImg`, params, { headers: { noLoading: true } }); 
};

// 删除图片
export const deleteShowImgApi = (url: string ) => {
    return http.post(`${PORT3}/toolManage/deleteShowImg?url=${url}`);
};
