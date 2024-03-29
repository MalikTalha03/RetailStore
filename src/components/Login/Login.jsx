import React from "react";
import "./login.css";

const Login = () => {
  const apiurl = process.env.REACT_APP_API_URL + "auth/login";
  const tokenCheck = async () => {
    try {
      if (!localStorage.getItem("token")) {
        return;
      }

      const data = await fetch(apiurl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      const response = await data.json();

      if (response.message === "jwt expired") {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        window.location.href = "/dashboard";
      }
    } catch (err) {
      console.log(err)
    }
  };
  tokenCheck();
  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const username = data.get("username");
    const password = data.get("password");
    const user = {
      username,
      password,
    };
    fetch(apiurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "Login Successful") {
          window.location.href = "/neworder";
          localStorage.setItem("token", data.token);
        } else {
          alert(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div>
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" />
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
