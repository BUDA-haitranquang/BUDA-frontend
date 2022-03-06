**Quy tắc đặt tên branch:**
- Tính năng mới:  feature/{mô_tả_ngắn_gọn_feature}
- Fix bug:  bugfix/{mô_tả_ngắn_gọn_bug}
- **_Lưu ý: Chỉ tạo branch mới từ master_**

**Trước khi commit:**
- _**Merge từ master về**_(merge xong nhớ npm install nếu có thay đổi trong package.json / package-lock.json)
- Format code (Trong VSCode bấm tổ hợp Alt+Shift+F)
- Organize import (trong VSCode bấm tổ hợp Alt+Shift+O)
- Xóa các lệnh console.log()

**Các lưu ý khác:**
- Ngoài comment, chỉ được phép sử dụng tiếng Anh
- Nếu có lỗi chưa tìm được cách giải quyết / tính năng có thể làm sau => Tạo comment //TODO: 
- Đặt tên biến có ý nghĩa cho người khác hiểu
