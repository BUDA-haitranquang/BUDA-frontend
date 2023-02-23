**Quy tắc đặt tên branch:**
- Tính năng mới:  feature/{mô_tả_ngắn_gọn_feature}
- Fix bug:  bugfix/{mô_tả_ngắn_gọn_bug}
- **_Lưu ý: Chỉ tạo branch mới từ master_**

**Trước khi commit:**
- _**Merge từ master về**_ (merge xong nhớ _npm install_ nếu có thay đổi trong package.json / package-lock.json)
- Format code (Trong VSCode bấm tổ hợp _Alt+Shift+F_)
- Organize import (trong VSCode bấm tổ hợp _Alt+Shift+O_)
- Xóa các lệnh console.log()

**Các lưu ý khác:**
- Ngoài comment, chỉ được phép sử dụng tiếng Anh
- Nếu có bug level thấp chưa tìm được cách giải quyết / tính năng có thể làm sau => Tạo comment //TODO: 
- Đặt tên biến có ý nghĩa cho người khác hiểu

**Khởi chạy app:**
- Cần NodeJS (16+)
- Chạy 2 lệnh dưới đây để chạy trên local:
``npm install
npm start``
