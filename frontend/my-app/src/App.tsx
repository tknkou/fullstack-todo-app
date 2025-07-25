
import TodoList from './components/TodoList';
import './App.css';
import { useState, useEffect } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const [token, setToken] = useState<string | null>(null)
  const [username, setUsername] = useState<string | null>(null)

  // ローカルストレージからトークンを読み込む
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUsername = localStorage.getItem("username");
    if (storedToken) {
      setToken(storedToken);
    }
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);
  const handleLoginSuccess = (newToken: string, newUsername: string) => {
    setToken(newToken);

    setUsername(newUsername);
    localStorage.setItem("token", newToken); // 念のためここでも保存
    localStorage.setItem("username", newUsername);
  };
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  if (!token) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} />;
  }
  return (
    <div>
        <h1 className="text-4xl font-bold text-blue-600">Welcome {username}さん!</h1>
      <button onClick={handleLogout}>ログアウト</button>
      <TodoList token={token} />
    </div>
  );
}

export default App;
