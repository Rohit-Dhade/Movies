import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useMovie } from "../hook/useMovie";
import { useAuth } from "../../auth/hook/useAuth";
import { RemoveWatchMovieLater } from "../services/home.api";

const getBg = (genre = "") => {
  if (genre.includes("Action"))
    return "linear-gradient(135deg,#1a1a2e,#16213e,#0f3460)";
  if (genre.includes("Drama"))
    return "linear-gradient(135deg,#2c061f,#1b1b2f,#162447)";
  if (genre.includes("Comedy"))
    return "linear-gradient(135deg,#134e5e,#71b280)";
  if (genre.includes("Sci-Fi"))
    return "linear-gradient(135deg,#000428,#004e92)";
  if (genre.includes("Crime")) return "linear-gradient(135deg,#232526,#414345)";
  return "linear-gradient(135deg,#141e30,#243b55)";
};

const GENRE_COLOR = {
  Action: "#f43f5e",
  Drama: "#f59e0b",
  Comedy: "#22c55e",
  "Sci-Fi": "#6366f1",
  Thriller: "#14b8a6",
  Crime: "#a855f7",
  Adventure: "#38bdf8",
  Biography: "#f97316",
  Western: "#d97706",
  History: "#84cc16",
};
const gc = (genre) => GENRE_COLOR[genre.split(",")[0].trim()] || "#888";

