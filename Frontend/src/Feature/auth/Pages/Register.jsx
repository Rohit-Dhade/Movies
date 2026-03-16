import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

const genres = [
  { name: "Sci-Fi", count: "1.2k films", color: "#6366f1" },
  { name: "Action", count: "2.4k films", color: "#f43f5e" },
  { name: "Drama", count: "3.1k films", color: "#f59e0b" },
  { name: "Thriller", count: "980 films", color: "#14b8a6" },
  { name: "Horror", count: "760 films", color: "#a855f7" },
  { name: "Animation", count: "540 films", color: "#22c55e" },
];

const getStrength = (pwd) => Math.min(4, Math.floor(pwd.length / 3));
const strengthColor = ["", "#f43f5e", "#f59e0b", "#22c55e", "#14b8a6"];

export default function RegisterPage() {
  const navigate = useNavigate();
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConf, setShowConf] = useState(false);
  const [err, setError] = useState("");

  const { user, loading, handleRegister, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("Please agree to the terms to continue.");
      return;
    }
    const result = await handleRegister(username, email, password);
    if (result) {
      navigate("/");
    }
  };

  const strength = getStrength(password);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Inter', sans-serif; background: #090a0f; overflow: hidden; }

        .glass-card {
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
          box-shadow: 0 32px 80px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06);
        }
        .page-enter {
          animation: pageUp 0.6s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes pageUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .field-input {
          width: 100%; padding: 11px 16px;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 12px; color: #fff;
          font-family: 'Inter', sans-serif; font-size: 13px;
          outline: none; transition: border-color 0.2s, background 0.2s;
        }
        .field-input::placeholder { color: rgba(255,255,255,0.2); }
        .field-input:focus { border-color: rgba(255,255,255,0.35); background: rgba(255,255,255,0.09); }
        .field-input.err { border-color: rgba(244,63,94,0.45); }

        .pass-wrap { position: relative; }
        .pass-eye {
          position: absolute; right: 13px; top: 50%; transform: translateY(-50%);
          background: none; border: none; color: rgba(255,255,255,0.28);
          cursor: pointer; font-size: 11px; font-family: 'Inter', sans-serif; padding: 0;
          transition: color 0.18s;
        }
        .pass-eye:hover { color: rgba(255,255,255,0.65); }

        .custom-checkbox {
          appearance: none; width: 14px; height: 14px;
          border: 1px solid rgba(255,255,255,0.2); border-radius: 3px;
          background: transparent; cursor: pointer; position: relative; flex-shrink: 0;
          transition: all 0.15s;
        }
        .custom-checkbox:checked { background: #fff; border-color: #fff; }
        .custom-checkbox:checked::after {
          content: '✓'; position: absolute; top: -1px; left: 2px;
          font-size: 9px; color: #000; font-weight: 800;
        }

        .social-btn {
          width: 100%; padding: 11px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; color: rgba(255,255,255,0.5);
          font-family: 'Inter', sans-serif; font-size: 12px; font-weight: 500;
          cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 6px;
          transition: background 0.18s, border-color 0.18s, color 0.18s;
        }
        .social-btn:hover { background: rgba(255,255,255,0.09); border-color: rgba(255,255,255,0.15); color: #fff; }

        .genre-item {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 14px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          transition: background 0.18s, border-color 0.18s;
        }
        .genre-item:hover { background: rgba(255,255,255,0.06); border-color: rgba(255,255,255,0.1); }

        .reel {
          position: fixed; border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.04);
          pointer-events: none;
        }
      `}</style>

      {/* Background */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          background: `
          radial-gradient(ellipse 120% 80% at 70% 40%, #1a0a2e 0%, transparent 60%),
          radial-gradient(ellipse 80% 60% at 20% 80%, #0a1a0a 0%, transparent 55%),
          radial-gradient(ellipse 60% 80% at 90% 90%, #1a0808 0%, transparent 50%),
          #090a0f
        `,
        }}
      />

      {/* Decorative circles */}
      <div
        className="reel"
        style={{ width: 600, height: 600, top: -200, left: -200 }}
      />
      <div
        className="reel"
        style={{
          width: 400,
          height: 400,
          bottom: -150,
          right: -100,
          borderColor: "rgba(255,255,255,0.03)",
        }}
      />
      <div
        className="reel"
        style={{ width: 200, height: 200, top: 60, right: 80 }}
      />

      {/* Layout */}
      <div
        className="page-enter"
        style={{
          position: "relative",
          zIndex: 10,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 56,
          padding: "0 20px",
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* ── Card ── */}
        <div
          className="glass-card"
          style={{ width: 400, borderRadius: 20, padding: "36px 40px" }}
        >
          {/* Brand */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 9,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#fff",
              }}
            />
            <span
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: 15,
                fontWeight: 800,
                color: "#fff",
                letterSpacing: "-0.01em",
              }}
            >
              CineVault
            </span>
          </div>

          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: 26,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: 4,
            }}
          >
            Start your
            <br />
            journey.
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.35)",
              marginBottom: 22,
              fontWeight: 300,
            }}
          >
            Create your free account
          </div>

          {/* Error */}
          {err && (
            <div
              style={{
                fontSize: 12,
                color: "#f43f5e",
                marginBottom: 12,
                padding: "9px 13px",
                background: "rgba(244,63,94,0.08)",
                border: "1px solid rgba(244,63,94,0.2)",
                borderRadius: 10,
              }}
            >
              {err}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Name */}
            <div style={{ marginBottom: 10 }}>
              <input
                className="field-input"
                type="text"
                placeholder="Full name"
                value={username}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div style={{ marginBottom: 10 }}>
              <input
                className="field-input"
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 6 }}>
              <div className="pass-wrap">
                <input
                  className={`field-input ${err.includes("match") ? "err" : ""}`}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ paddingRight: 50 }}
                />
                <button
                  type="button"
                  className="pass-eye"
                  onClick={() => setShowPass((p) => !p)}
                >
                  {showPass ? "Hide" : "Show"}
                </button>
              </div>
              {/* Strength bar */}
              {password.length > 0 && (
                <div style={{ display: "flex", gap: 4, marginTop: 5 }}>
                  {[1, 2, 3, 4].map((seg) => (
                    <div
                      key={seg}
                      style={{
                        height: 3,
                        flex: 1,
                        borderRadius: 2,
                        background:
                          seg <= strength
                            ? strengthColor[strength]
                            : "rgba(255,255,255,0.08)",
                        transition: "background 0.3s",
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Confirm password */}
            <div style={{ marginBottom: 14 }}>
              <div className="pass-wrap">
                <input
                  className={`field-input ${err.includes("match") ? "err" : ""}`}
                  type={showConf ? "text" : "password"}
                  placeholder="Confirm password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  required
                  style={{ paddingRight: 50 }}
                />
                <button
                  type="button"
                  className="pass-eye"
                  onClick={() => setShowConf((p) => !p)}
                >
                  {showConf ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            {/* Terms */}
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 8,
                marginBottom: 18,
              }}
            >
              <input
                className="custom-checkbox"
                type="checkbox"
                id="agree"
                checked={agree}
                onChange={(e) => setAgree(e.target.checked)}
                style={{ marginTop: 2 }}
              />
              <label
                htmlFor="agree"
                style={{
                  fontSize: 11,
                  color: "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  lineHeight: 1.6,
                }}
              >
                I agree to the{" "}
                <span style={{ color: "rgba(255,255,255,0.6)" }}>
                  Terms of Service
                </span>{" "}
                and{" "}
                <span style={{ color: "rgba(255,255,255,0.6)" }}>
                  Privacy Policy
                </span>
              </label>
            </div>

            {error && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 9,
                  padding: "10px 14px",
                  marginBottom: 14,
                  background: "rgba(239, 68, 68, 0.08)",
                  border: "1px solid rgba(239, 68, 68, 0.2)",
                  borderRadius: 10,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="rgba(239,68,68,0.9)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: 1 }}
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span
                  style={{
                    fontSize: 12,
                    color: "rgba(239, 68, 68, 0.85)",
                    lineHeight: 1.5,
                  }}
                >
                  {error}
                </span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              style={{
                width: "100%",
                padding: "13px",
                background: "#fff",
                color: "#090a0f",
                fontFamily: "'Syne', sans-serif",
                fontSize: 13,
                fontWeight: 700,
                letterSpacing: "-0.01em",
                border: "none",
                borderRadius: 12,
                cursor: "pointer",
                transition: "opacity 0.18s",
              }}
              onMouseEnter={(e) => (e.target.style.opacity = "0.9")}
              onMouseLeave={(e) => (e.target.style.opacity = "1")}
            >
              Create Account
            </button>
          </form>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "14px 0",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
            <span style={{ fontSize: 11, color: "rgba(255,255,255,0.18)" }}>
              or
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>

          {/* Google */}
          <button
            className="social-btn"
            onClick={() => console.log("Google sign-up")}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Sign up with Google
          </button>

          {/* Sign in link */}
          <div
            style={{
              textAlign: "center",
              marginTop: 16,
              fontSize: 12,
              color: "rgba(255,255,255,0.22)",
            }}
          >
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              style={{
                color: "rgba(255,255,255,0.7)",
                fontWeight: 500,
                background: "none",
                border: "none",
                cursor: "pointer",
                fontSize: 12,
                padding: 0,
                marginLeft: 3,
              }}
              onMouseEnter={(e) => (e.target.style.color = "#fff")}
              onMouseLeave={(e) =>
                (e.target.style.color = "rgba(255,255,255,0.7)")
              }
            >
              Sign in
            </button>
          </div>
        </div>

        {/* ── Genre Side Panel ── */}
        <div style={{ width: 240 }}>
          <div
            style={{
              fontSize: 10,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
              marginBottom: 16,
            }}
          >
            Browse by genre
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {genres.map((g) => (
              <div className="genre-item" key={g.name}>
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: g.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: "rgba(255,255,255,0.55)",
                    flex: 1,
                  }}
                >
                  {g.name}
                </span>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.2)" }}>
                  {g.count}
                </span>
              </div>
            ))}
          </div>
          <div
            style={{
              marginTop: 20,
              fontSize: 11,
              color: "rgba(255,255,255,0.15)",
              lineHeight: 1.7,
            }}
          >
            Join thousands of film lovers
            <br />
            building their perfect watchlist.
          </div>
        </div>
      </div>
    </>
  );
}
