import http from "@/api";
import { Site } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";

/**
 * 获取社区的所有点位
 * @param communityId 社区ID
 * @returns 点位列表
 */
export const getCommunitySites = (communityId: number) => {
    return http.get<Site.SiteInfo[]>(PORT3 + `/site/get-community`, { id: communityId }, { headers: { noLoading: true } });
}

/**
 * 获取当前社区的信息
 */
export const getCommunityInfo = (communityId: number) => {
    return http.get<Site.CommunityInfo>(PORT3 + `/community/get-id`, { id: communityId }, { headers: { noLoading: true } });
}

/**
 * 更新社区的地理边界
 * @param params 社区地理边界信息
 * @returns 
 */
export const updateCommunityEdge = (params: Site.ReqCommuEdge) => {
    const area = JSON.stringify(params.area);
    return http.post<boolean>(PORT3 + `/community/change-area`, { ...params, area }, { headers: { noLoading: true } });
}