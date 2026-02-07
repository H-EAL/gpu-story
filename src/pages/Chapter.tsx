import { useEffect, useRef, useState, type ComponentType } from "react";

import Handbook from "../components/Handbook";
import { ChapterNav } from "../components/ChapterNav";
import { TOC } from "../components/Toc";

type NavItem = { label: string; to: string };

function clamp(value: number, min = 0, max = 1) {
    return Math.min(max, Math.max(min, value));
}

function Chapter({
    StoryText,
    HandbookText,
    volume,
    title,
    prev,
    next,
}: {
    StoryText: ComponentType;
    HandbookText: ComponentType;
    volume: number;
    title: string;
    prev?: NavItem;
    next?: NavItem;
}) {
    const storyContentRef = useRef<HTMLDivElement | null>(null);
    const handbookRef = useRef<HTMLDivElement | null>(null);
    const handbookContentRef = useRef<HTMLDivElement | null>(null);

    const [activeToc, setActiveToc] = useState<"story" | "handbook" | null>("story");
    const [expandProgress, setExpandProgress] = useState(0);

    useEffect(() => {
        const updateToc = () => {
            if (!handbookRef.current || !handbookContentRef.current) return;

            const widgetTop = handbookRef.current.getBoundingClientRect().top;
            const handbookTop = handbookContentRef.current.getBoundingClientRect().top;

            // Before handbook widget reaches viewport center -> story TOC
            if (widgetTop > window.innerHeight * 0.45) {
                setActiveToc("story");
                return;
            }

            // Once handbook text starts -> handbook TOC
            if (handbookTop <= window.innerHeight * 0.5) {
                setActiveToc("handbook");
                return;
            }

            // Between widget and handbook text -> no TOC
            setActiveToc(null);
        };

        updateToc();
        window.addEventListener("scroll", updateToc, { passive: true });
        window.addEventListener("resize", updateToc);
        return () => {
            window.removeEventListener("scroll", updateToc);
            window.removeEventListener("resize", updateToc);
        };
    }, []);

    useEffect(() => {
        let raf = 0;

        const update = () => {
            if (!storyContentRef.current || !handbookRef.current) {
                return;
            }

            const rect = handbookRef.current.getBoundingClientRect();
            const vh = window.innerHeight;
            const track = rect.height - vh;

            // 0..1 only once the stage has reached full viewport coverage
            const stickyProgress = track > 0 ? clamp(-rect.top / track) : 0;

            // grows and shrinks with scroll direction
            const expand = clamp((stickyProgress - 0.2) / 0.8);

            setExpandProgress(expand);
        };

        const onScroll = () => {
            cancelAnimationFrame(raf);
            raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll);

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", onScroll);
        };
    }, []);

    return (
        <main className="chapter-layout">
            <aside className="chapter-left-sidebar">
                <div className={`toc-panel ${activeToc === "story" ? "is-visible" : "is-hidden"}`}>
                    <TOC containerRef={storyContentRef} refreshKey={`story-${volume}`} />
                </div>
                <div
                    className={`toc-panel ${activeToc === "handbook" ? "is-visible" : "is-hidden"}`}
                >
                    <TOC containerRef={handbookContentRef} refreshKey={`handbook-${volume}`} />
                </div>
            </aside>

            <section className="chapter-content">
                <article id="story" ref={storyContentRef} className="story-content">
                    <StoryText />
                </article>

                <section ref={handbookRef} className="handbook-stage">
                    <div className="handbook-sticky">
                        <Handbook index={volume} title={title} expand={expandProgress} />
                    </div>
                </section>

                <article id="handbook" ref={handbookContentRef} className="handbook-content">
                    <HandbookText />
                </article>

                <ChapterNav prev={prev} next={next} current={`Chapter ${volume}`} />
            </section>
        </main>
    );
}

export default Chapter;
