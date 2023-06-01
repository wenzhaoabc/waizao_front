import { Content } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 内容管理模块
 */
// * 获取分享列表
export const getSquareApi = () => {
	return http.get<Content.ResSquare>(PORT3 + `/share/getUnShares`, {}, { headers: { noLoading: true } });
};

// * 获取含敏感词分享列表
export const getMinganApi = () => {
	return http.get<Content.ResSquare[]>(PORT3 + `/share/getMingan`, {}, { headers: { noLoading: true } });
};

// 驳回分享
export const deleteSquareApi = (shareId: number) => {
	return http.get(`${PORT3}/share/deleteShare?shareId=${shareId}`);
};

// 批准分享
export const approveSquareApi = (shareId: number) => {
	return http.get(`${PORT3}/share/approveShare?shareId=${shareId}`);
};
