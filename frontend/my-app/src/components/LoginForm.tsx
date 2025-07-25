import { useState } from "react";
import { LoginFormProps } from "../types/todo";
import { mockUsers } from "../mocks/users";
const LoginForm = ({onLoginSuccess}: LoginFormProps) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () =>{
   const foundUser = mockUsers.find(
      (user) => user.username === userName && user.password === password
    );

    if (foundUser) {
      // ローカルストレージ保存（オプション）
      localStorage.setItem("token", foundUser.token);
      localStorage.setItem("user_id", foundUser.user_id);

      onLoginSuccess(foundUser.token, foundUser.username);
    } else {
      alert("Login failed: username or password is wrong");
    }
    // const res = await fetch("http://localhost:8080/login", {
    //   method: "POST",
    //   headers: {"Content-type": "application/json"},
    //   body: JSON.stringify({userName, password}),
    // });
    // if (res.ok) {
    //   const {token} = await res.json();
    //   onLoginSuccess(token);
    // }else{
    //   alert("Login failed");
    // };
  }

  return (
    <div>
      <h2>Login</h2>
      <input 
        type="text"
        placeholder="Username"
        value={userName}
        onChange={(e)=>setUsername(e.target.value)}
      />
      <br />
      <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e)=>setPassword(e.target.value)}
       />
       <br />
       <button onClick={handleSubmit}>Login</button>

    </div>
  )
}

export default LoginForm;




