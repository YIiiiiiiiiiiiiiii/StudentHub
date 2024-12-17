// students.ts

export interface Student {
    _id: string; // 學生的唯一標識符
    userName: string; // 學生的帳號
    sid: string; // 學生的座號
    name: string; // 學生的姓名
    department: string; // 學生的院系
    grade: string; // 學生的年級
    class: string; // 學生的班級
    Email: string; // 學生的電子郵件
    absences?: number; // 學生的缺席次數（可選屬性）
  }