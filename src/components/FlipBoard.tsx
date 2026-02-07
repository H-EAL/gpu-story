import { useEffect, useMemo, useState } from "react";

function pad(text: string, len: number) {
    return text.toUpperCase().padEnd(len, " ");
}

const CHARS = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,:;!?-/[]#";

type FlipBoardProps = {
    value: string;
    width?: number;
    speedMs?: number;
};

export function FlipBoard({ value, width = 18, speedMs = 0 }: FlipBoardProps) {
    const target = useMemo(() => pad(value, width), [value, width]);
    const [current, setCurrent] = useState(() => pad(speedMs ? "" : value, width));

    useEffect(() => {
        let alive = true;
        let timer: number | undefined;

        const step = () => {
            setCurrent((prev) => {
                const chars = prev.split("");
                let changed = false;

                for (let i = 0; i < chars.length; i += 1) {
                    if (chars[i] === target[i]) continue;
                    const idx = CHARS.indexOf(chars[i]);
                    chars[i] = CHARS[(idx + 1) % CHARS.length];
                    changed = true;
                    break; // flip one slot per tick for old-board feel
                }

                if (changed && alive) {
                    timer = window.setTimeout(step, speedMs);
                }

                return chars.join("");
            });
        };

        if (current !== target) {
            timer = window.setTimeout(step, speedMs);
        }

        return () => {
            alive = false;
            if (timer) window.clearTimeout(timer);
        };
    }, [target, speedMs, current]);

    return (
        <div className="flipboard" role="status" aria-label={value}>
            {current.split("").map((ch, i) => (
                <span key={`${i}-${ch}`} className="flipboard-cell">
                    <span className="flipboard-char">{ch}</span>
                </span>
            ))}
        </div>
    );
}

//-----------------------

const HEX = "0123456789ABCDEF";

function randomHex(len: number) {
    let out = "";
    for (let i = 0; i < len; i += 1) out += HEX[Math.floor(Math.random() * HEX.length)];
    return out;
}

function nextLine() {
    const addr = randomHex(8);
    const lane = Math.floor(Math.random() * 4) + 1;
    const hit = Math.random() < 0.4;
    const status = hit && lane !== 3 ? "HIT" : "MISS";
    const text = `REQ[${lane}] 0x${addr} ${status}`;
    const statusStart = text.length - status.length;
    const statusEnd = text.length; // exclusive
    return { text, status, statusStart, statusEnd };
}

type Props = {
    width?: number;
    speedMs?: number;
    intervalMs?: number;
};

export function FlipBoardRequests({ width = 24, speedMs = 24, intervalMs = 900 }: Props) {
    const [current, setCurrent] = useState(() => pad("", width));
    const [target, setTarget] = useState(() => nextLine());
    const targetText = useMemo(() => pad(target.text, width), [target, width]);

    useEffect(() => {
        let alive = true;
        let timer: number | undefined;

        const step = () => {
            setCurrent((prev) => {
                const chars = prev.split("");
                let changed = false;

                for (let i = 0; i < chars.length; i += 1) {
                    if (chars[i] === targetText[i]) continue;
                    const idx = CHARS.indexOf(chars[i]);
                    chars[i] = CHARS[(idx + 1) % CHARS.length];
                    changed = true;
                    break;
                }

                if (changed && alive) timer = window.setTimeout(step, speedMs);
                return chars.join("");
            });
        };

        timer = window.setTimeout(step, speedMs);
        return () => {
            alive = false;
            if (timer) window.clearTimeout(timer);
        };
    }, [targetText, speedMs]);

    useEffect(() => {
        const id = window.setInterval(() => setTarget(nextLine()), intervalMs);
        return () => window.clearInterval(id);
    }, [intervalMs]);

    return (
        <div className="flipboard flipboard--req">
            {current.split("").map((ch, i) => {
                const isStatus = i >= target.statusStart && i < target.statusEnd;
                const statusClass = isStatus ? `is-${target.status.toLowerCase()}` : "";
                return (
                    <span key={`${i}-${ch}`} className="flipboard-cell">
                        <span className={`flipboard-char ${statusClass}`}>{ch}</span>
                    </span>
                );
            })}
        </div>
    );
}
