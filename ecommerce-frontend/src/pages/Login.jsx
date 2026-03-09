// import React, { useState } from "react";
// import api from "../api";
// import "./Login.css";

// function Login({ setAuth, setPage, setUsername }) {
//   const [form, setForm] = useState({ username: "", password: "" });
//   const [error, setError] = useState("");

//   const submit = async () => {
//     try {
//       const res = await api.post("/auth/login", form);

//       console.log("LOGIN RESPONSE:", JSON.stringify(res.data, null, 2));

//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         localStorage.setItem("username", res.data.username);
//         setUsername(res.data.username);

//         setAuth(true);
//         setPage("dashboard");
//       } else {
//         setError("Invalid Login");
//       }
//     } catch (e) {
//       console.error("Login error:", e);
//       setError("Login failed. Try again.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-card">
//         <h2 className="login-title">Welcome Back</h2>
//         <p className="login-subtitle">Login to continue shopping</p>

//         {error && <p className="error-text">{error}</p>}

//         <div className="form-group">
//           <input
//             className="input-field"
//             placeholder="Username"
//             onChange={(e) => setForm({ ...form, username: e.target.value })}
//           />

//           <input
//             className="input-field"
//             type="password"
//             placeholder="Password"
//             onChange={(e) => setForm({ ...form, password: e.target.value })}
//           />

//           <button className="login-btn" onClick={submit}>
//             Login
//           </button>
//         </div>

//         <p className="signup-text">
//           Don't have an account?{" "}
//           <span className="link" onClick={() => setPage("register")}>
//             Register
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default Login;

import React, { useState } from "react";
import api from "../api";
import "./Login.css";

function Login({ setAuth, setPage, setUsername }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const submit = async () => {
    try {
      const res = await api.post("/auth/login", form);

      console.log("LOGIN RESPONSE:", JSON.stringify(res.data, null, 2));

      /*
        Expected backend response:
        {
          token: "...",
          username: "admin",
          role: "ROLE_ADMIN"
        }
      */

      if (res.data.token) {
        // ✅ Store JWT + user info
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.username);
        localStorage.setItem("role", res.data.role);

        setUsername(res.data.username);
        setAuth(true);

        // ✅ Optional: redirect admin directly to admin panel
        if (res.data.role === "ROLE_ADMIN") {
          setPage("admin");
        } else {
          setPage("dashboard");
        }

      } else {
        setError("Invalid Login");
      }

    } catch (e) {
      console.error("Login error:", e);
      setError("Login failed. Try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome Back</h2>
        <p className="login-subtitle">Login to continue shopping</p>

        {error && <p className="error-text">{error}</p>}

        <div className="form-group">
          <input
            className="input-field"
            placeholder="Username"
            value={form.username}
            onChange={(e) =>
              setForm({ ...form, username: e.target.value })
            }
          />

          <input
            className="input-field"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="login-btn" onClick={submit}>
            Login
          </button>
        </div>

        <p className="signup-text">
          Don't have an account?{" "}
          <span className="link" onClick={() => setPage("register")}>
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