export default function HomePage() {
  const navigate = useNavigate();
  const [slide, setSlide] = useState(0);
  const [profileOpen, setProfileOpen] = useState(false);
  const [watchLater, setWatchLater] = useState([]);
  const [watchLaterOpen, setWatchLaterOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeGenre, setActiveGenre] = useState("All");
  const timerRef = useRef(null);
  const {
    movies,
    loading,
    watchlater,
    selected,
    handleAllMovies,
    handleWatchLater,
    handleRemoveWatchLater,
    handleGetmovie
  } = useMovie();

  const { user, handlegetme, handlelogout } = useAuth();

  useEffect(() => {
    const fetchMovies = async () => {
      await handleAllMovies();
    };
    fetchMovies();
  }, []);

  const handleAddWatchLater = async (
    e,
    userId,
    title,
    PosterUrl,
    year,
    genre,
  ) => {
    e.preventDefault();
    await handleWatchLater(userId, title, PosterUrl, year, genre);
  };

  const handleRemovefromWatchLater = async (e, userId, movieTitle) => {
    e.preventDefault();
    // await RemoveWatchMovieLater(userId, movieTitle);
    await handleRemoveWatchLater(userId, movieTitle);
  };

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(
      () => setSlide((s) => (s + 1) % movies.length),
      5500,
    );
  };

  useEffect(() => {
    if (movies.length) startTimer();
    return () => clearInterval(timerRef.current);
  }, [movies]);

  const goSlide = (i) => {
    setSlide(i);
    startTimer();
  };

  const toggleWL = (movie) =>
    setWatchLater((prev) =>
      prev.find((m) => m.imdbID === movie.imdbID)
        ? prev.filter((m) => m.imdbID !== movie.imdbID)
        : [...prev, movie],
    );

  const inWL = (id) => watchLater.some((m) => m.imdbID === id);

  const allGenres = [
    "All",
    ...Array.from(
      new Set(movies?.flatMap((m) => m.Genre.split(", ").map((g) => g.trim()))),
    ),
  ];

  const filtered = movies.filter((m) => {
    const matchG = activeGenre === "All" || m.Genre.includes(activeGenre);
    const matchS = m.Title.toLowerCase().includes(search.toLowerCase());
    return matchG && matchS;
  });

  const cur = movies[slide] || {};

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#090a0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          gap: 16,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(255,255,255,0.1)",
            borderTop: "3px solid #fff",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          Loading movies...
        </p>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#090a0f;color:#f1f1f5;min-height:100vh}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#090a0f}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
        .syne{font-family:'Syne',sans-serif}

        /* NAV */
        .nav{position:sticky;top:0;z-index:100;height:60px;background:rgba(9,10,15,0.9);border-bottom:1px solid rgba(255,255,255,0.06);backdrop-filter:blur(20px)}
        .nav-inner{max-width:1280px;margin:0 auto;padding:0 40px;height:100%;display:flex;align-items:center;justify-content:space-between}
        .nav-logo{display:flex;align-items:center;gap:8px;font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:#fff;letter-spacing:-0.02em}
        .logo-dot{width:7px;height:7px;border-radius:50%;background:#fff}
        .nav-search{flex:1;max-width:300px;margin:0 32px;padding:8px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:9px;color:#fff;font-family:'Inter',sans-serif;font-size:13px;outline:none;transition:border-color 0.2s}
        .nav-search::placeholder{color:rgba(255,255,255,0.22)}
        .nav-search:focus{border-color:rgba(255,255,255,0.2);background:rgba(255,255,255,0.07)}
        .nav-right{display:flex;align-items:center;gap:10px}

        .wl-btn{display:flex;align-items:center;gap:6px;padding:7px 14px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);border-radius:9px;color:rgba(255,255,255,0.65);font-size:12px;font-weight:500;cursor:pointer;font-family:'Inter',sans-serif;transition:all 0.18s}
        .wl-btn:hover{background:rgba(255,255,255,0.09);color:#fff}
        .wl-count{min-width:17px;height:17px;background:#f43f5e;border-radius:9px;font-size:10px;font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 4px;color:#fff}
        .avatar{width:34px;height:34px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;font-size:13px;font-weight:700;color:#fff;cursor:pointer;border:2px solid rgba(255,255,255,0.1);transition:border-color 0.18s;font-family:'Syne',sans-serif;flex-shrink:0}
        .avatar:hover{border-color:rgba(255,255,255,0.3)}

        /* PROFILE CARD */
        .profile-card{position:absolute;top:48px;right:0;width:230px;background:#14151c;border:1px solid rgba(255,255,255,0.09);border-radius:14px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.6);animation:dropDown 0.2s cubic-bezier(0.16,1,0.3,1) both;z-index:200}
        @keyframes dropDown{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
        .pcard-head{padding:18px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;gap:11px}
        .pcard-av{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#6366f1,#a855f7);display:flex;align-items:center;justify-content:center;font-size:17px;font-weight:700;color:#fff;font-family:'Syne',sans-serif;flex-shrink:0}
        .pcard-name{font-size:13px;font-weight:600;color:#fff;font-family:'Syne',sans-serif}
        .pcard-email{font-size:11px;color:rgba(255,255,255,0.3);margin-top:2px}
        .pcard-menu{padding:7px}
        .pcard-item{display:flex;align-items:center;gap:9px;padding:9px 11px;border-radius:8px;font-size:12px;color:rgba(255,255,255,0.6);cursor:pointer;transition:background 0.15s,color 0.15s;border:none;background:none;width:100%;text-align:left;font-family:'Inter',sans-serif}
        .pcard-item:hover{background:rgba(255,255,255,0.05);color:#fff}
        .pcard-item.danger{color:#f43f5e}
        .pcard-item.danger:hover{background:rgba(244,63,94,0.08)}
        .pcard-div{height:1px;background:rgba(255,255,255,0.06);margin:4px 8px}

        /* HERO */
        .hero{position:relative;height:500px;overflow:hidden;width:100%}
        .hero-bg{position:absolute;inset:0;transition:background 0.8s ease}

        /* Poster sits on the right edge of the full viewport */
        .hero-poster{position:absolute;right:0;top:0;bottom:0;width:45%;max-width:640px}
        .hero-poster img{width:100%;height:100%;object-fit:cover;object-position:top}
        .hero-poster::before{content:'';position:absolute;inset:0;background:linear-gradient(to right,#090a0f 0%,transparent 50%);z-index:1}
        .hero-poster::after{content:'';position:absolute;inset:0;background:linear-gradient(to top,#090a0f 0%,transparent 50%);z-index:1}

        /* Content overlay covers full width with gradient fade */
        .hero-content{position:absolute;inset:0;z-index:5;background:linear-gradient(to right,rgba(9,10,15,1) 0%,rgba(9,10,15,0.95) 40%,rgba(9,10,15,0.4) 70%,rgba(9,10,15,0) 100%)}

        /* Inner text starts from left with consistent padding */
        .hero-inner{width:100%;padding:0 40px 44px;height:100%;display:flex;flex-direction:column;justify-content:flex-end}

        .hero-rated{display:inline-block;padding:2px 8px;border:1px solid rgba(255,255,255,0.22);border-radius:4px;font-size:10px;letter-spacing:0.1em;color:rgba(255,255,255,0.45);margin-bottom:12px;width:fit-content}
        .hero-title{font-family:'Syne',sans-serif;font-size:40px;font-weight:800;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:10px;max-width:520px}
        .hero-meta{display:flex;align-items:center;gap:16px;margin-bottom:12px;font-size:12px;color:rgba(255,255,255,0.4)}
        .star-gold{color:#f59e0b}
        .hero-plot{font-size:13px;color:rgba(255,255,255,0.42);max-width:480px;line-height:1.75;margin-bottom:14px;font-weight:300}
        .hero-actors{font-size:12px;color:rgba(255,255,255,0.28);margin-bottom:22px}
        .hero-actions{display:flex;gap:10px;align-items:center;margin-bottom:22px}
        .btn-primary{padding:11px 24px;background:#fff;color:#090a0f;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;border:none;border-radius:10px;cursor:pointer;letter-spacing:-0.01em;transition:opacity 0.18s}
        .btn-primary:hover{opacity:0.88}
        .btn-wl{padding:11px 18px;background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.65);font-family:'Inter',sans-serif;font-size:13px;border:1px solid rgba(255,255,255,0.1);border-radius:10px;cursor:pointer;transition:all 0.18s;display:flex;align-items:center;gap:6px}
        .btn-wl.saved{background:rgba(244,63,94,0.15);border-color:rgba(244,63,94,0.3);color:#f43f5e}
        .btn-wl:not(.saved):hover{background:rgba(255,255,255,0.1)}

        /* Ratings chips */
        .ratings-row{display:flex;gap:10px;margin-bottom:14px}
        .rchip{padding:3px 10px;border-radius:6px;font-size:11px;font-weight:500}
        .rchip-imdb{background:rgba(245,158,11,0.15);color:#f59e0b}
        .rchip-rt{background:rgba(244,63,94,0.15);color:#f43f5e}
        .rchip-meta{background:rgba(99,102,241,0.15);color:#818cf8}

        /* Slider dots */
        .hero-dots{display:flex;gap:6px}
        .hero-dot{height:3px;border-radius:2px;background:rgba(255,255,255,0.2);cursor:pointer;transition:all 0.35s}
        .hero-dot.active{width:36px;background:#fff}
        .hero-dot:not(.active){width:20px}

        /* MAIN */
        .main{padding:32px 0}
        .container{max-width:1280px;margin:0 auto;padding:0 40px}
        .genre-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:24px}
        .gpill{padding:6px 15px;border-radius:20px;font-size:12px;font-weight:500;cursor:pointer;border:none;font-family:'Inter',sans-serif;transition:all 0.18s}
        .gpill.active{background:#fff;color:#090a0f}
        .gpill.off{background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.42)}
        .gpill.off:hover{background:rgba(255,255,255,0.09);color:rgba(255,255,255,0.75)}
        .sec-head{display:flex;align-items:baseline;gap:10px;margin-bottom:18px}
        .sec-title{font-family:'Syne',sans-serif;font-size:20px;font-weight:800;color:#fff;letter-spacing:-0.02em}
        .sec-count{font-size:12px;color:rgba(255,255,255,0.25)}

        /* MOVIE GRID */
        .movie-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:18px}
        .mcard{border-radius:14px;overflow:hidden;border:1px solid rgba(255,255,255,0.06);background:#0f1015;transition:transform 0.22s cubic-bezier(0.16,1,0.3,1),box-shadow 0.22s,border-color 0.22s;position:relative}
        .mcard:hover{transform:translateY(-4px);border-color:rgba(255,255,255,0.12);box-shadow:0 16px 40px rgba(0,0,0,0.4)}
        .mcard-img-wrap{position:relative;height:220px;overflow:hidden}
        .mcard-img-wrap img{width:100%;height:100%;object-fit:cover;transition:transform 0.4s cubic-bezier(0.16,1,0.3,1)}
        .mcard:hover .mcard-img-wrap img{transform:scale(1.04)}
        .img-overlay{position:absolute;inset:0;background:linear-gradient(to top,rgba(15,16,21,1) 0%,transparent 55%);z-index:1}
        .wl-tog{position:absolute;top:10px;right:10px;z-index:2;width:30px;height:30px;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:13px;border:none;cursor:pointer;transition:all 0.18s;backdrop-filter:blur(8px)}
        .wl-tog.off{background:rgba(0,0,0,0.55);color:rgba(255,255,255,0.55);border:1px solid rgba(255,255,255,0.1)}
        .wl-tog.off:hover{background:rgba(244,63,94,0.75);color:#fff;border-color:transparent}
        .wl-tog.on{background:rgba(244,63,94,0.9);color:#fff;border:none}
        .mcard-info{padding:12px 14px 14px}
        .mcard-title{font-family:'Syne',sans-serif;font-size:13px;font-weight:700;color:#fff;letter-spacing:-0.01em;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;margin-bottom:6px}
        .mcard-row{display:flex;align-items:center;justify-content:space-between;margin-bottom:3px}
        .gtag{font-size:10px;font-weight:500;padding:2px 8px;border-radius:6px}
        .rating-txt{display:flex;align-items:center;gap:3px;font-size:12px;color:rgba(255,255,255,0.45)}
        .mcard-foot{display:flex;justify-content:space-between}
        .mcard-year{font-size:11px;color:rgba(255,255,255,0.22)}
        .mcard-rt{font-size:10px;color:rgba(255,255,255,0.18)}

        /* DRAWER */
        .drawer-overlay{position:fixed;inset:0;z-index:150;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);animation:fadeIn 0.2s ease both}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .drawer{position:fixed;top:0;right:0;bottom:0;width:340px;z-index:160;background:#0f1015;border-left:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;animation:slideIn 0.3s cubic-bezier(0.16,1,0.3,1) both;box-shadow:-20px 0 60px rgba(0,0,0,0.5)}
        @keyframes slideIn{from{transform:translateX(100%)}to{transform:translateX(0)}}
        .drawer-head{padding:22px;border-bottom:1px solid rgba(255,255,255,0.06);display:flex;align-items:center;justify-content:space-between}
        .drawer-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:#fff;letter-spacing:-0.02em}
        .d-close{width:28px;height:28px;border-radius:8px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.5);display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:14px;transition:all 0.15s}
        .d-close:hover{background:rgba(255,255,255,0.1);color:#fff}
        .drawer-body{flex:1;overflow-y:auto;padding:14px}
        .d-movie{display:flex;align-items:center;gap:11px;padding:10px;border-radius:10px;border:1px solid rgba(255,255,255,0.05);background:rgba(255,255,255,0.02);margin-bottom:8px;transition:background 0.15s}
        .d-movie:hover{background:rgba(255,255,255,0.05)}
        .d-thumb{width:38px;height:52px;border-radius:6px;overflow:hidden;flex-shrink:0}
        .d-thumb img{width:100%;height:100%;object-fit:cover}
        .d-info{flex:1}
        .d-title{font-size:12px;font-weight:600;color:#fff}
        .d-meta{font-size:10px;color:rgba(255,255,255,0.3);margin-top:2px}
        .d-rm{width:26px;height:26px;border-radius:6px;background:rgba(244,63,94,0.1);border:1px solid rgba(244,63,94,0.2);color:#f43f5e;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:11px;flex-shrink:0;transition:background 0.15s}
        .d-rm:hover{background:rgba(244,63,94,0.2)}
        .d-empty{text-align:center;padding:50px 20px;color:rgba(255,255,255,0.2);font-size:13px;line-height:1.8}
        .d-empty-icon{font-size:32px;display:block;margin-bottom:12px}
        .no-result{text-align:center;padding:60px 0;color:rgba(255,255,255,0.2);font-size:13px}
        .page-enter{animation:up 0.5s cubic-bezier(0.16,1,0.3,1) both}
        @keyframes up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin{to{transform:rotate(360deg)}}
      `}</style>

      {/* NAVBAR */}
      <nav className="nav">
        <div className="nav-inner">
          <div className="nav-logo">
            <div className="logo-dot" />
            CineVault
          </div>
          <input
            className="nav-search"
            type="text"
            placeholder="Search movies..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="nav-right">
            <button className="wl-btn" onClick={() => setWatchLaterOpen(true)}>
              🕐 Watch Later
              {watchlater.length > 0 && (
                <span className="wl-count">{watchlater.length}</span>
              )}
            </button>
            <div style={{ position: "relative" }}>
              <div className="avatar" onClick={() => setProfileOpen((p) => !p)}>
                {user.username[0]}
              </div>
              {profileOpen && (
                <>
                  <div
                    style={{ position: "fixed", inset: 0, zIndex: 199 }}
                    onClick={() => setProfileOpen(false)}
                  />
                  <div className="profile-card">
                    <div className="pcard-head">
                      <div className="pcard-av">{user.username[0]}</div>
                      <div>
                        <div className="pcard-name">{user.username}</div>
                        <div className="pcard-email">{user.email}</div>
                      </div>
                    </div>
                    <div className="pcard-menu">
                      <button className="pcard-item">👤 My Profile</button>
                      <button className="pcard-item">⚙️ Settings</button>
                      <button
                        className="pcard-item"
                        onClick={() => {
                          setWatchLaterOpen(true);
                          setProfileOpen(false);
                        }}
                      >
                        🕐 Watch Later{" "}
                        {watchlater.length > 0 && (
                          <span
                            className="wl-count"
                            style={{ marginLeft: "auto" }}
                          >
                            {watchlater.length}
                          </span>
                        )}
                      </button>
                      <div className="pcard-div" />
                      <button
                        className="pcard-item danger"
                        onClick={() => handlelogout()}
                      >
                        🚪 Log Out
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SLIDER */}
      <div className="hero">
        {/* Full-width background gradient based on genre */}
        <div className="hero-bg" style={{ background: getBg(cur.Genre) }} />

        {/* Poster — flush to right edge of viewport */}
        <div className="hero-poster">
          <img
            src={cur.Poster}
            alt={cur.Title}
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        </div>

        {/* Content overlay — full width gradient, text centered inside */}
        <div className="hero-content">
          <div className="hero-inner">
            <span className="hero-rated">{cur.Rated}</span>
            <div className="hero-title syne">{cur.Title}</div>
            <div className="hero-meta">
              <span>
                <span className="star-gold">★</span> {cur.imdbRating}
              </span>
              <span>{cur.Year}</span>
              <span>{cur.Runtime}</span>
              <span>{cur.Genre?.split(",")[0] || ""}</span>
            </div>
            <div className="ratings-row">
              {cur.Ratings?.map((r, i) => (
                <span
                  key={i}
                  className={`rchip ${["rchip-imdb", "rchip-rt", "rchip-meta"][i]}`}
                >
                  {r.Value}
                </span>
              ))}
            </div>
            <div className="hero-plot">{cur.Plot}</div>
            <div className="hero-actors">🎬 {cur.Actors}</div>
            <div className="hero-actions">
              <button className="btn-primary">▶ Watch Trailer Now</button>
              <button
                className={`btn-wl ${inWL(cur.imdbID) ? "saved" : ""}`}
                onClick={(e) => {
                  (toggleWL(cur),
                    handleAddWatchLater(
                      e,
                      user.Id,
                      cur.Title,
                      cur.Poster,
                      cur.Year,
                      cur.Genre,
                    ));
                }}
              >
                {inWL(cur.imdbID) ? "🔖 Saved" : "+ Watch Later"}
              </button>
            </div>
            <div className="hero-dots">
              {movies.slice(0, 8).map((_, i) => (
                <div
                  key={i}
                  className={`hero-dot ${i === slide ? "active" : ""}`}
                  onClick={() => goSlide(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* WATCH LATER DRAWER */}
      {watchLaterOpen && (
        <>
          <div
            className="drawer-overlay"
            onClick={() => setWatchLaterOpen(false)}
          />
          <div className="drawer">
            <div className="drawer-head">
              <div className="drawer-title">Watch Later</div>
              <button
                className="d-close"
                onClick={() => setWatchLaterOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="drawer-body">
              {watchlater.length === 0 ? (
                <div className="d-empty">
                  <span className="d-empty-icon">🎬</span>
                  Nothing saved yet.
                  <br />
                  Hit + Watch Later on any movie.
                </div>
              ) : (
                watchlater.map((m) => (
                  <div className="d-movie" key={m.title}>
                    <div className="d-thumb">
                      <img src={m.PosterUrl} alt={m.title} />
                    </div>
                    <div className="d-info">
                      <div className="d-title">{m.title}</div>
                      <div className="d-meta">
                        {m.year} · {m.genre?.split(",")[0]}
                      </div>
                    </div>
                    <button
                      className="d-rm"
                      onClick={(e) => {
                        (toggleWL(m),
                          handleRemovefromWatchLater(
                            e,
                            user.Id,
                            m.title,
                            m.title,
                            m.PosterUrl,
                            m.year,
                            m.genre,
                          ));
                      }}
                    ></button>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* MAIN */}
      <main className="main page-enter">
        <div className="container">
          <div className="genre-bar">
            {allGenres.map((g) => (
              <button
                key={g}
                className={`gpill ${activeGenre === g ? "active" : "off"}`}
                onClick={() => setActiveGenre(g)}
              >
                {g}
              </button>
            ))}
          </div>

          <div className="sec-head">
            <div className="sec-title syne">
              {activeGenre === "All" ? "Popular Movies" : activeGenre}
            </div>
            <div className="sec-count">{filtered.length} titles</div>
          </div>

          <div className="movie-grid">
            {filtered.map((movie) => {
              const color = gc(movie.Genre);
              const saved = inWL(movie.imdbID);
              return (
                <div onClick={()=>{handleGetmovie(movie._id),navigate(`/movieDetails/${movie._id}`)}} className="mcard" key={movie.imdbID}>
                  <div className="mcard-img-wrap">
                    <img
                      src={movie.Poster}
                      alt={movie.Title}
                      onError={(e) => {
                        e.target.src = "";
                      }}
                    />
                    <div className="img-overlay" />
                    <button
                      className={`wl-tog ${saved ? "on" : "off"}`}
                      onClick={(e) => {
                        (toggleWL(movie),
                          handleAddWatchLater(
                            e,
                            user.Id,
                            movie.Title,
                            movie.Poster,
                            movie.Year,
                            movie.Genre,
                          ));
                      }}
                    >
                      {saved ? "🔖" : "+"}
                    </button>
                  </div>
                  <div className="mcard-info">
                    <div className="mcard-title">{movie.Title}</div>
                    <div className="mcard-row">
                      <span
                        className="gtag"
                        style={{ background: `${color}18`, color }}
                      >
                        {movie.Genre.split(",")[0].trim()}
                      </span>
                      <span className="rating-txt">
                        <span className="star-gold">★</span>
                        {movie.imdbRating}
                      </span>
                    </div>
                    <div className="mcard-foot">
                      <span className="mcard-year">{movie.Year}</span>
                      <span className="mcard-rt">{movie.Runtime}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="no-result">No movies found for "{search}"</div>
          )}
        </div>
      </main>
    </>
  );
}
