import { useEffect, useState, type RefObject } from "react";

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
}: {
    containerRef: RefObject<HTMLElement | null>;
    refreshKey: string;
}) {
    const [items, setItems] = useState<TocItem[]>([]);
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;

        const headings = Array.from(root.querySelectorAll("h2, h3")) as HTMLHeadingElement[];

        const next = headings.map((h) => {
            if (!h.id) h.id = slugify(h.textContent || "section");
            return { id: h.id, text: h.textContent || "", level: Number(h.tagName[1]) };
        });

        setItems(next);
        setActiveId(next[0]?.id ?? "");
    }, [containerRef, refreshKey]);

    useEffect(() => {
        const root = containerRef.current;
        if (!root || items.length === 0) return;

        const headings = items
            .map((item) => root.querySelector<HTMLElement>(`#${CSS.escape(item.id)}`))
            .filter((heading): heading is HTMLElement => Boolean(heading));

        if (!headings.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                const visible = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

                if (!visible.length) return;

                setActiveId((visible[0].target as HTMLElement).id);
            },
            {
                root: null,
                rootMargin: "-18% 0px -65% 0px",
                threshold: [0, 1],
            },
        );

        headings.forEach((heading) => observer.observe(heading));

        return () => observer.disconnect();
    }, [containerRef, items, refreshKey]);

    const handleClick = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        event.preventDefault();

        const root = containerRef.current;
        const target = root?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
        if (!target) return;

        target.scrollIntoView({ behavior: "smooth", block: "start" });
        history.replaceState(null, "", `#${id}`);
        setActiveId(id);
    };

    if (!items.length) return null;

    return (
        <nav className="toc" aria-label="table of contents">
            <ul className="toc-list">
                {items.map((item) => (
                    <li
                        key={item.id}
                        className={`toc-item toc-item--h${item.level} ${activeId === item.id ? "toc-item--active" : ""}`}
                    >
                        <a
                            href={`#${item.id}`}
                            onClick={(event) => handleClick(event, item.id)}
                            aria-current={activeId === item.id ? "true" : undefined}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
