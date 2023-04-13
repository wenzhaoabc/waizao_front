// * 请求响应参数(不包含data)
export interface Result {
	code: string;
	msg: string;
}

// * 请求响应参数(包含data)
export interface ResultData<T = any> extends Result {
	data: T;
}

// * 分页响应参数
export interface ResPage<T> {
	list: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// * 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// * 文件上传模块
export namespace Upload {
	export interface ResFileUrl {
		fileUrl: string;
	}
}

// * 登录模块
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

// * 用户管理模块
export namespace User {
	export interface ResUser {
		userId: number;
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
	export interface ResNews{
		newsId: number;
		content: string;
		img: string;
		link: string;
		linkType: string;
		publishTime: string;
	}
	export interface ResNotices{
		noticeId: number;
		publisher: string;
		publishTime: string;
		content: string;
		state: string;
		willTime: string;
	}
}