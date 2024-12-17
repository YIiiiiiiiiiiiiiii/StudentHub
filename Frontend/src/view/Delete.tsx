import { useState, useEffect } from "react";
import { asyncDelete, asyncGet } from "../utils/fetch";
import { Student } from "../interface/Student";
import { resp } from "../interface/resp";
import { api } from "../enum/api";
import '../style/Form.css';
import Navigation from './Navigation'; // 引入導航欄組件

export default function DeleteStudent() {
  const [sid, setSid] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const [maxSid, setMaxSid] = useState<number>(0);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const res: resp<Array<Student>> = await asyncGet(api.findAll);
        if (res.code === 200) {
          const sids = res.body.map((student) => parseInt(student.sid, 10)).filter(Number.isFinite);
          if (sids.length > 0) {
            setMaxSid(Math.max(...sids));
          } else {
            setError("找不到任何座號，資料庫是空的");
          }
        }
      } catch (err) {
        console.error("獲取學生資料失敗", err);
      }
    };

    fetchStudents();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSid(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!sid) {
      setError("請輸入座號！");
      return;
    }

    const sidNumber = Number(sid);
    if (isNaN(sidNumber) || sidNumber <= 0) {
      setError("請輸入正整數！");
      setSid("");
      return;
    }

    if (sidNumber > maxSid) {
      setError("座號輸入錯誤！");
      return;
    }

    try {
      if (window.confirm('確認要刪除此學生嗎？')) {
        const response = await asyncDelete(api.deleteBysid, { sid : sid });
        if (response.message === "success") {
          setSuccess(`學生座號 ${sid} 刪除成功！`);
          setSid("");
        } else {
          setError("刪除失敗，請重試。");
        }
      }
    } catch (error) {
      setError("刪除過程中發生錯誤！");
    }
  };

  return (
    <div className="form-container" style={{ padding: '15px' , width: '150%', textAlign: 'center' }}>
      <Navigation /> {/* 添加導航欄 */}
      <form onSubmit={handleSubmit}>
        <h2 style={{ textAlign: 'center' }}>刪除學生</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px' }}>刪除</button>
        <input
          type="text"
          name="sid"
          value={sid}
          onChange={handleChange}
          placeholder="座號"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center'}}
        />
      </form>
    </div>
  );
}