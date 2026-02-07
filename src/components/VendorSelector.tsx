import { useContext, useEffect, useRef, useState, type CSSProperties } from "react";
import { VendorContext, type Vendor } from "../contexts/VendorContext";

const vendors: Vendor[] = ["nvidia", "amd", "intel"];

export function VendorSelector() {
    const ctx = useContext(VendorContext);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const [isStuck, setIsStuck] = useState(false);
    const [shiftX, setShiftX] = useState(0);

    useEffect(() => {
        const update = () => {
            if (!anchorRef.current) return;

            const rect = anchorRef.current.getBoundingClientRect();
            const stickyTop = 16; // must match CSS top: 1rem
            const stuckNow = window.scrollY > 0 && rect.top <= stickyTop + 1;

            setIsStuck(stuckNow);

            // compute how far left to slide once stuck
            const targetLeft = 16; // left docking position in viewport
            setShiftX(Math.max(0, rect.left - targetLeft));
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
    }, []);

    if (!ctx) return null;

    return (
        <div ref={anchorRef} className={`vendor-anchor ${isStuck ? "is-stuck" : ""}`}>
            <label
                className={`vendor-selector vendor-selector--${ctx.vendor}`}
                style={{ "--dock-shift": `${shiftX}px` } as CSSProperties}
            >
                <span>Vendor:</span>
                <select
                    value={ctx.vendor}
                    onChange={(e) => ctx.setVendor(e.target.value as Vendor)}
                >
                    {vendors.map((v) => (
                        <option key={v} value={v}>
                            {v.toUpperCase()}
                        </option>
                    ))}
                </select>
            </label>
        </div>
    );
}
