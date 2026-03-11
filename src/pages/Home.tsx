import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FlipBoard } from "../components/FlipBoard";
import { CHAPTERS } from "../content/chapters";

function ChapterRow({ index }: { index: number }) {
    const chapter = CHAPTERS[index - 1];

    return (
        <li className="group relative">
            {/* Stretches to fill the row — handbook link sits above via z-index */}
            <Link
                to={`/chapter-${index}`}
                className="absolute inset-0 z-0"
                aria-label={`Read chapter ${index}: ${chapter.storyTitle}`}
            />

            <div className="pointer-events-none relative flex items-center gap-6 border-t border-stage-border-lo px-2 py-5 transition-colors duration-150 group-hover:bg-stage-hover">
                {/* Row number */}
                <div className="shrink-0">
                    <FlipBoard value={String(index).padStart(2, "0")} width={2} speedMs={3} />
                </div>

                {/* Story title + read time */}
                <div className="flex-1 min-w-0 flex flex-col gap-0.5">
                    <p className="font-mono text-base uppercase tracking-wider text-stage-primary transition-colors duration-150 group-hover:text-stage-bright">
                        {chapter.storyTitle}
                    </p>
                    <span className="font-mono text-[0.65rem] text-stage-subtle tabular-nums">
                        {chapter.readTimeMin} min read
                    </span>
                </div>

                {/* Handbook — cool blue badge to contrast the warm story tones */}
                <Link
                    to={`/chapter-${index}#handbook`}
                    className="pointer-events-auto relative z-10 shrink-0 border border-stage-cool-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-stage-cool transition-colors duration-150 hover:border-stage-cool-border-hi hover:text-stage-cool-hi"
                >
                    {chapter.handbookTitle}
                </Link>
            </div>
        </li>
    );
}

function Home() {
    useEffect(() => {
        document.title = "The GPU Showrunner Chronicles";
    }, []);
    return (
        <div className="min-h-screen bg-stage-base flex flex-col">
            <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-20 flex flex-col gap-14">
                {/* ── Board header ── */}
                <header className="flex flex-col gap-5">
                    <FlipBoard value="THE GPU SHOWRUNNER CHRONICLES" width={30} speedMs={3} />
                    <div className="flex items-center gap-4">
                        <span className="h-px flex-1 bg-stage-border-lo" />
                        <p className="font-mono text-xs uppercase tracking-[0.28em] text-stage-secondary">
                            A narrative explanation of GPU architecture
                        </p>
                        <span className="h-px flex-1 bg-stage-border-lo" />
                    </div>
                </header>

                {/* ── Programme ── */}
                <section>
                    <div className="flex items-baseline gap-3 mb-1">
                        <span className="font-mono text-xs uppercase tracking-[0.3em] text-stage-tertiary">
                            Programme
                        </span>
                        <span className="h-px flex-1 bg-stage-border-lo" />
                        <span className="font-mono text-xs tabular-nums text-stage-subtle">
                            {CHAPTERS.length} chapters
                        </span>
                    </div>
                    <ul>
                        {CHAPTERS.map((_, i) => (
                            <ChapterRow key={i + 1} index={i + 1} />
                        ))}
                        {/* closing rule */}
                        <li className="border-t border-stage-border-lo" aria-hidden="true" />
                    </ul>
                </section>
            </main>

            {/* ── Footer ── */}
            <footer
                className="flex items-center justify-center gap-4 pb-12 text-stage-subtle"
                aria-label="Social links"
            >
                <a
                    href="https://github.com/H-EAL"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="transition-colors hover:text-stage-secondary"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.88 1.52 2.31 1.08 2.88.82.09-.64.34-1.08.62-1.33-2.22-.25-4.56-1.11-4.56-4.96 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.86-2.34 4.71-4.57 4.96.35.3.67.9.67 1.82v2.69c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
                        />
                    </svg>
                </a>

                <span className="h-3 w-px bg-stage-border-lo" aria-hidden="true" />

                <a
                    href="https://3dverse.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="3Dverse"
                    className="opacity-20 transition-opacity hover:opacity-50"
                >
                    <img
                        className="h-4 w-auto"
                        src="https://console.3dverse.com/static/logo/3dverse-wordmark.svg"
                        alt="3Dverse"
                    />
                </a>

                <span className="h-3 w-px bg-stage-border-lo" aria-hidden="true" />

                <a
                    href="https://www.linkedin.com/in/houssemachouri"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="transition-colors hover:text-stage-secondary"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M6.94 8.5a1.56 1.56 0 1 1 0-3.12 1.56 1.56 0 0 1 0 3.12zM5.6 9.7h2.68V18H5.6V9.7zm4.25 0h2.57v1.13h.04c.36-.68 1.24-1.4 2.56-1.4 2.73 0 3.23 1.8 3.23 4.13V18h-2.68v-3.95c0-.94-.02-2.15-1.31-2.15-1.31 0-1.5 1.02-1.5 2.08V18H9.85V9.7z"
                        />
                    </svg>
                </a>
            </footer>
        </div>
    );
}

export default Home;
