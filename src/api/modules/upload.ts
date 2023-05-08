import { Upload } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 文件上传模块
 * @since 05/08
 */
// * 单图片上传
export const uploadImg = (params: FormData) => {
	return http.post<Upload.ResFileUrl>(PORT3 + `/file/upload-single`, params);
};

// * 视频上传
export const uploadVideo = (params: FormData) => {
	return http.post<Upload.ResFileUrl>(PORT3 + `/file/upload-single`, params);
};

// * 单文件上传
export const upLoadSingleFile = (params: FormData) => {
	return http.post<Upload.ResFileUrl>(PORT3 + `/file/upload-single`, params);
}

// * 多文件上传
export const upLoadMultiFiles = (params: FormData) => {
	return http.post<Upload.ResFileUrl[]>(PORT3 + `/file/upload`, params);
}

// * 删除单文件
export const deleteSingleFile = (fileUrl: string) => {
	return http.delete<Upload.ResDelFile>(PORT3 + `/file/delete-single`, { url: fileUrl }, { headers: { noLoading: true } });
}

// * 删除多文件
export const deleteMultiFiles = (params: string[]) => {
	return http.post<Upload.ResDelFile[]>(PORT3 + `/file/delete`, params, { headers: { noLoading: true } });
}