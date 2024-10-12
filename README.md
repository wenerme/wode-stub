## wode-stub

这是从 [wenerme/wode](https://github.com/wenerme/wode) 提取的模板仓库，用于快速创建控制台+后台+前端项目。

**适用场景**

- CRM - 客户关系
- ERP - 企业资源
- CMS - 内容管理
- 电商后台
- 企业内部管理

**环境要求**

- Bash 4+
- Make
- NodeJS LTS
- PNPM
- PostgreSQL

**TODO**

- [ ] DB Migration
- [ ] Resource Table

## 系统架构

**前端**

- 技术栈：React, React Router, Tailwind CSS, Daisy UI, Radix UI, React Icons, Vite, Prettier
- 状态管理：Zustand, Valtio
- 接口交互：urql (GraphQL)
- 功能组件：React Hook Form, React Table, Floating UI

**后端**

- 技术栈：Node.js, TypeScript, NestJS, HonoJS, Yoga GraphQL Server, MikroORM, PostgreSQL
- 开发环境：使用 ts-node+swc+`node --watch`
- 生产环境：swc+esbuild 构建单一 Bundle 文件

## 目录结构

- apps/
  - console - React & Vite - 纯静态控制台前端
  - server - 服务端
    - src/apps - 入口
      - wode-api-server - GraphQL API Server
      - wode-worker - BullMQ Worker
  - [ ] web - React & NextJS - 网站 - 例如 官网，营销页
  - [ ] mini - 小程序
- packages/
  - common - 公共

## dev

```bash
npm add -g pnpm@latest

pnpm i
```

- 准备 PG
- 导入数据库 Schema ./db/wode/migrations

**server**

```bash
cd apps/server
cp .env .env.wode-api-server.local
# 修改 .env.wode-api-server.local 配置

# 启动 Server
make dev:wode-api-server
```

**console**

```bash
cd apps/console
make dev
```

## 设计思考

- Copy and paste is better than dependency until it's not
- 围绕 Entity/Resource 操作：通过 Typed ID 来识别资源类型，采用 Mixin 抽取公共字段
- 多租户架构：表默认包含租户 ID (tid) 字段
- 横向切分功能模块
- 模块化设计：基础模块包含核心功能，附加模块尽量保持低侵入性
- 状态与流程管理：主要资源通过状态字段 (state 和 status) 管理基本流程

**前端 <-> 后端**

- GraphQL - 主要
- API - 辅助
  - 文件,上传
  - 回调
  - 非标准场景
- [ ] RESTful
  - 次要 - 可生成, PoC
  - 自己 (console & web) 使用 使用 GQL 能减少客户端开发工作量
  - 对外 (OpenAPI) 可能需要 RESTful API
- ~~trpc~~
  - 过于复杂后类型推导太慢，太不可靠

**后端 <-> 后端**

- [ ] RPC 交互

---

- [Design ERP](https://wener.me/notes/dev/design/erp)
- [Design API](https://wener.me/notes/dev/design/api)
- [Design Schema](https://wener.me/notes/dev/design/schema)
- [CRM 实现经历](https://www.wener.tech/story/crm-trails)
