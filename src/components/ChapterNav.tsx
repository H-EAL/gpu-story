import { Link } from "react-router-dom";

type NavItem = {
    label: string;
    to: string;
};

export function ChapterNav({
    prev,
    next,
    current,
}: {
    prev?: NavItem;
    next?: NavItem;
    current: string;
}) {
    if (!prev && !next) return null;

    return (
        <nav className="chapter-nav" aria-label="Chapter navigation">
            <div className="chapter-nav-slot chapter-nav-slot--left">
                {prev ? (
                    <Link className="chapter-nav-link" to={prev.to}>
                        ← {prev.label}
                    </Link>
                ) : null}
            </div>

            <div className="chapter-nav-center">
                <Link className="chapter-nav-home" to="/">
                    Home
                </Link>
                <span className="chapter-nav-current">{current}</span>
            </div>

            <div className="chapter-nav-slot chapter-nav-slot--right">
                {next ? (
                    <Link className="chapter-nav-link" to={next.to}>
                        {next.label} →
                    </Link>
                ) : null}
            </div>
        </nav>
    );
}
