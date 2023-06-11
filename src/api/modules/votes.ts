import http from "@/api";
import { PORT3 } from "@/api/config/servicePort";
import { Vote } from "../interface";

// * 获取正在进行中的投票
export const getOnVotesApi = (cId: number = 1) => {
    return http.get<Vote.ResVotes>(PORT3 + `/vote/in-process`, { cId: cId }, {})
}

// * 获取全部投票
export const getAllVotesApi = (cId: number = 1) => {
    return http.get<Vote.ResVotes>(PORT3 + `/vote/all`, { cId: cId }, {})
}

// * 设为终稿
export const setFinalDesignApi = (vote: Vote.DesignVote) => {
    return http.post<boolean>(PORT3 + `/vote/set-final`, vote, {})
}