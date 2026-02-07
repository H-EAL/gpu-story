import { Link } from "react-router-dom";

function Home() {
    return (
        <main className="home">
            <p className="home-kicker">Interactive Story + Handbook</p>
            <h1 className="home-title">The GPU Showrunner Chronicles</h1>
            <p className="home-subtitle">
                Learn GPU concepts through a narrative journey across chapters.
            </p>

            <div className="home-actions">
                <Link className="home-cta" to="/chapter-1">
                    Start{/*  */}
                </Link>
            </div>

            <div className="home-socials" aria-label="Social links">
                <a
                    className="home-social-link"
                    href="https://github.com/H-EAL"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.88 1.52 2.31 1.08 2.88.82.09-.64.34-1.08.62-1.33-2.22-.25-4.56-1.11-4.56-4.96 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.86-2.34 4.71-4.57 4.96.35.3.67.9.67 1.82v2.69c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
                        />
                    </svg>
                </a>

                <a
                    className="home-social-link"
                    href="https://www.linkedin.com/in/houssemachouri"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12zM5.6 9.7h2.68V18H5.6V9.7zm4.25 0h2.57v1.13h.04c.36-.68 1.24-1.4 2.56-1.4 2.73 0 3.23 1.8 3.23 4.13V18h-2.68v-3.95c0-.94-.02-2.15-1.31-2.15-1.31 0-1.5 1.02-1.5 2.08V18H9.85V9.7z"
                        />
                    </svg>
                </a>
            </div>
        </main>
    );
}

export default Home;
