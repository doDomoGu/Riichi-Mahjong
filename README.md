# Riichi Mahjong

立直麻将相关工具的聚合仓库。通过统一网关访问总导航页和各个功能模块。

## 访问路径

- `/`：总导航页
- `/wind/`：风向盘，四人同步看分的立直麻将计分网页
- `/score-practice/`：点数计算练习，支持随机题目、荣和/自摸和桌况加成

## 本地启动

需要 Node.js 18+，可以一键启动全部服务：

```bash
npm install
npm start
```

默认启动：

```text
gateway          统一网关（8080）
home             总导航页服务（3000）
wind             风向盘服务（3001）
score-practice   点数计算服务（3002）
```

也可以按参数选择要启动的项目：

```bash
npm start -- gateway
npm start -- home
npm start -- wind
npm start -- score-practice
npm start -- wind score-practice
```

也支持 `--gateway`、`--home`、`--wind`、`--score-practice` 写法。访问地址为 <http://localhost:8080/>。启动器会自动探测端口占用并逐个递增，也会把实际端口传给网关。任一服务异常退出时会停止其他服务。

## 线上地址

- <http://dodomogu.com/mahjong/>：总导航页
- <http://dodomogu.com/mahjong/wind/>：风向盘
- <http://dodomogu.com/mahjong/score-practice/>：点数计算练习

线上当前使用 HTTP，暂未配置 HTTPS。

## 目录约定

```text
.
├── home/                   # 总导航页子项目
│   ├── index.html
│   ├── style.css
│   └── server/             # 首页服务
├── server/                 # 仓库级统一访问网关
├── wind/                   # 风向盘功能模块
│   ├── client/             # Vue 前端
│   ├── server/             # Node.js 服务端
│   ├── data/               # 本地运行数据
│   ├── deploy/             # 模块部署配置
│   └── package.json        # 模块依赖和脚本
└── score-practice/         # 独立的点数计算练习模块
    ├── index.html
    ├── style.css
    ├── app.js
    ├── server/              # 点数计算业务服务和题目保存接口
    └── question-history/    # 本地题目历史（内容被 Git 忽略）
```

各功能模块在业务上相互独立，拥有自己的页面、依赖和运行方式。总网关只负责统一访问地址和模块路由转发；首页、`wind`、`score-practice` 均由自己的服务提供。后续增加工具时，建议新增一个独立目录，在网关增加模块转发，并在根目录导航页增加入口。
