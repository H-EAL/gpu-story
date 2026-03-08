import { Link } from "react-router-dom";
import { CHAPTERS } from "../content/chapters";

function ChapterRow({ index }: { index: number }) {
    const chapter = CHAPTERS[index - 1];
    const storyPath = `/chapter-${index}`;
    const handbookPath = `/chapter-${index}#handbook`;

    return (
        <li className="group relative flex items-stretch rounded-xl border border-[#2e1f0e]/60 bg-gradient-to-b from-[#1e1510] to-[#150f09] transition-colors hover:border-[#6b4f2a]/60 hover:bg-[#1f160c]">
            {/* Stretched link covers the whole card — handbook link sits above it via z-index */}
            <Link
                to={storyPath}
                aria-label={`Read chapter ${index}: ${chapter.storyTitle}`}
                className="absolute inset-0 z-0 rounded-xl"
            />

            {/* Chapter number — left column */}
            <div className="flex w-20 shrink-0 items-center justify-center border-r border-[#2e1f0e]/60 px-4 py-6">
                <span className="font-mono text-3xl font-bold text-[#3d2a14] select-none group-hover:text-[#5a3f1e] transition-colors">
                    {String(index).padStart(2, "0")}
                </span>
            </div>

            {/* Main content */}
            <div className="flex min-w-0 flex-1 flex-col justify-center gap-1 px-6 py-5">
                <span className="text-[0.65rem] uppercase tracking-[0.25em] text-[#8a6840]">
                    Chapter {index}
                </span>
                <h2 className="truncate text-base font-semibold text-[#f0d9a6] sm:text-lg">
                    {chapter.storyTitle}
                </h2>
            </div>

            {/* Right column — handbook action */}
            <div className="relative z-10 flex shrink-0 items-center px-4 py-5 sm:px-6">
                <Link
                    to={handbookPath}
                    className="flex flex-col items-end gap-0.5 rounded-lg border border-[#3a2510]/70 bg-[#160e08] px-3 py-2 text-right transition hover:border-[#6b4f2a]/80 hover:bg-[#1e1510]"
                    aria-label={`Handbook: ${chapter.handbookTitle}`}
                >
                    <span className="text-[0.6rem] uppercase tracking-[0.2em] text-[#5a3f1e]">
                        Handbook
                    </span>
                    <span className="text-xs font-semibold text-[#c4a060] sm:text-sm">
                        {chapter.handbookTitle}
                    </span>
                </Link>
            </div>

            {/* Hover shimmer */}
            <span className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(600px_200px_at_0%_50%,rgba(200,150,60,0.06),transparent_70%)]" />
        </li>
    );
}

function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col justify-center gap-12 px-4 py-16 sm:px-6">
                {/* Hero */}
                <header className="flex flex-col gap-3">
                    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-[#5a3f1e]">
                        A GPU Architecture Series
                    </p>
                    <h1 className="text-3xl font-bold leading-tight text-[#f0d9a6] sm:text-4xl">
                        The GPU Showrunner
                        <br />
                        <span className="text-[#c4a060]">Chronicles</span>
                    </h1>
                    <p className="max-w-md text-sm leading-relaxed text-[#7a5e3a]">
                        An interactive story and technical handbook exploring GPU architecture
                        through the lens of a theater production.
                    </p>
                </header>

                {/* Chapter list */}
                <nav aria-label="Chapters">
                    <ul className="flex flex-col gap-3">
                        {CHAPTERS.map((_, i) => (
                            <ChapterRow key={i + 1} index={i + 1} />
                        ))}
                    </ul>
                </nav>
            </main>

            {/* Footer */}
            <footer
                className="flex items-center justify-center gap-5 py-8 text-[#3d2a14]"
                aria-label="Social links"
            >
                <a
                    href="https://github.com/H-EAL"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                    className="transition hover:text-[#c4a060]"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.88 1.52 2.31 1.08 2.88.82.09-.64.34-1.08.62-1.33-2.22-.25-4.56-1.11-4.56-4.96 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.86-2.34 4.71-4.57 4.96.35.3.67.9.67 1.82v2.69c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
                        />
                    </svg>
                </a>

                <span className="h-4 w-px bg-[#2e1f0e]" aria-hidden="true" />

                <a
                    href="https://3dverse.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="3Dverse"
                    className="transition hover:opacity-80"
                >
                    <img
                        className="h-5 w-auto opacity-40 hover:opacity-70 transition-opacity"
                        src="https://console.3dverse.com/static/logo/3dverse-wordmark.svg"
                        alt="3Dverse"
                    />
                </a>

                <span className="h-4 w-px bg-[#2e1f0e]" aria-hidden="true" />

                <a
                    href="https://www.linkedin.com/in/houssemachouri"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                    className="transition hover:text-[#c4a060]"
                >
                    <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
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
