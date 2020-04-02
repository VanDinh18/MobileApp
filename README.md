# MobileApp

### Các thành viên
* Nguyễn Văn Đình (Nhóm trưởng)
* Bùi Văn Bảo
* Nguyễn Chí Đạt
* Vũ Khương Duy

### Đề tài: Ứng dụng di động text, voice, chat video
### Công nghệ và ngôn ngữ phát triển: React Native + Firebase
### Các tính năng:
*
*
*

### Chạy code
* Cài đặt [React Native](https://reactnative.dev/docs/getting-started.html) và máy áo để chạy dự án
* Clone code trên Github, vào thư mục gốc, sau đó xóa thư mục node_modules
* Cài đặt các package
> npm install
* Bắt đầu
> npx react-native start
* Start application (ở terminal khác)
> npx react-native run-android
### Cấu trúc thư muc: 
Code chính trong thư mục src, file chạy là index.js

Thư mục  | Mô tả
------------- | -------------
/assets  | Chữa ảnh, font...
/components  | Chứa các components tái sử dụng trong project
/Navigation  | Chứa Navigator để chuyển màn hình
/screens | Chứa các màn hình chính của ứng dụng

### Làm việc với Git
1. Clone code về máy 
> git clone 
2. Kiểm tra trạng thái thay đổi
> git status
3. Đưa các file vào danh sách trước khi commit
> git add . 
4. Commit những thay đổi trước khi push lên server
> git commit -a -m "abc"
5. Tải lên server nhánh master
> git push -u origin master
6. Xem các nhánh đang có
> git branch -a
7. Trước khi code 1 phần mới cần update code
> git pull origin master
