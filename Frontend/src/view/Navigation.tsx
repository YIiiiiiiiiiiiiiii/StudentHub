import "../style/Navigation.css";
import { Link } from "react-router";

export default function Navigation() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        班級成員
      </Link>
      <ul>
        <li>
          <Link to="/find">搜尋學生</Link>
        </li>
        <li>
          <Link to="/create">新增學生</Link>
        </li>
        <li>
          <Link to="/update">更新資料</Link>
        </li>
        <li>
          <Link to="/delete">刪除學生</Link>
        </li>
      </ul>
    </nav>
  );
}