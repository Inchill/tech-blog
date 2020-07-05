# 一款开源技术博客，用户注册即可使用。🍌

## 技术栈

[博客演示地址](http://39.97.212.97:3001)

博客采用前后端分离，前端用vue+ts+stylus开发，基于MVVM模式；后端用koa2+mysql+sequelize ORM开发，基于MVC模式。前后端由webpack进行合体，最终将前端打包的dist和后端的server上传至服务器，前端代码看作是后端的静态资源。

博客的功能目前只做了登录、注册、写文章、修改文章、修改昵称改头像、关注、评论，感兴趣的同学可以持续添加，比如回复、点赞、分享、分类、标签、推荐等功能。除了功能，样式也可以更改。本来我当初是想仿掘金的，当时时间有限，做了几天就没写了。

## 目录结构

```
blog
├─.babelrc
├─.dockerignore
├─.gitignore
├─Dockerfile
├─package-lock.json
├─package.json
├─README.md
├─tsconfig.json
├─webpack.common.js
├─webpack.dev.js
├─webpack.prod.js
├─static
|   └defaultAvatar.png
├─server
|   ├─app.ts
|   ├─router.ts
|   ├─views
|   |   └index.html
|   ├─services
|   |    ├─BlogService.ts
|   |    ├─CommentService.ts
|   |    ├─FollowService.ts
|   |    ├─ReplyService.ts
|   |    ├─SortService.ts
|   |    └UserService.ts
|   ├─public
|   |   ├─dist
|   ├─models
|   |   ├─BlogModel.ts
|   |   ├─CommentModel.ts
|   |   ├─FollowModel.ts
|   |   ├─ReplyModel.ts
|   |   ├─SortModel.ts
|   |   └UserModel.ts
|   ├─controllers
|   |      ├─BlogController.ts
|   |      ├─CommentController.ts
|   |      ├─FollowController.ts
|   |      ├─SortController.ts
|   |      └UserController.ts
|   ├─config
|   |   ├─db.ts
|   |   └tools.ts
├─node_modules
```

## 如何使用

拉取代码后执行：

```shell
npm i
```

运行前端代码：

```shell
npm run dev
```

运行后端代码：

```shell
npm run dev-server
```