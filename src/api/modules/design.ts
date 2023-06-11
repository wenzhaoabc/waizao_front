import http from "@/api";
import { PORT3 } from "@/api/config/servicePort";
import { Design } from "../interface";

// * 获取所有的设计元素
export const getAllDesignElementApi = () => {
    return http.get<Design.Type[]>(PORT3 + `/design/all-item`, {}, { headers: { noLoading: true } });
}

// * 添加设计元素
export const addDesignItem = (params: Design.ReqAddItem) => {
    return http.post<Design.Item>(PORT3 + `/design/add-item`, params, {});
}

// * 添加设计类型
export const addDesignType = (params: Design.ReqAddType) => {
    return http.post<Design.Type>(PORT3 + `/design/add-type`, params, {});
}

// * 获取所有AR模型
export const getAllArModel = () => {
    return http.get<Design.ARModel[]>(PORT3 + `/design/ar`, {}, {})
}

// * 添加新的AR模型
export const addNewArModel = (params: Design.ReqAddAR) => {
    return http.post<Design.ARModel>(PORT3 + `/design/add-ar`, params, {})
}

// * 删除AR模型
export const deleteArModelApi = (arId: number) => {
    return http.delete<boolean>(PORT3 + `/design/ar-id`, { id: arId }, {})
}

// * 删除某一类型
export const deleteTypeApi = (typeId: number) => {
    return http.delete<boolean>(PORT3 + `/design/type-id`, { typeId: typeId }, {})
}

// * 删除某一个元素
export const deleteItemApi = (itemId: number) => {
    return http.delete<boolean>(PORT3 + `/design/item-id`, { itemId: itemId }, {})
}

// * 获取某个社区所有点位的设计稿
export const getSiteDesignApi = () => {
    let params = { cId: 1 }
    return http.get<Design.SiteDesign[]>(PORT3 + `/design/site-community`, params, {});
}