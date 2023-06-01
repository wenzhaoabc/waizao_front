import { Feedback } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

/**
 * @name 反馈管理模块
 */
// * 获取反馈列表
export const getFeedbackApi = () => {
	return http.get<Feedback.ResFeedback>(PORT3 + `/feedback/getAllFeedback`, {}, { headers: { noLoading: true } });
};

// 新增回复
export const addReplyApi = (params: Feedback.ResReply) => {
	return http.post<Feedback.ResFeedback>(PORT3 + `/feedback/addReply`, params, { headers: { noLoading: true } });
};
