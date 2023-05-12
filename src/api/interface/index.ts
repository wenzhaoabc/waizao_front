// * 请求响应参数(不包含data)
export interface Result {
	code: number;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// // * 分页响应参数
// export interface ResPage<T> {
// 	list: T[];
// 	pageNum: number;
// 	pageSize: number;
// 	total: number;
// }

// // * 分页请求参数
// export interface ReqPage {
// 	pageNum: number;
// 	pageSize: number;
// }

// * 文件上传模块 - zst
export namespace Upload {
	export interface ResFileUrl {
		fileName: string,
		fileUrl: string;
		success: boolean
	}
	export interface ResDelFile {
		fileUrl: string;
		success: boolean
	}
}

// * 登录模块 -zst
export namespace Login {
	export interface ReqLoginForm {
		username: string;
		password: string;
	}
	export interface ResLogin {
		accessToken: string;
		refreshToken: string;
		userInfo: Object;
	}
	export interface ResAuthButtons {
		[key: string]: string[];
	}
}

// * 地理几何数据 -zst
export namespace Geometry {
	export interface Polygon {
		type: string,
		coordinates: number[][][]
	}
}

// * 社区点位模块 - zst
export namespace Site {
	export interface SiteImg {
		imgId: number,
		siteId: number,
		imgPath: string,
		imgDesc: string,
		createTime: Date | string
	}
	export interface SiteInfo {
		siteId: number,
		siteLongitude: number,
		siteLatitude: number,
		title: string,
		detail: string,
		panorama?: string,
		communityId: number,
		createTime: Date | string,
		images: SiteImg[]
	}
	export interface CommunityInfo {
		id: number,
		position: string,
		area: Geometry.Polygon,
		name: string,
		introduction: string,
		createTime: Date | string
	}
	export interface ReqCommuEdge {
		communityId: number,
		area: Geometry.Polygon
	}
	export interface ReqAddSite {
		siteLongitude: number,
		siteLatitude: number,
		title: string,
		detail: string,
		panorama?: string,
		communityId: number,
		createTime?: Date | string,
	}
	export interface ReqSiteImg {
		siteId: number,
		imgPath: string,
		imgDesc: string,
	}
	export interface SiteFeedback {
		id: number,
		siteId?: number,
		userId: number,
		title: string,
		content: string,
		siteLongitude: number,
		siteLatitude: number,
		createdTime: string | Date,
		imgList: string[]
	}
	export interface ResResolveFeedback {
		communityId?: number,
		siteName: string,
		feedbackId: number
	}
}

// * 用户管理模块 - zst
export namespace User {
	export interface UserInfo {
		userId: number;
		citizenId: string;
		phone: string;
		wechatId?: string;
		userName?: string;
		avatar?: string;
		sex?: string;
		birthdate?: string;
		roles?: string;
		setting?: string;
		residence?: string;
		created?: string;
	}
	export interface ResUser {
		userId: number;
		citizenId: string;
		phone: string;
		wechatId: string;
		password: string;
		userName: string;
		avatar: string;
		sex: string;
		birthdate: string;
		roles: string;
		setting: string;
		residence: string;
		created: string;
	}
	export interface ResVisitor {
		wechatId: string;
		nickname: string;
		loginTime: string;
		loginAddress: string;
	}
}

// * 工具管理模块
export namespace Tool {
	export interface ResShowImg {
		url: string;
		time: string;
	}
	export interface ResNews {
		newsId: number;
		content: string;
		img: string;
		link: string;
		linkType: string;
		publishTime: string;
	}
	export interface ResNotices {
		noticeId: number;
		publisher: string;
		publishTime: string;
		content: string;
		state: string;
		willTime: string;
	}
}