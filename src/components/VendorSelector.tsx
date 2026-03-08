import { useContext, useEffect, useRef, useState } from "react";
import { VendorContext, type Vendor } from "../contexts/VendorContext";

const vendors: Vendor[] = ["nvidia", "amd", "intel"];

export function VendorSelector() {
    const ctx = useContext(VendorContext);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const [isStuck, setIsStuck] = useState(false);

    useEffect(() => {
        const update = () => {
            if (!anchorRef.current) return;

            const rect = anchorRef.current.getBoundingClientRect();
            const stickyTop = 16; // must match CSS top: 1rem
            const stuckNow = window.scrollY > 0 && rect.top <= stickyTop + 1;

            setIsStuck(stuckNow);

            // compute how far left to slide once stuck
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
        <div
            ref={anchorRef}
            className={`
                font-light font-stretch-expanded
                backdrop-blur-lg rounded-b-3xl border-zinc-900/50
                bg-[linear-gradient(0deg,rgb(var(--vendor-${ctx.vendor})_/_0.4),transparent)]
                z-100 w-full p-2 ${isStuck ? "sticky top-0" : ""}`}
        >
            <VendorSelect />
        </div>
    );
}

function VendorSelect() {
    const ctx = useContext(VendorContext);

    if (!ctx) return null;

    return (
        <label className={`justify-center flex w-full`}>
            <span>Vendor:</span>
            <select
                className={`
                    appearance-none border-[10px_solid_rgb(var(--vendor-${ctx.vendor})]
                    rounded ml-2 px-2 py-1 text-sm
                `}
                style={
                    { backgroundColor: `var(--color-vendor-${ctx.vendor})` } as React.CSSProperties
                }
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
    );
}
