import { Tool } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

// 获取图片列表
export const getShowImgsApi = () => {
    return http.get<Tool.ResShowImg>(PORT3 + `/toolManage/getShowImgs`, {}, { headers: { noLoading: true } }); 
};

// 新增图片
export const addShowImgApi = (url: string) => {
	return http.post<String>(PORT3 + `/toolManage/addShowImg?url=${url}`);
};

// 删除图片
export const deleteShowImgApi = (url: string ) => {
    return http.post(`${PORT3}/toolManage/deleteShowImg?url=${url}`);
};

// 获取新闻列表
export const getNewsApi = () => {
    return http.get<Tool.ResNews>(PORT3 + `/toolManage/getNews`, {}, { headers: { noLoading: true } }); 
};

// 新增新闻
export const addNewApi = (params: Tool.ResNews) => {
	return http.post<Boolean>(PORT3 + `/toolManage/addNew`, params, { headers: { noLoading: true } });
};

// 删除新闻
export const deleteNewApi = (newsId: number ) => {
    return http.post(`${PORT3}/toolManage/deleteNew?newsId=${newsId}`);
};

// 上传图片
export const addImgApi = (params: FormData) => {
	return http.post<String>(PORT3 + `/toolManage/getImgUrl`, params, { headers: { noLoading: true } });
};

// 获取已发布公告列表
export const getFinalNoticeApi = () => {
    return http.get<Tool.ResNotices>(PORT3 + `/toolManage/getFinalNotices`, {}, { headers: { noLoading: true } }); 
};

// 获取未发布公告列表
export const getUnFinalNoticeApi = () => {
    return http.get<Tool.ResNotices>(PORT3 + `/toolManage/getUnFinalNotices`, {}, { headers: { noLoading: true } }); 
};

// 获取全部公告列表
export const getNoticeApi = () => {
    return http.get<Tool.ResNotices>(PORT3 + `/toolManage/getNotices`, {}, { headers: { noLoading: true } }); 
};

// 新增公告
export const addNoticeApi = (params: Tool.ResNotices) => {
	return http.post<Boolean>(PORT3 + `/toolManage/addNotice`, params, { headers: { noLoading: true } });
};

// 删除公告
export const deletNoticeApi = (noticeId: number ) => {
    return http.post(`${PORT3}/toolManage/deleteNotice?noticeId=${noticeId}`);
};

// 更新公告
export const updateNoticeApi = (params: Tool.ResNotices) => {
	return http.post<Boolean>(PORT3 + `/toolManage/updateNotice`, params, { headers: { noLoading: true } });
};
