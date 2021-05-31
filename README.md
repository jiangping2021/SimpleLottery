# truffle-simplelottery
目录说明
	client : React前端文件
	contracts : 合约文件
	migrations : 部署脚本文件
	test : 测试文件
	upgrade : 升级文件


搭建并运行可升级智能合约框架
1. 在lottery根目录下
> npm install : 安装依赖包

2. 部署合约
> truffle migrate --network ropsten : 编译并部署到ropsten网络, 这里用的是本地测试网络ganache

3. 升级合约
将upgrade目录中的LotteryV2.sol文件移到contracts目录下
将3_upgrade_contracts.js文件移倒migrations目录下

4. 编译全部合约
> truffle compile --all

5. 部署升级后的合约
> truffle migrate --network ropsten
注：直接运行当前项目也可略过步骤2从步骤3开始操作。

运行React App
1. 钱包配置
（1）将Google浏览器设置为默认浏览器
（2）安装MetaMask
（3）导入账户并切换到Ropsten网络（ganach网络）

2. 进入client目录
> cd client
> npm install : 安装依赖包
> npm run start
注：
（1）运行成功会提示连接MetaMask钱包，若“钱包配置”时未登录MetaMask，此时仍按照“钱包配置”的第（3）点操作；
（2）切换网络、切换账户时都需要重新刷新页面。

