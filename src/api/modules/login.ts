import { Login, ResultData, User } from "@/api/interface/index";
import { PORT3 } from "@/api/config/servicePort";
import DynamicRouter from "@/assets/json/dynamicRouter.json";
import AuthButtons from "@/assets/json/authButtons.json";
import qs from "qs";
import http from "@/api";
import { GlobalStore } from "@/stores";

/**
 * @name 登录模块
 */
// * 用户登录
export const loginApi = (params: Login.ReqLoginForm) => {
	return http.post<Login.ResLogin>(PORT3 + `/auth/login`, params, { headers: { noLoading: true } }); // 正常 post json 请求  ==>  application/json
};

// * 获取按钮权限
export const getAuthButtonListApi = () => {
	// return http.get<Login.ResAuthButtons>(PORT1 + `/auth/buttons`, {}, { headers: { noLoading: true } });
	// 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtons.json 数据
	return AuthButtons;
};

// * 判断某一角色是否有对该路由的访问权限
export const hasPermission = (route: any, roles: Array<string>) => {
	// if (route.children && route.children.length > 0) {
	// 	return true;
	// }
	if (route.meta && route.meta.roles) {
		return roles.some(role => route.meta.roles.includes(role));
	} else {
		return false;
	}
};

export const filterAsyncRoutes = (routes: Array<any>, roles: Array<string>) => {
	// console.log("routes = ", routes, "roles = ", roles);
	const res: Array<any> = [];
	routes.forEach(route => {
		const temp = { ...route };
		if (hasPermission(temp, roles)) {
			if (temp.children) {
				temp.children = filterAsyncRoutes(temp.children, roles);
			}
			res.push(temp);
		}
	});
	return res;
};

// * 获取菜单列表
export const getAuthMenuListApi = () => {
	// return http.get<Menu.MenuOptions[]>(PORT1 + `/menu/list`, {}, { headers: { noLoading: true } });
	// 如果想让菜单变为本地数据，注释上一行代码，并引入本地 dynamicRouter.json 数据
	// 动态过滤路由，根据meta项的roles属性过滤，roles项设置在最底层子路由上
	return new Promise<ResultData<Menu.MenuOptions[]>>(resolve => {
		const globalStore = GlobalStore();
		const accessRoutes = filterAsyncRoutes(DynamicRouter.data, globalStore.userInfo?.roles);
		console.log("userInfo = ", globalStore.userInfo);
		resolve({ code: 200, data: accessRoutes, msg: "success" });
		console.log({ accessRoutes });
	});
	return DynamicRouter;
};

// * 用户退出登录
export const logoutApi = () => {
	const globalStore = GlobalStore();
	const params = { refreshToken: globalStore.refreshToken };
	// localStorage.clear();
	return http.post<ResultData>(PORT3 + `/auth/logout`, qs.stringify(params));
};

// * 获取用户个人信息
export const getUserInfoApi = (userId: number) => {
	return http.get<User.UserInfo>(PORT3 + "/auth/any-userinfo", { userId: userId }, { headers: { noLoading: true } });
}

// * 修改用户密码
export const changeUserPwdApi = (password: string) => {
	let form = new FormData();
	form.append("password", password)
	return http.post<boolean>(PORT3 + `/auth/change-pwd`, form, {});
}