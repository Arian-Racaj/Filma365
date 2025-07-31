import React, { useState } from "react";

function LoginForm({ onLogin, onSwitchToRegister, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin({ email, password });
  };

  return (
    <div
      style={{
        maxWidth: 400,
        margin: "60px auto",
        background: "rgba(255,255,255,0.08)",
        borderRadius: 16,
        padding: 32,
        boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
        color: "white",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>Kyçu</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 16,
            borderRadius: 8,
            border: "none",
            fontSize: 16,
          }}
        />
        <input
          type="password"
          placeholder="Fjalëkalimi"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            width: "100%",
            padding: 12,
            marginBottom: 16,
            borderRadius: 8,
            border: "none",
            fontSize: 16,
          }}
        />
        {error && (
          <div
            style={{ color: "#ff6b6b", marginBottom: 12, textAlign: "center" }}
          >
            {error}
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
            border: "none",
            marginBottom: 12,
          }}
        >
          Kyçu
        </button>
      </form>
      <div style={{ textAlign: "center", marginTop: 8 }}>
        Nuk ke llogari?{" "}
        <button
          onClick={onSwitchToRegister}
          style={{
            background: "none",
            border: "none",
            color: "#4ecdc4",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Regjistrohu
        </button>
      </div>
    </div>
  );
}

export default LoginForm;
