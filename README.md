# MixAuth
无需任何手续，让你的应用快速支持 **QQ / 微信** 登录。 \
TG交流群: https://t.me/ivgeek \
基于nextjs开发

## 在线体验
- 地址：[https://mixauth.onrender.com/](https://mixauth.onrender.com/)


## 功能
- 支持扫码登录  
- 实时显示二维码状态，包括是否已扫码、是否过期、是否被手机拒绝登录等  

## 原理
- 基于官方登录接口逆向实现  
- **二维码请求**：MixAuth 使用已上线应用的 `appid` 向腾讯请求二维码  
- **登录状态查询**：通过官方接口查询二维码的登录状态  

## 安全性与稳定性

- **登录方式对比**  
  - **QQ 登录**：通过 QQ 官方互联接口获取信息，稳定性与可靠性较高  
  - **微信登录**：存在以下限制：  
    - 无法直接获取 **微信号**  
    - 仅能获取 **微信昵称、头像** 等信息 
    - 返回信息来源于 **腾讯Hr平台接口**，可能随时被官方调整或失效  
	- 使用 `UserIdStr` 作为账号唯一标识即可,此为腾讯hr平台账号ID

- **使用建议**  
  - ✅ **QQ**：推荐作为登录方式  
  - ⚠️ **微信**：建议仅用于 **账号绑定后的登录**，不推荐作为直接登录入口  

- **当前配置**  
  - 使用的 `appid`：腾讯Hr平台
  - 可自行更改为其他appid,只适用于qq
  - 微信登陆只有回调功能，无法直接通过官方查询账号任何信息

 

## 部署
- 编辑 `src/config.js`，将秘钥改为更复杂的秘钥 
- 需要 Node.js 运行环境  
- 安装依赖：`npm i`  
- 构建项目：`npm run build`  
- 启动服务：`npm run start`
- 也可使用：`next start` 或 `yarn start` 
- 可通过命令参数 `next start -p 端口` 或环境变量 `PORT` 指定端口  
- 可一键部署到 Vercel：[点击部署](https://vercel.com/new/clone?repository-url=https://github.com/InvertGeek/mixauth)  

## 快速接入
- 可直接使用 iframe 接入  
- 父页面接收登录回调示例：
```html
<script>
window.addEventListener('message', function(event) {
  const message = event.data;
  if (message && message.type === 'mixauth_login_result') {
    const loginResult = message.data;
    console.log('收到登录结果:', loginResult);
  }
});
</script>
```

- 结果格式为：**时间戳 | Base64 编码的登录结果 | HMAC 哈希值**  
- 校验结果时，请先确认结果中的 **QQ 或微信 UserIdStr 不为空**，然后向 `/api/verify` 接口发送请求校验(后端进行)
- **必须校验，否则可能被伪造登录信息**

## API 接入
- 使用接口可进行 API 接入  
- API 接入无需 verify 校验，自行根据 status 返回结果处理即可  
- 微信登录成功可能返回空信息，自行校验 UserIdStr 是否为空  

## 接口
接口请求体格式均为 JSON，方法均为 POST  

### 获取二维码
**URL**：`/api/qr`  
**请求体格式**：
```json
{"type": "qq|wechat"}
```

### 查询二维码状态
**URL**：`/api/status`  
**请求体格式**：
```json
{"type": "qq|wechat", "id": "二维码id"}
```

### 校验登录信息
**URL**：`/api/verify`  
**请求体格式**：
```json
{"sign": "签名信息"}
```



## 已知问题
- 只有通过摄像头扫描二维码才可登陆,qq微信禁止保存二维码到相册识别登陆

## Github Star
[![Stargazers over time](https://starchart.cc/InvertGeek/mixauth.svg?variant=adaptive)](https://starchart.cc/InvertGeek/mixauth)




