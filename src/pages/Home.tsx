import { Link, useNavigate } from "react-router-dom";

type ChapterData = {
    title: string;
    handbook: string;
    index: number;
};

const chapters: ChapterData[] = [
    { title: "Once Upon a Theater", handbook: "Infrastructure", index: 1 },
    { title: "The Call to Stage", handbook: "Dispatch", index: 2 },
    { title: "From Yard to Stage", handbook: "Memory", index: 3 },
    { title: "The Cost of Disagreement", handbook: "Control Flow", index: 4 },
];

function ChapterTile({ chapter }: { chapter: ChapterData }) {
    const navigate = useNavigate();

    const chapterPath = `chapter-${chapter.index}`;

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            navigate(chapterPath);
        }
    };

    return (
        <div className="relative flex w-56 flex-col text-center">
            <div
                key={chapter.index}
                className="group relative grid min-h-40 gap-2 rounded-2xl border border-[#6b52384d] bg-linear-to-b from-[#1f1711] via-[#1a1410] to-[#120d09] p-4 text-[#f3e2c6] shadow-[0_12px_26px_rgba(0,0,0,0.45)] transition hover:-translate-y-1 hover:border-[#d8b97b99] hover:shadow-[0_20px_40px_rgba(0,0,0,0.55)] cursor-pointer"
                role="button"
                tabIndex={0}
                onClick={() => navigate(chapterPath)}
                onKeyDown={handleKeyDown}
            >
                <span className="text-[0.7rem] uppercase tracking-[0.2em] text-[#c6b08b]">
                    Chapter {chapter.index}
                </span>
                <span className="text-lg font-semibold text-[#f4dfbe]">{chapter.title}</span>
                <span className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(180px_100px_at_15%_10%,rgba(244,223,190,0.16),transparent_70%)] opacity-0 transition group-hover:opacity-100" />
            </div>
            <div className="-mt-4 flex flex-wrap items-center gap-3 text-sm text-[#d8b97b]">
                <Link
                    className="text-center w-50 m-auto rounded-lg border border-[#6b52384d] bg-[#1f1711] px-2.5 py-2 text-xs uppercase tracking-[0.22em] text-[#f0d9a6] transition hover:border-[#d8b97b99] hover:text-[#fff1cf] hover:bg-[#2a1f16]"
                    to={`${chapterPath}#handbook`}
                    onClick={(e) => e.stopPropagation()}
                >
                    <p className="font-extralight border-b border-[#f4dfbe11]">Handbook</p>
                    <p className="font-bold">{chapter.handbook}</p>
                </Link>
            </div>
        </div>
    );
}

function Home() {
    return (
        <div className="flex h-full flex-col gap-0">
            <main className="flex h-full flex-col grow">
                <section className="w-full pt-16">
                    <h1 className="m-0!">The GPU Showrunner Chronicles</h1>
                    <p className="text-center text-xl">Interactive Story + Handbook</p>
                </section>

                <section className="w-full flex flex-col justify-center grow">
                    <div className="flex flex-wrap justify-center gap-8">
                        {chapters.map((chapter) => (
                            <ChapterTile chapter={chapter} />
                        ))}
                    </div>
                </section>
            </main>

            <footer
                className="mt-8 mb-8 flex h-16 w-full items-center justify-center gap-4 text-[#f4dfbe]"
                aria-label="Social links"
            >
                <a
                    className="inline-flex items-center justify-center"
                    href="https://github.com/H-EAL"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
                        <path
                            fill="currentColor"
                            d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.61-3.37-1.18-3.37-1.18-.45-1.16-1.1-1.47-1.1-1.47-.9-.61.07-.6.07-.6 1 .07 1.52 1.03 1.52 1.03.88 1.52 2.31 1.08 2.88.82.09-.64.34-1.08.62-1.33-2.22-.25-4.56-1.11-4.56-4.96 0-1.1.39-2 1.03-2.7-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.03A9.6 9.6 0 0 1 12 6.8c.85 0 1.71.11 2.51.33 1.91-1.3 2.75-1.03 2.75-1.03.55 1.38.2 2.4.1 2.65.64.7 1.03 1.6 1.03 2.7 0 3.86-2.34 4.71-4.57 4.96.35.3.67.9.67 1.82v2.69c0 .27.18.58.69.48A10 10 0 0 0 12 2z"
                        />
                    </svg>
                </a>

                <a
                    className="inline-flex items-center justify-center"
                    href="https://3dverse.com"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="3Dverse"
                >
                    <img
                        className="h-8 w-auto"
                        src="https://console.3dverse.com/static/logo/3dverse-wordmark.svg"
                        alt="3Dverse"
                    />
                </a>

                <a
                    className="inline-flex items-center justify-center"
                    href="https://www.linkedin.com/in/houssemachouri"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                >
                    <svg className="h-6 w-6" viewBox="0 0 24 24" aria-hidden="true">
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
