import type { CSSProperties } from "react";

function Handbook({ index, title, expand }: { index: number; title: string; expand: number }) {
    return (
        <figure
            className="handbook-cover"
            style={{ "--expand": expand } as CSSProperties}
            role="img"
            aria-label={`Handbook volume ${index}: ${title}`}
        >
            <div className="handbook-series-title">
                <h1>The Showrunner's Handbook</h1>
                <h2>A Practical Guide to Theater Operations</h2>
            </div>
            <hr />
            <div className="handbook-volume-title">
                <h2>Volume {index}</h2>
                <h1>{title}</h1>
            </div>
        </figure>
    );
}

export default Handbook;
