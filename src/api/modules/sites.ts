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

/**
 * 添加点位
 * @param params 点位信息
 * @returns 
 */
export const addNewSiteApi = (params: Site.ReqAddSite) => {
    return http.post<Site.SiteInfo>(PORT3 + `/site/add-site`, params, {});
}

/**
 * 添加点位图片
 * @param params 点位图片信息
 * @returns 
 */
export const addSiteImageApi = (params: Site.ReqSiteImg) => {
    return http.post<Site.SiteImg>(PORT3 + `/site/add-img`, params, {});
}

/**
 * 获取某个社区内的点位反馈信息
 */
export const getSiteFeedbackApi = (communityId: number | string) => {
    return http.get<Site.SiteFeedback[]>(PORT3 + `/site/community-feedback`, { communityId }, { headers: { noLoading: true } });
}

/**
 * 获取某一个点位的信息
 */
export const getSiteInfoApi = (siteId: number) => {
    return http.get<Site.SiteInfo>(PORT3 + `/site/get-id`, { id: siteId }, { headers: { noLoading: true } });
}

/**
 * 处理点位反馈信息
 */
export const resolveSiteFeedbackApi = (parmas: Site.ResResolveFeedback) => {
    return http.post<boolean>(PORT3 + `/site/resolve-feedback`, parmas, { headers: { noLoading: true } });
}
