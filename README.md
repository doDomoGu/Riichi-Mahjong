# Riichi Mahjong

立直麻将相关工具的聚合仓库。通过统一网关访问总导航页和各个功能模块。

## 访问路径

- `/`：总导航页
- `/wind/`：风向盘，四人同步看分的立直麻将计分网页
- `/score-practice/`：点数计算练习，支持随机题目、荣和/自摸和桌况加成

## 本地启动

需要 Node.js 18+，分别启动风向盘模块和仓库根网关：

```bash
cd wind
npm install
npm start
```

另开一个终端：

```bash
npm install
npm start
```

然后访问 <http://localhost:8081/>。根网关负责首页和二级目录转发，功能模块仍然保持独立。也可以通过 `PORT=8080 npm start` 指定其他端口。

## 线上地址

- <http://dodomogu.com/mahjong/>：总导航页
- <http://dodomogu.com/mahjong/wind/>：风向盘
- <http://dodomogu.com/mahjong/score-practice/>：点数计算练习

线上当前使用 HTTP，暂未配置 HTTPS。

## 目录约定

```text
.
├── index.html              # 总导航页
├── home.css                # 总导航页样式
├── server/                 # 仓库级统一访问网关
├── wind/                   # 风向盘功能模块
│   ├── client/             # Vue 前端
│   ├── server/             # Node.js 服务端
│   ├── data/               # 本地运行数据
│   ├── deploy/             # 模块部署配置
│   └── package.json        # 模块依赖和脚本
└── score-practice/         # 独立的点数计算练习模块（纯静态页面）
    ├── index.html
    ├── style.css
    └── app.js
```

各功能模块在业务上相互独立，拥有自己的页面、依赖和运行方式。总网关只负责统一访问地址和路径转发，不直接引用模块内部业务代码。后续增加工具时，建议新增一个独立目录，在网关增加路径映射，并在根目录导航页增加入口。
