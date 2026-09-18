# Riichi Mahjong

立直麻将相关工具的聚合仓库。通过统一网关访问总导航页和各个功能模块。

## 访问路径

- `/`：总导航页
- `/wind/`：风向盘，四人同步看分的立直麻将计分网页
- `/score-practice/`：点数计算练习，目前为占位页面

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

- <https://dodomogu.com/mahjong/>：总导航页
- <https://dodomogu.com/mahjong/wind/>：风向盘
- <https://dodomogu.com/mahjong/score-practice/>：点数计算练习

旧地址 <https://dodomogu.com/mahjong-wind/> 会跳转到新的风盘地址。

## 目录约定

```text
.
├── index.html              # 总导航页
├── home.css                # 总导航页样式
├── server/                 # 仓库级统一访问网关
├── wind/                   # 独立的风向盘模块（Vue + Node）
└── score-practice/         # 独立的点数计算练习模块
    ├── index.html
    └── style.css
```

各功能模块在业务上相互独立，拥有自己的页面、依赖和运行方式。总网关只负责统一访问地址和路径转发，不直接引用模块内部业务代码。后续增加工具时，建议新增一个独立目录，在网关增加路径映射，并在根目录导航页增加入口。

风向盘原项目来自
[`doDomoGu/mahjong-wind`](https://github.com/doDomoGu/mahjong-wind)。
