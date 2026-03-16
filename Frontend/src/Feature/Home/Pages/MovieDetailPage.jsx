import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMovie } from "../hook/useMovie";
import { trailer_ids } from "../Comonents/MoviesIDS";
import { useAuth } from "../../auth/hook/useAuth";

const GENRE_COLORS = {
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

const RATING_META = {
  "Internet Movie Database": {
    label: "IMDb",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
  },
  "Rotten Tomatoes": {
    label: "RT",
    color: "#f43f5e",
    bg: "rgba(244,63,94,0.12)",
  },
  Metacritic: { label: "Meta", color: "#818cf8", bg: "rgba(129,140,248,0.12)" },
};

export default function MovieDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    movies,
    selected,
    handleAllMovies,
    handleWatchLater,
    handleGetmovie,
  } = useMovie();

  const { user, handlegetme, handlelogout } = useAuth();

  const [trailerOpen, setTrailerOpen] = useState(false);
  const [wl, setWl] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch all movies list if not loaded, then fetch the specific movie by id
  useEffect(() => {
    if (!movies.length) handleAllMovies();
    handleGetmovie(id);
  }, [id]);

  // Loading state — wait for `selected` to be populated
  if (!selected) {
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
          fontFamily: "'Inter',sans-serif",
        }}
      >
        <div
          style={{
            width: 40,
            height: 40,
            border: "3px solid rgba(255,255,255,0.08)",
            borderTop: "3px solid #fff",
            borderRadius: "50%",
            animation: "spin 0.8s linear infinite",
          }}
        />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>
          Loading movie...
        </p>
      </div>
    );
  }

  // Use `selected` directly — matches the API response shape
  const movie = selected;
  const genres = movie.Genre?.split(", ") || [];
  const ratings = movie.Ratings || [];

  // Known YouTube trailer IDs for all movies
  const TRAILER_IDS = trailer_ids;

  const trailerId = TRAILER_IDS[movie.imdbID] || null;
  const trailerSrc = trailerId
    ? `https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1`
    : null;

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

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@600;700;800&family=Inter:wght@300;400;500&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'Inter',sans-serif;background:#090a0f;color:#f1f1f5}
        ::-webkit-scrollbar{width:4px}::-webkit-scrollbar-track{background:#090a0f}::-webkit-scrollbar-thumb{background:rgba(255,255,255,0.1);border-radius:4px}
        .syne{font-family:'Syne',sans-serif}

        .topbar{position:sticky;top:0;z-index:50;height:56px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;background:rgba(9,10,15,0.95);border-bottom:1px solid rgba(255,255,255,0.06)}
        .back-btn{display:flex;align-items:center;gap:7px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.1);border-radius:9px;padding:7px 14px;color:rgba(255,255,255,0.7);font-size:12px;font-family:'Inter',sans-serif;cursor:pointer;transition:all 0.18s}
        .back-btn:hover{background:rgba(255,255,255,0.12);color:#fff}

        .hero-wrap{position:relative;height:440px;overflow:hidden}
        .hero-img{width:100%;height:100%;object-fit:cover;object-position:top center;filter:brightness(0.28)}
        .hero-overlay{position:absolute;inset:0;background:linear-gradient(to bottom,transparent 0%,rgba(9,10,15,0.7) 60%,#090a0f 100%)}

        .content{max-width:1100px;margin:0 auto;padding:0 40px 80px}
        .main-row{display:flex;gap:44px;margin-top:-200px;position:relative;z-index:10}

        .poster-col{flex-shrink:0;width:210px}
        .poster-img{width:210px;height:315px;object-fit:cover;border-radius:14px;border:1px solid rgba(255,255,255,0.08);display:block;box-shadow:0 24px 60px rgba(0,0,0,0.7)}
        .side-card{margin-top:12px;padding:13px 15px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:12px}
        .side-label{font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:rgba(255,255,255,0.25);margin-bottom:4px}
        .side-val{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#f59e0b}
        .side-txt{font-size:11px;color:rgba(255,255,255,0.45);line-height:1.6}

        .info-col{flex:1;padding-top:110px;min-width:0}
        .rated-badge{display:inline-block;padding:2px 8px;border:1px solid rgba(255,255,255,0.2);border-radius:4px;font-size:10px;letter-spacing:0.1em;color:rgba(255,255,255,0.4);margin-bottom:10px}
        .movie-title{font-family:'Syne',sans-serif;font-size:38px;font-weight:800;color:#fff;letter-spacing:-0.03em;line-height:1.05;margin-bottom:10px}
        .meta-row{display:flex;align-items:center;gap:16px;font-size:12px;color:rgba(255,255,255,0.38);margin-bottom:12px;flex-wrap:wrap}
        .star-gold{color:#f59e0b}.votes{color:rgba(255,255,255,0.2);font-size:11px;margin-left:2px}
        .genre-tags{display:flex;gap:7px;flex-wrap:wrap;margin-bottom:14px}
        .gtag{padding:3px 11px;border-radius:20px;font-size:11px;font-weight:500}
        .ratings-row{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:22px}
        .rchip{padding:4px 12px;border-radius:8px;font-size:11px;font-weight:600}

        .action-row{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:32px}
        .btn-watch{display:flex;align-items:center;gap:7px;padding:12px 24px;background:#fff;color:#090a0f;font-family:'Syne',sans-serif;font-size:13px;font-weight:700;border:none;border-radius:11px;cursor:pointer;transition:opacity 0.18s}
        .btn-watch:hover{opacity:0.88}
        .btn-trailer{display:flex;align-items:center;gap:7px;padding:12px 20px;background:rgba(255,255,255,0.07);border:1px solid rgba(255,255,255,0.12);color:rgba(255,255,255,0.85);font-family:'Inter',sans-serif;font-size:13px;border-radius:11px;cursor:pointer;transition:all 0.18s}
        .btn-trailer:hover{background:rgba(255,255,255,0.12);color:#fff}
        .btn-wl{display:flex;align-items:center;gap:7px;padding:12px 18px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);color:rgba(255,255,255,0.55);font-family:'Inter',sans-serif;font-size:13px;border-radius:11px;cursor:pointer;transition:all 0.18s}
        .btn-wl.saved{background:rgba(244,63,94,0.15);border-color:rgba(244,63,94,0.3);color:#f43f5e}
        .btn-wl:not(.saved):hover{background:rgba(255,255,255,0.09);color:#fff}

        .tabs-row{display:flex;border-bottom:1px solid rgba(255,255,255,0.07);margin-bottom:24px}
        .tab-btn{padding:9px 18px;background:none;border:none;font-family:'Inter',sans-serif;font-size:12px;font-weight:500;color:rgba(255,255,255,0.3);cursor:pointer;border-bottom:2px solid transparent;margin-bottom:-1px;transition:color 0.18s,border-color 0.18s}
        .tab-btn.active{color:#fff;border-bottom-color:#fff}
        .tab-btn:hover:not(.active){color:rgba(255,255,255,0.6)}
        .tab-content{animation:tabIn 0.22s ease both}
        @keyframes tabIn{from{opacity:0;transform:translateY(5px)}to{opacity:1;transform:translateY(0)}}

        .plot-text{font-size:14px;color:rgba(255,255,255,0.52);line-height:1.9;max-width:680px;font-weight:300}

        .details-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:12px}
        .detail-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:11px;padding:13px 15px}
        .detail-label{font-size:10px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.22);margin-bottom:4px}
        .detail-value{font-size:13px;color:rgba(255,255,255,0.68);font-weight:500;line-height:1.5}

        .cast-grid{display:flex;gap:9px;flex-wrap:wrap}
        .cast-card{display:flex;align-items:center;gap:9px;padding:9px 13px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:11px}
        .cast-av{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;font-family:'Syne',sans-serif;flex-shrink:0}
        .cast-name{font-size:12px;color:rgba(255,255,255,0.65);font-weight:500}
        .section-sub{font-size:10px;letter-spacing:0.13em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin:18px 0 10px}

        .modal-overlay{position:fixed;inset:0;z-index:200;background:rgba(0,0,0,0.92);display:flex;align-items:center;justify-content:center;padding:24px;backdrop-filter:blur(8px);animation:fadeIn 0.2s ease both}
        @keyframes fadeIn{from{opacity:0}to{opacity:1}}
        .modal-box{width:100%;max-width:880px;animation:scaleIn 0.25s cubic-bezier(0.16,1,0.3,1) both}
        @keyframes scaleIn{from{opacity:0;transform:scale(0.93)}to{opacity:1;transform:scale(1)}}
        .modal-header{display:flex;align-items:center;justify-content:space-between;margin-bottom:12px}
        .modal-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#fff}
        .modal-close{width:30px;height:30px;border-radius:8px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.6);font-size:15px;display:flex;align-items:center;justify-content:center;cursor:pointer;transition:all 0.15s}
        .modal-close:hover{background:rgba(255,255,255,0.15);color:#fff}
        .iframe-wrap{position:relative;width:100%;padding-bottom:56.25%;border-radius:13px;overflow:hidden;background:#000;box-shadow:0 32px 80px rgba(0,0,0,0.9)}
        .iframe-wrap iframe{position:absolute;inset:0;width:100%;height:100%;border:none}
        .modal-note{margin-top:8px;font-size:11px;color:rgba(255,255,255,0.18);text-align:center}

        .page-enter{animation:pageUp 0.5s cubic-bezier(0.16,1,0.3,1) both}
        @keyframes pageUp{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* TOP BAR */}
      <div className="topbar">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <span
          className="syne"
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "rgba(255,255,255,0.3)",
          }}
        >
          CineVault
        </span>
      </div>

      {/* HERO BACKDROP */}
      <div className="hero-wrap">
        <img
          className="hero-img"
          src={movie.Poster}
          alt={movie.Title}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
        <div className="hero-overlay" />
      </div>

      {/* MAIN CONTENT */}
      <div className="content page-enter">
        <div className="main-row">
          {/* Poster + side cards */}
          <div className="poster-col">
            <img
              className="poster-img"
              src={movie.Poster}
              alt={movie.Title}
              onError={(e) => {
                e.target.style.opacity = "0.3";
              }}
            />

            {movie.BoxOffice && movie.BoxOffice !== "N/A" && (
              <div className="side-card">
                <div className="side-label">Box Office</div>
                <div className="side-val">{movie.BoxOffice}</div>
              </div>
            )}

            {movie.Awards && movie.Awards !== "N/A" && (
              <div className="side-card">
                <div className="side-label">Awards</div>
                <div className="side-txt">{movie.Awards}</div>
              </div>
            )}

            {movie.Metascore && movie.Metascore !== "N/A" && (
              <div className="side-card">
                <div className="side-label">Metascore</div>
                <div
                  style={{
                    display: "inline-block",
                    padding: "4px 10px",
                    borderRadius: 6,
                    background:
                      Number(movie.Metascore) >= 70
                        ? "rgba(34,197,94,0.15)"
                        : Number(movie.Metascore) >= 50
                          ? "rgba(245,158,11,0.15)"
                          : "rgba(244,63,94,0.15)",
                    color:
                      Number(movie.Metascore) >= 70
                        ? "#22c55e"
                        : Number(movie.Metascore) >= 50
                          ? "#f59e0b"
                          : "#f43f5e",
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 18,
                    fontWeight: 700,
                  }}
                >
                  {movie.Metascore}
                </div>
              </div>
            )}
          </div>

          {/* Info column */}
          <div className="info-col">
            <span className="rated-badge">{movie.Rated}</span>

            <div className="movie-title syne">{movie.Title}</div>

            <div className="meta-row">
              <span>
                <span className="star-gold">★</span> {movie.imdbRating}
                <span className="votes">({movie.imdbVotes} votes)</span>
              </span>
              <span>{movie.Year}</span>
              <span>{movie.Runtime}</span>
              {movie.Language && <span>{movie.Language}</span>}
              {movie.Country && <span>{movie.Country}</span>}
            </div>

            {/* Genre tags */}
            <div className="genre-tags">
              {genres.map((g) => {
                const c = GENRE_COLORS[g.trim()] || "#888";
                return (
                  <span
                    key={g}
                    className="gtag"
                    style={{ background: `${c}18`, color: c }}
                  >
                    {g.trim()}
                  </span>
                );
              })}
            </div>

            {/* Rating chips */}
            <div className="ratings-row">
              {ratings.map((r) => {
                const m = RATING_META[r.Source] || {
                  label: r.Source.slice(0, 4),
                  color: "#888",
                  bg: "rgba(136,136,136,0.1)",
                };
                return (
                  <span
                    key={r._id || r.Source}
                    className="rchip"
                    style={{ background: m.bg, color: m.color }}
                  >
                    {m.label}: {r.Value}
                  </span>
                );
              })}
            </div>

            {/* Action buttons */}
            <div className="action-row">
              <button className="btn-watch">▶ Watch Now</button>
              <button
                className="btn-trailer"
                onClick={() => setTrailerOpen(true)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polygon points="10 8 16 12 10 16 10 8" />
                </svg>
                {trailerSrc ? "Watch Trailer" : "Search Trailer"}
              </button>
              <button
                className={`btn-wl ${wl ? "saved" : ""}`}
                onClick={(e) => {
                  (setWl((p) => !p),
                    handleAddWatchLater(
                      e,
                      user.Id,
                      selected.Title,
                      selected.Poster,
                      selected.Year,
                      selected.Genre,
                    ));
                }}
              >
                {wl ? "🔖 Saved" : "+ Watch Later"}
              </button>
            </div>

            {/* Tabs */}
            <div className="tabs-row">
              {["overview", "details", "cast"].map((tab) => (
                <button
                  key={tab}
                  className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {/* Overview */}
            {activeTab === "overview" && (
              <div className="tab-content">
                <p className="plot-text">{movie.Plot}</p>
              </div>
            )}

            {/* Details */}
            {activeTab === "details" && (
              <div className="tab-content">
                <div className="details-grid">
                  {[
                    { label: "Director", value: movie.Director },
                    { label: "Writer", value: movie.Writer },
                    { label: "Released", value: movie.Released },
                    { label: "Country", value: movie.Country },
                    { label: "Language", value: movie.Language },
                    {
                      label: "Production",
                      value:
                        movie.Production !== "N/A" ? movie.Production : "—",
                    },
                    { label: "Runtime", value: movie.Runtime },
                    { label: "Type", value: movie.Type },
                    { label: "IMDb ID", value: movie.imdbID },
                    {
                      label: "DVD",
                      value: movie.DVD !== "N/A" ? movie.DVD : "—",
                    },
                  ].map(({ label, value }) => (
                    <div className="detail-card" key={label}>
                      <div className="detail-label">{label}</div>
                      <div className="detail-value">{value || "—"}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Cast */}
            {activeTab === "cast" && (
              <div className="tab-content">
                <div className="cast-grid">
                  {movie.Actors?.split(", ").map((actor) => (
                    <div className="cast-card" key={actor}>
                      <div
                        className="cast-av"
                        style={{
                          background: "linear-gradient(135deg,#6366f1,#a855f7)",
                        }}
                      >
                        {actor.charAt(0)}
                      </div>
                      <span className="cast-name">{actor}</span>
                    </div>
                  ))}
                </div>
                {movie.Director && (
                  <>
                    <div className="section-sub">Director</div>
                    <div className="cast-grid">
                      {movie.Director.split(", ").map((d) => (
                        <div className="cast-card" key={d}>
                          <div
                            className="cast-av"
                            style={{
                              background:
                                "linear-gradient(135deg,#f59e0b,#ef4444)",
                            }}
                          >
                            {d.charAt(0)}
                          </div>
                          <span className="cast-name">{d}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
                {movie.Writer && (
                  <>
                    <div className="section-sub">Writers</div>
                    <div className="cast-grid">
                      {movie.Writer.split(", ").map((w) => (
                        <div className="cast-card" key={w}>
                          <div
                            className="cast-av"
                            style={{
                              background:
                                "linear-gradient(135deg,#14b8a6,#6366f1)",
                            }}
                          >
                            {w.charAt(0)}
                          </div>
                          <span className="cast-name">{w}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* TRAILER MODAL */}
      {trailerOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) setTrailerOpen(false);
          }}
        >
          <div className="modal-box">
            <div className="modal-header">
              <div className="modal-title">
                🎬 {movie.Title} — Official Trailer
              </div>
              <button
                className="modal-close"
                onClick={() => setTrailerOpen(false)}
              >
                ✕
              </button>
            </div>

            {trailerSrc ? (
              <>
                <div className="iframe-wrap">
                  <iframe
                    key={trailerSrc}
                    src={trailerSrc}
                    title={`${movie.Title} Trailer`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                  />
                </div>
                <div className="modal-note">
                  If the trailer appears blank, your ad blocker may be
                  interfering — try pausing it for this page.
                </div>
              </>
            ) : (
              <div
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 13,
                  padding: "60px 40px",
                  textAlign: "center",
                }}
              >
                <div style={{ fontSize: 40, marginBottom: 16 }}>🎬</div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 16,
                    fontWeight: 700,
                    color: "#fff",
                    marginBottom: 8,
                  }}
                >
                  Trailer not available
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: 24,
                    lineHeight: 1.6,
                  }}
                >
                  We don't have a trailer ID for{" "}
                  <strong style={{ color: "rgba(255,255,255,0.6)" }}>
                    {movie.Title}
                  </strong>{" "}
                  yet.
                  <br />
                  You can search for it on YouTube.
                </div>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(`${movie.Title} ${movie.Year} official trailer`)}`}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                    padding: "11px 24px",
                    background: "#fff",
                    color: "#090a0f",
                    fontFamily: "'Syne',sans-serif",
                    fontSize: 13,
                    fontWeight: 700,
                    borderRadius: 10,
                    textDecoration: "none",
                    transition: "opacity 0.18s",
                  }}
                >
                  Search on YouTube ↗
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
