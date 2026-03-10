import { useEffect, useState, type RefObject } from "react";
import { CHAPTERS } from "../content/chapters";
import { Link } from "react-router-dom";

type TocItem = { id: string; text: string; level: number };

function slugify(text: string) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
}

export function TOC({
    containerRef,
    refreshKey,
    index,
}: {
    containerRef: RefObject<HTMLElement | null>;
    refreshKey: string | null;
    index: number;
}) {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        if (!containerRef.current) return;

        const headingElements = Array.from(
            containerRef.current.querySelectorAll("h2, h3"),
        ) as HTMLHeadingElement[];

        const headingItems = headingElements.map((h) => {
            if (!h.id) h.id = slugify(h.textContent || "section");
            return { id: h.id, text: h.textContent || "", level: Number(h.tagName[1]) };
        });

        setItems(headingItems);
        setActiveId(headingItems[0]?.id ?? "");
    }, [containerRef, refreshKey]);

    useEffect(() => {
        const root = containerRef.current;
        if (!root || items.length === 0) return;

        const headings = items
            .map((item) => root.querySelector<HTMLElement>(`#${CSS.escape(item.id)}`))
            .filter((heading): heading is HTMLElement => Boolean(heading));

        if (!headings.length) return;

        const observer = new IntersectionObserver(
            () => {
                const activationY = window.innerHeight * 0.22;
                let current = headings[0];

                for (const heading of headings) {
                    if (heading.getBoundingClientRect().top <= activationY) {
                        current = heading;
                    } else {
                        break;
                    }
                }

                setActiveId(current.id);
            },
            {
                root: null,
                rootMargin: "-18% 0px -65% 0px",
                threshold: 0,
            },
        );

        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, [containerRef, items, refreshKey]);

    const handleClick = (
        event: React.MouseEvent<HTMLAnchorElement>,
        id: string,
        useDocument?: boolean,
    ) => {
        event.preventDefault();

        const root = useDocument ? document : containerRef.current;
        const target = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        setActiveId(id);
    };

    const isHandbook = refreshKey === "handbook";

    // Warm amber for story, cool blue for handbook
    const t = isHandbook
        ? {
              border:      "border-stage-cool-border",
              borderHover: "hover:border-stage-cool-border-hi",
              text:        "text-stage-cool",
              textHover:   "hover:text-stage-cool-hi",
              active:      "text-stage-cool-hi",
              marker:      "text-stage-cool",
              divider:     "border-stage-cool-border",
          }
        : {
              border:      "border-stage-border-lo",
              borderHover: "hover:border-stage-border-hi",
              text:        "text-stage-tertiary",
              textHover:   "hover:text-stage-secondary",
              active:      "text-stage-primary",
              marker:      "text-stage-secondary",
              divider:     "border-stage-border-lo",
          };

    return (
        <nav className="flex flex-col h-full gap-4 font-mono text-xs uppercase">
            {/* ── Home icon + prev chapter ── */}
            <div className="flex gap-2">
                <Link
                    to="/"
                    aria-label="Home"
                    className={`border ${t.border} px-3 py-2 ${t.text} transition-colors duration-150 ${t.borderHover} ${t.textHover}`}
                >
                    ⌂
                </Link>
                {index > 1 && (
                    <Link
                        to={`/chapter-${index - 1}`}
                        className={`flex-1 border ${t.border} px-3 py-2 tracking-[0.2em] ${t.text} transition-colors duration-150 ${t.borderHover} ${t.textHover} text-center`}
                    >
                        ← Ch. {index - 1}
                    </Link>
                )}
            </div>

            {/* ── Cross-section jump ── */}
            {isHandbook && (
                <a
                    href="#story"
                    onClick={(event) => handleClick(event, "story", true)}
                    className="block border border-stage-border-lo px-3 py-2 tracking-[0.2em] text-stage-tertiary transition-colors duration-150 hover:border-stage-border-hi hover:text-stage-secondary text-center"
                >
                    ↑ Story
                </a>
            )}

            {/* ── TOC items ── */}
            {items.length > 0 && (
                <ul className={`grow flex flex-col justify-center gap-2 border-t ${t.divider} pt-4`}>
                    {items.map((item) => (
                        <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                            <a
                                href={`#${item.id}`}
                                onClick={(event) => handleClick(event, item.id)}
                                className={[
                                    "block tracking-[0.15em] leading-snug transition-colors duration-150 border-l-2 pl-2",
                                    activeId === item.id
                                        ? `${t.active} border-current`
                                        : `${t.text} ${t.textHover} border-transparent`,
                                ].join(" ")}
                            >
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ul>
            )}

            {/* ── Cross-section jump ── */}
            {refreshKey === "story" && (
                <a
                    href="#handbook"
                    onClick={(event) => handleClick(event, "handbook", true)}
                    className="block border border-stage-cool-border px-3 py-2 tracking-[0.2em] text-stage-cool transition-colors duration-150 hover:border-stage-cool-border-hi hover:text-stage-cool-hi text-center"
                >
                    ↓ Handbook
                </a>
            )}

            {/* ── Next chapter nav ── */}
            {index < CHAPTERS.length && (
                <Link
                    to={`/chapter-${index + 1}`}
                    className="block border border-stage-border-lo px-3 py-2 tracking-[0.2em] text-stage-tertiary transition-colors duration-150 hover:border-stage-border-hi hover:text-stage-secondary text-center"
                >
                    Ch. {index + 1} →
                </Link>
            )}
        </nav>
    );
}
