import { useEffect, useRef, useState, type ComponentType } from "react";

function ReadingProgress({ handbookRef }: { handbookRef: React.RefObject<HTMLDivElement | null> }) {
    const [progress, setProgress] = useState(0);
    const [handbookStart, setHandbookStart] = useState(1);
    useEffect(() => {
        const update = () => {
            const scrollable = document.documentElement.scrollHeight - window.innerHeight;
            if (scrollable <= 0) return;
            setProgress(window.scrollY / scrollable);
            if (handbookRef.current) {
                const top = handbookRef.current.getBoundingClientRect().top + window.scrollY;
                setHandbookStart(top / scrollable);
            }
        };
        window.addEventListener("scroll", update, { passive: true });
        update();
        return () => window.removeEventListener("scroll", update);
    }, [handbookRef]);
    const split = `${handbookStart * 100}%`;
    return (
        <div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 z-50 h-px pointer-events-none"
            style={{
                clipPath: `inset(0 ${(1 - progress) * 100}% 0 0)`,
                background: `linear-gradient(to right, #cc9040 ${split}, #7ab0cc ${split})`,
            }}
        />
    );
}

function BackToTop() {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const update = () => setVisible(window.scrollY > 600);
        window.addEventListener("scroll", update, { passive: true });
        return () => window.removeEventListener("scroll", update);
    }, []);
    return (
        <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            className={`fixed bottom-8 right-8 z-40 border border-stage-border-lo bg-stage-base px-3 py-2 font-mono text-xs text-stage-tertiary transition-all duration-300 hover:border-stage-border-hi hover:text-stage-primary ${visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        >
            ↑
        </button>
    );
}

import Handbook from "../components/Handbook";
import { TOC } from "../components/TOC";
import { CHAPTERS } from "../content/chapters";
import { Link } from "react-router-dom";

function Chapter({
    StoryText,
    HandbookText,
    volume,
    title,
    storyTitle,
}: {
    StoryText: ComponentType;
    HandbookText: ComponentType;
    volume: number;
    title: string;
    storyTitle: string;
}) {
    const storyContentRef = useRef<HTMLDivElement | null>(null);
    const handbookRef = useRef<HTMLDivElement | null>(null);
    const handbookContentRef = useRef<HTMLDivElement | null>(null);

    const [activeSection, setActiveSection] = useState<"story" | "handbook" | "cover" | null>(
        "story",
    );
    const [tocOpen, setTocOpen] = useState(false);

    useEffect(() => {
        document.title = `${storyTitle} — The GPU Showrunner Chronicles`;
    }, [storyTitle]);

    useEffect(() => {
        if (!tocOpen) return;
        const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setTocOpen(false); };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [tocOpen]);

    useEffect(() => {
        const sections = [
            { key: "story", el: storyContentRef.current },
            { key: "cover", el: handbookRef.current },
            { key: "handbook", el: handbookContentRef.current },
        ].filter((s): s is { key: string; el: HTMLDivElement } => Boolean(s.el));

        if (!sections.length) return;

        const ratioByKey = new Map(sections.map((s) => [s.key, 0]));

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    const key = sections.find((s) => s.el === entry.target)?.key;
                    if (!key) continue;
                    ratioByKey.set(key, entry.isIntersecting ? entry.intersectionRatio : 0);
                }

                const next = [...ratioByKey.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];
                if (next) {
                    setActiveSection(
                        next === "story" ? "story" : ("handbook" as "story" | "handbook" | "cover"),
                    );
                }
            },
            {
                root: null,
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0,
            },
        );

        sections.forEach((s) => observer.observe(s.el));

        return () => observer.disconnect();
    }, []);

    const tocProps = {
        containerRef: activeSection === "story" ? storyContentRef : handbookContentRef,
        refreshKey: activeSection,
        index: volume,
    } as const;

    return (
        <main className="relative min-h-screen">
            <ReadingProgress handbookRef={handbookRef} />
            <BackToTop />
            {/* ── Desktop sidebar ── */}
            <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 overflow-y-auto border-r border-stage-border-lo bg-stage-base px-4 py-6">
                <TOC {...tocProps} />
            </aside>

            {/* ── Mobile: toggle button ── */}
            <button
                onClick={() => setTocOpen(true)}
                aria-label="Open table of contents"
                className="lg:hidden fixed top-4 left-4 z-40 border border-stage-border-lo bg-stage-base px-3 py-2 font-mono text-sm text-stage-tertiary transition-colors hover:border-stage-border-hi hover:text-stage-primary"
            >
                ☰
            </button>

            {/* ── Mobile: backdrop ── */}
            <div
                className={`lg:hidden fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 ${tocOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
                onClick={() => setTocOpen(false)}
            />

            {/* ── Mobile: slide-in drawer ── */}
            <div
                className={`lg:hidden fixed left-0 top-0 z-50 h-screen w-64 overflow-y-auto border-r border-stage-border-lo bg-stage-base px-4 py-6 transition-transform duration-300 ${tocOpen ? "translate-x-0" : "-translate-x-full"}`}
                onClick={(e) => {
                    if ((e.target as HTMLElement).closest("a")) setTocOpen(false);
                }}
            >
                <TOC {...tocProps} />
            </div>

            {/*
                Prose color overrides — no dark:prose-invert, we set everything manually
                to match the warm amber / cool blue palette.
                Story headings: amber  |  Handbook headings: steel-blue
            */}
            <div
                className="lg:px-64 prose lg:prose-xl max-w-none
                [--tw-prose-body:#ddd0b8]
                [--tw-prose-lead:#c8b890]
                [--tw-prose-bold:#fff2cc]
                [--tw-prose-links:#cc9040]
                [--tw-prose-bullets:#b07830]
                [--tw-prose-counters:#b07830]
                [--tw-prose-hr:#3c2410]
                [--tw-prose-quotes:#c8b890]
                [--tw-prose-quote-borders:#553018]
                [--tw-prose-code:#e8b860]
                [--tw-prose-pre-bg:#1a1208]
                [--tw-prose-pre-code:#ddd0b8]
                [--tw-prose-th-borders:#553018]
                [--tw-prose-td-borders:#3c2410]
            "
            >
                <section className="mx-auto w-full max-w-[80ch] px-6 py-10">
                    {/* Story — amber headings, serif body for novel feel */}
                    <article
                        id="story"
                        ref={storyContentRef}
                        className="font-serif [--tw-prose-headings:#e8b860]"
                    >
                        <StoryText />
                    </article>
                    <section
                        id="handbook"
                        ref={handbookRef}
                        className="not-prose h-screen flex items-center justify-center"
                    >
                        <Handbook index={volume} title={title} />
                    </section>
                    {/* Handbook — steel-blue headings, sans-serif for reference feel */}
                    <article
                        ref={handbookContentRef}
                        className="font-sans text-[#b8ccd8] [--tw-prose-bold:#d8eaf4] [--tw-prose-headings:#7ab0cc] [--tw-prose-links:#7ab0cc] [--tw-prose-code:#7ab0cc] [--tw-prose-pre-code:#b8ccd8] [--tw-prose-bullets:#4a7a9b] [--tw-prose-counters:#4a7a9b] [--tw-prose-quotes:#8aaabb] [--tw-prose-quote-borders:#2e5470]"
                    >
                        <HandbookText />
                    </article>
                </section>
            </div>

            {/* ── Chapter-end navigation ── */}
            <nav className="lg:pl-64 border-t border-stage-border-lo">
                <div className="mx-auto w-full max-w-[80ch] px-6 py-10 flex items-center justify-between gap-4 font-mono text-xs uppercase tracking-[0.2em]">
                    <Link
                        to="/"
                        className="text-stage-subtle transition-colors hover:text-stage-tertiary"
                    >
                        ← Programme
                    </Link>
                    {volume < CHAPTERS.length ? (
                        <Link
                            to={`/chapter-${volume + 1}`}
                            className="flex items-center gap-3 border border-stage-border-lo px-4 py-2.5 text-stage-tertiary transition-colors hover:border-stage-border-hi hover:text-stage-primary"
                        >
                            <span className="text-stage-subtle">Next</span>
                            {CHAPTERS[volume].storyTitle}
                            <span className="text-stage-subtle">→</span>
                        </Link>
                    ) : (
                        <span className="text-stage-subtle">End of series</span>
                    )}
                </div>
            </nav>
        </main>
    );
}

export default Chapter;
