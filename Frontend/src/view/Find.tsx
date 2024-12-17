import { useRef, useEffect, useState } from "react";
import '../style/Form.css';
import Navigation from './Navigation'; // 引入導航欄組件
import { Student } from "../interface/Student";
import { resp } from "../interface/resp";
import { asyncGet } from "../utils/fetch";
import { api } from "../enum/api";

export default function FindStudent() {
  const [students, setStudents] = useState<Array<Student>>([]); // 學生資料的狀態
  const [searchName, setSearchName] = useState<string>(""); // 輸入的學生姓名
  const [filteredStudents, setFilteredStudents] = useState<Array<Student>>([]); // 查詢結果

  const cache = useRef<boolean>(false); // 用於避免重複請求的緩存

  useEffect(() => {
    if (!cache.current) {
      cache.current = true;
      asyncGet(api.findAll).then((res: resp<Array<Student>>) => {
        if (res.code === 200) {
          setStudents(res.body); // 設置學生資料
          setFilteredStudents(res.body); // 設置查詢結果為全部學生
        }
      });
    }
  }, []);

  // 當 searchName 改變時過濾學生資料
  useEffect(() => {
    if (searchName.trim() === "") {
      setFilteredStudents(students); // 沒有輸入則顯示全部學生
    } else {
      const filtered = students.filter(student =>
        student.name.includes(searchName)
      );
      setFilteredStudents(filtered); // 設置過濾後的學生資料
    }
  }, [searchName, students]);

  return (
    <div style={{ padding: '20px' }}>
      <nav style={{ position: 'sticky', top: '0', backgroundColor: '#fff', zIndex: '1000' }}>
        <Navigation /> {/* 添加導航欄 */}
      </nav>
      <form className="form-container">
        <h2 className="title">查找學生</h2>
        <input
          type="text"
          placeholder="輸入學生姓名"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="input search-input"
        />
      </form>
      <div className="student-list">
        {filteredStudents.length > 0 ? (
          <div className="student-cards">
            {filteredStudents.map((student) => (
              <div key={student._id} className="student-card">
                <p>帳號: {student.userName}</p>
                <p>座號: {student.sid}</p>
                <p>姓名: {student.name}</p>
                <p>院系: {student.department}</p>
                <p>年級: {student.grade}</p>
                <p>班級: {student.class}</p>
                <p>Email: {student.Email}</p>
                <p>缺席次數: {student.absences ? student.absences : 0}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>找不到符合的學生</p>
        )}
      </div>
    </div>
  );
}
