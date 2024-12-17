import { useState } from "react";
import { asyncPut } from "../utils/fetch";
import { api } from "../enum/api";
import '../style/index.css';
import Navigation from './Navigation'; // 引入導航欄組件

export default function UpdateStudent() {
  const [data, setData] = useState({
    sid: "",
    name: "",
    department: "",
    grade: "",
    class: "",
    Email: "",
    absences: "",
  });
  const [error, setError] = useState<string | null>(null); // 錯誤訊息
  const [success, setSuccess] = useState<string | null>(null); // 成功訊息

  function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: name === "absences" ? Number(value) || 0 : value, // 將 absences 轉為數字
    }));
  }

  async function handle_OnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // 檢查表單是否有空值
    for (const [key, value] of Object.entries(data)) {
      if (value === "" || value === null) {
        setError(`欄位 ${key} 不得為空`);
        return;
      }
    }

    // 檢查座號格式
    const sidNumber = Number(data.sid);
    if (isNaN(sidNumber) || sidNumber <= 0) {
      setError("請輸入正整數的座號");
      return;
    }

    // 檢查年級輸入是否為正整數
    const studentGrade = Number(data.grade);
    if (isNaN(studentGrade)) {
      setError("請輸入數字");
      return;
    } else if (studentGrade < 1) {
      setError("請輸入正整數");
      return;
    }

    try {
      const response = await asyncPut(api.updateNameBysid, data);
      if (response.code === 200) {
        setSuccess("學生資料更新成功！");
        setData({
          sid: "",
          name: "",
          department: "",
          grade: "",
          class: "",
          Email: "",
          absences: "",
        }); // 重置
      } else {
        setError("更新失敗，請稍後再試！");
      }
    } catch (error) {
      setError("伺服器錯誤，請稍後再試！");
    }
  }

  return (
    <div className="form-container" style={{ padding: '25px' , width: '150%', textAlign: 'center' }}>
      <Navigation /> {/* 添加導航欄 */}
      <form onSubmit={handle_OnSubmit}>
        <h2 style={{ textAlign: 'center' }}>更新學生資料</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px' }}>更新</button>
        <label htmlFor="sid">要更新的學生座號</label>
        <input
          type="text"
          name="sid"
          value={data.sid}
          onChange={handle_OnChange}
          placeholder="座號"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <label htmlFor="name">要更新的資訊</label>
        <input
          type="text"
          name="name"
          value={data.name}
          onChange={handle_OnChange}
          placeholder="姓名"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="department"
          value={data.department}
          onChange={handle_OnChange}
          placeholder="院系"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="grade"
          value={data.grade}
          onChange={handle_OnChange}
          placeholder="年級"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="class"
          value={data.class}
          onChange={handle_OnChange}
          placeholder="班級"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="Email"
          value={data.Email}
          onChange={handle_OnChange}
          placeholder="Email"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="absences"
          value={data.absences}
          onChange={handle_OnChange}
          placeholder="缺席次數"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
      </form>
    </div>
  );
}