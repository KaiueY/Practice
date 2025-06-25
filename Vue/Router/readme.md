# 路由
## hash
## history

## 为何需要前端路由呢？
	- 用户体验快 传统的路由是后端路由，每次都要发送请求到后端获取页面， 慢、造成白屏，尤其是移动端，
	- 前端路由  路由驱动的页面级别组件，可以实现快速切换 （SPA，单页应用）
## 两种路由的优劣
### hash路由
	以 # 开头 兼容性好一点
	http://localhost:3000/user/:id?a=1&b=2#/hello 锚链接  锚定到页面的某个位置
	hash 切换的时候会触发hashChange事件，到router配置之中，通过hash找到=》component，将router-view替换为component   url部分改变的话不会重新加载页面，hash天然具备这个特性。
	

