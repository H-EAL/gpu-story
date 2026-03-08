import { useEffect, useRef, useState, type ComponentType } from "react";

import Handbook from "../components/Handbook";
import { TOC } from "../components/TOC";

function Chapter({
    StoryText,
    HandbookText,
    volume,
    title,
}: {
    StoryText: ComponentType;
    HandbookText: ComponentType;
    volume: number;
    title: string;
}) {
    const storyContentRef = useRef<HTMLDivElement | null>(null);
    const handbookRef = useRef<HTMLDivElement | null>(null);
    const handbookContentRef = useRef<HTMLDivElement | null>(null);

    const [activeSection, setActiveSection] = useState<"story" | "handbook" | "cover" | null>(
        "story",
    );

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

    return (
        <main className="relative min-h-screen">
            <aside className="hidden lg:block fixed left-0 top-0 h-screen w-64 overflow-y-auto border-r border-zinc-800/60 bg-zinc-950/70 backdrop-blur px-4 py-6">
                <TOC
                    containerRef={
                        activeSection === "story" ? storyContentRef : handbookContentRef
                    }
                    refreshKey={activeSection}
                    index={volume}
                />
            </aside>

            <div className="lg:px-64 prose md:prose-lg lg:prose-xl prose-stone dark:prose-invert max-w-none">
                <section className="mx-auto w-full max-w-[80ch] px-6 py-10">
                    <article id="story" ref={storyContentRef} className="font-serif">
                        <StoryText />
                    </article>
                    <section
                        id="cover"
                        ref={handbookRef}
                        className="not-prose h-screen content-center justify-items-center"
                    >
                        <Handbook index={volume} title={title} />
                    </section>
                    <article
                        id="handbook"
                        ref={handbookContentRef}
                        className="prose-yellow font-sans"
                    >
                        <HandbookText />
                    </article>
                </section>
            </div>
        </main>
    );
}

export default Chapter;
