# GOUKAOU 產品網站
GOUKAOU 是一個使用 Node.js + Express + mongodb 建立的專案，部署於 Heroku， 目前為 2.0 版，也把各個路由的以RESTFul API 方式開出來，以便專案轉為前後端分離方便調整。
## 專案緣起
專案緣自於身邊有在玩COS朋友，其中一位有在開工作坊，工作坊希望將己經完成的作品給玩家觀賞，以便玩家更能了解在COSPLAY也有另一個區塊的族群，也能了解不一樣的二次元文化。<br>

#### 產品首頁
***
[遠端GCP首頁](https://goukaou-uvt2peadbq-uw.a.run.app)<br>
![restaurant-image](public/image/%E7%94%A2%E5%93%81%E9%A6%96%E9%A0%81.PNG)

#### 後台登入頁

[遠端GCP後台登入頁](https://goukaou-uvt2peadbq-uw.a.run.app/admin/login)<br>
![restaurant-image](public/image/%E5%BE%8C%E5%8F%B0%E7%99%BB%E5%85%A5%E9%A0%81%E9%9D%A2.PNG)

## 功能介紹

### <2.0版>
***
  #### [後台管理者]
- 後台管理者需要先登入才能進行操作。
- 可以瀏覽全部產品，也可以新增、修改、刪除、瀏覽特定一筆產品。
  #### [使用者]
- 使用者可以瀏覽所有產品。
- 使用者可以依據自己的需求發送信件給工作室，以便後續討論作品細節、價格。
## API 範例
- [正在銷售產品](https://goukaou-uvt2peadbq-uw.a.run.app/api/products/mask-onsale)
## 啓動方式
- 將專案 clone 到本地端
  https://github.com/Steavn-Chen/goukaou-test

- 進入到專案資料夾<br>
  cd goukaou
- 安裝 npm<br>
  npm install
- 啓動專案<br>
  npm run dev
- 終端機出現以下字幕，表示終端機成功開啓。<br>
  The GOUKAOU web is running on http://localhost:3000
- 終端機出現以下字幕，表示mongodb資料連線成功。<br>
  mongodb is connected.
- 種子資料，在終端機輸入 npm run seed。<br>
  Category created is done <- 類別資料建立成功。<br>
  Model created is done <- 模型資料建立成功。<br>
  Product created is done <- 產品資料建立成功。<br>
  User created is done <- 使用者資料建立成功。
- (注) 預留一份產品假資料在 models/seeds/productSeederTest.js，可在終端機輸入 node models/seeds/productSeederTest.js<br>
  ProductTest created is done <-產品測試資料建立成功

## 測試帳號
- 後台 <br>
  帳號: root@example.com
  密碼: 123456
- 一般使用者 <br>(暫時不開放使用者登入)
  帳號: user1@example.com 
  密碼: 123456<br>
  帳號: user2@example.com
  密碼: 123456
## 開發環境
- node 14.15.0
- express 4.17.3
- express-handlebars 5.3.4
## 輔助套件
- express-session 1.17.3
- connect-flash 0.1.1
- method-override 3.0.0
- dotenv 16.0.0
- bcryptjs 2.4.3
- dayjs 1.10.6
- faker 5.5.3
- imgur 1.0.2
- multer 1.4.5-lts.1
- nodemailer 6.7.3
- passport 0.5.2
- passport-local 1.0.0
- passport-jwt 4.0.0
- jsonwebtoken 8.5.1
- mongoose 5.12.15



