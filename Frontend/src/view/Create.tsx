import { useState } from 'react';
import { asyncPost } from '../utils/fetch';
import { api } from '../enum/api';
import { Student } from '../interface/Student';
import '../style/Form.css';
import Navigation from './Navigation'; 

export default function CreateStudent() {
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    userName: '',
    sid: '',
    name: '',
    department: '',
    grade: '',
    class: '',
    Email: '',
    absences: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  function handle_OnChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setNewStudent((prev) => ({
      ...prev,
      [name]: name === 'absences' ? Number(value) : value,
    }));
  }

  async function handle_OnSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSuccess(null);
    setError(null);

    for (const [key, value] of Object.entries(newStudent)) {
      if ((value === '' || value === null) && key !== 'sid' && key !== 'absences') {
        setError('填寫欄位不得為空');
        return;
      }
    }

    const userNamePattern = /^tku[a-z]{2,}[0-9]{4}$/;
    if (!userNamePattern.test(newStudent.userName || '')) {
      setError('學生帳號格式不正確 ex:tkuim0000');
      return;
    }

    const studentGrade = Number(newStudent.grade);
    if (isNaN(studentGrade) || studentGrade < 1) {
      setError('請輸入正整數的年級');
      return;
    }

    try {
      const response = await asyncPost(api.insertOne, newStudent);
      if (response.code === 200) {
        setSuccess('新增成功');
        setNewStudent({
          userName: '',
          sid: '',
          name: '',
          department: '',
          grade: '',
          class: '',
          Email: '',
          absences: 0,
        });
      } else {
        setError('新增失敗');
      }
    } catch (error) {
      setError('伺服器錯誤，請稍後再試');
      console.error('Create error:', error);
    }
  }

  return (
    <div className="form-container" style={{ padding: '15px' , width: '150%', textAlign: 'center' }}>
      <Navigation /> {/* 添加導航欄 */}
      <form onSubmit={handle_OnSubmit}>
        <h2 style={{ textAlign: 'center' }}>新增學生</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit" style={{ width: '100%', padding: '10px' }}>新增</button>
        <input
          type="text"
          name="userName"
          value={newStudent.userName}
          onChange={handle_OnChange}
          placeholder="帳號"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="name"
          value={newStudent.name}
          onChange={handle_OnChange}
          placeholder="姓名"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="department"
          value={newStudent.department}
          onChange={handle_OnChange}
          placeholder="院系"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="grade"
          value={newStudent.grade}
          onChange={handle_OnChange}
          placeholder="年級"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="text"
          name="class"
          value={newStudent.class}
          onChange={handle_OnChange}
          placeholder="班級"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="email"
          name="Email"
          value={newStudent.Email}
          onChange={handle_OnChange}
          placeholder="Email"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
        <br />
        <input
          type="number"
          name="absences"
          value={newStudent.absences}
          onChange={handle_OnChange}
          placeholder="缺席次數"
          style={{ width: '100%', padding: '10px', marginBottom: '10px', textAlign: 'center' }}
        />
      </form>
    </div>
  );
}