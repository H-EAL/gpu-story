import type { ReactNode } from "react";

type ClipboardProps = {
    title?: string;
    children: ReactNode;
};

export function Clipboard({ title = "SHOW PROGRESS REPORT", children }: ClipboardProps) {
    return (
        <figure className="clipboard" role="img" aria-label={title}>
            <div className="clipboard-clip" />
            <div className="clipboard-sheet">
                <div className="clipboard-title">{title}</div>
                <div className="clipboard-body">{children}</div>
            </div>
        </figure>
    );
}
