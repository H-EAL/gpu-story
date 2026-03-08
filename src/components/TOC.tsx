import { useEffect, useState, type RefObject } from "react";
import { CHAPTERS } from "../content/chapters";

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
                const activationY = window.innerHeight * 0.22; // ~same as your top margin
                let current = headings[0];

                for (const heading of headings) {
                    if (heading.getBoundingClientRect().top <= activationY) {
                        current = heading; // last heading above activation line
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

    if (!items.length) return null;

    return (
        <nav className="flex flex-col h-full justify-around">
            <a
                href={index === 1 ? "/" : `/chapter-${index - 1}`}
                className="uppercase tracking-widest font-extralight bg-zinc-600/20 mb-4 p-4 text-center text-xs border border-zinc-800/60 rounded-md"
            >
                {index === 1 ? "Home" : <>To Chapter <b>{index - 1}</b></>}
            </a>
            {refreshKey === "handbook" && (
                <a
                    href="#story"
                    onClick={(event) => handleClick(event, "story", true)}
                    className="p-4 text-center"
                >
                    Story
                </a>
            )}
            <ul className="grow flex flex-col justify-center space-y-3 text-xs font-extralight">
                {items.map((item) => (
                    <li key={item.id} className={item.level === 3 ? "pl-4" : ""}>
                        <a
                            href={`#${item.id}`}
                            onClick={(event) => handleClick(event, item.id)}
                            className={activeId === item.id ? "font-semibold" : ""}
                        >
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
            {refreshKey === "story" && (
                <a
                    href="#handbook"
                    onClick={(event) => handleClick(event, "handbook", true)}
                    className="p-4 text-center"
                >
                    Handbook
                </a>
            )}
            {index < CHAPTERS.length && (
                <a
                    href={`/chapter-${index + 1}`}
                    className="uppercase tracking-widest font-extralight bg-zinc-600/20 mt-4 p-4 text-center text-xs border border-zinc-800/60 rounded-md"
                >
                    To Chapter <b>{index + 1}</b>
                </a>
            )}
        </nav>
    );
}
