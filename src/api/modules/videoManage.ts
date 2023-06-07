import { Video } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import http from "@/api";

// 获取视频列表
export const getVideosApi = () => {
    return http.get<Video.ResVideo>(PORT3 + `/video/getVideos`, {}, { headers: { noLoading: true } }); 
};

// 获取我的视频列表
export const getMyVideosApi = (phone: string ) => {
    return http.post(`${PORT3}/Videouser/findrecord?phone=${phone}`);
};

// 删除视频记录
export const deleteVideosApi = (videoId: number ) => {
    return http.post(`${PORT3}/video/deleteVideo?videoId=${videoId}`);
};

// 删除我的视频记录
export const deleteMyVideosApi = (userphone:string,video: number ) => {
    return http.post(`${PORT3}/Videouser/deleteUserVideo?userphone=${userphone}&video=${video}`);
};