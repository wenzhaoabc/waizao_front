# DaoXiangLi

### 介绍 📖

到乡里后台项目开发，基于Geeker Admin模板,Geeker Admin(https://github.com/HalseySpicy/Geeker-Admin)

### 在线预览 👀

- Link：http://daoxaingli.com

### 代码仓库 ⭐

- GitHub：https://github.com/wenzhaoabc/waizao_front

### 项目文档 📚

- Geeker Admin文档地址（持续更新中）：https://docs.spicyboy.cn

### 安装使用步骤 📔

- **Clone：**

```text
# GitHub
git clone https://github.com/wenzhaoabc/waizao_front.git
```

- **Install：**

```text
npm install

# npm install 安装失败，请升级 nodejs 到 16 以上，或尝试使用以下命令：
npm install --registry=https://registry.npm.taobao.org
```

- **Run：**

```text
npm run dev
npm run serve
```

- **Build：**

```text
# 开发环境
npm run build:dev

# 测试环境
npm run build:test

# 生产环境
npm run build:pro
```

- **Lint：**

```text
# eslint 检测代码
npm run lint:eslint
```


### 文件资源目录 📚

```text
Geeker-Admin
├─ .vscode                # VSCode 推荐配置
├─ public                 # 静态资源文件（该文件夹不会被打包）
├─ src
│  ├─ api                 # API 接口管理
│  ├─ assets              # 静态资源文件
│  ├─ components          # 全局组件
│  ├─ config              # 全局配置项
│  ├─ directives          # 全局指令文件
│  ├─ enums               # 项目常用枚举
│  ├─ hooks               # 常用 Hooks 封装
│  ├─ languages           # 语言国际化 i18n
│  ├─ layouts             # 框架布局模块
│  ├─ routers             # 路由管理
│  ├─ stores              # pinia store
│  ├─ styles              # 全局样式文件
│  ├─ typings             # 全局 ts 声明
│  ├─ utils               # 常用工具库
│  ├─ views               # 项目所有页面
│  ├─ App.vue             # 项目主组件
│  ├─ env.d.ts            # 指定 ts 识别 vue
│  └─ main.ts             # 项目入口文件
├─ .editorconfig          # 统一不同编辑器的编码风格
├─ .env                   # vite 常用配置
├─ .env.development       # 开发环境配置
├─ .env.production        # 生产环境配置
├─ .env.test              # 测试环境配置
├─ .eslintignore          # 忽略 Eslint 校验
├─ .eslintrc.js           # Eslint 校验配置文件
├─ .gitignore             # 忽略 git 提交
├─ CHANGELOG.md           # 项目更新日志
├─ index.html             # 入口 html
├─ LICENSE                # 开源协议文件
├─ package-lock.json      # 依赖包包版本锁
├─ package.json           # 依赖包管理
├─ README.md              # README 介绍
├─ tsconfig.json          # typescript 全局配置
└─ vite.config.ts         # vite 全局配置文件
```

### 注意事项 🦻

- 添加页面首先在[src/views](./src/views/)目录下添加文件夹，如果有二级菜单，可再添加子文件夹，添加路由操作文件[src/assets/json/](./src/assets/json/dynamicRouter.json),每个路由中`meta`项各字段的含义可以参考文件[src/routers/index.ts](./src/routers/index.ts)

- globalStore()为全局状态，可获取用户名，ID等

- eslint设置可在[eslintrc.js](./eslintrc.js)文件中查看，如果代码出现红色波浪线，可能是不符合eslint规范

- 腾讯地图访问IP限制，目前仅校园网111.187.36.6可正常访问