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
            setIsStuck(window.scrollY > 0 && rect.top <= 17);
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
            className={`not-prose my-8${isStuck ? " sticky top-4 z-40" : ""}`}
        >
            <div className="inline-flex flex-col gap-2 border border-stage-cool-border bg-[#080f18] px-5 py-4 font-mono">
                <span className="text-[0.5rem] uppercase tracking-[0.3em] text-stage-cool/50">
                    Select Vendor
                </span>
                <div className="flex">
                    {vendors.map((v, i) => {
                        const active = ctx.vendor === v;
                        return (
                            <button
                                key={v}
                                onClick={() => ctx.setVendor(v)}
                                className={[
                                    "px-5 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors duration-150 border",
                                    i > 0 ? "-ml-px" : "",
                                    active
                                        ? "relative z-10 font-bold"
                                        : "border-stage-cool-border text-stage-cool hover:border-stage-cool-border-hi hover:text-stage-cool-hi",
                                ].join(" ")}
                                style={
                                    active
                                        ? {
                                              color: `var(--color-vendor-${v})`,
                                              borderColor: `var(--color-vendor-${v})`,
                                              background: `color-mix(in srgb, var(--color-vendor-${v}) 12%, #080f18)`,
                                          }
                                        : undefined
                                }
                            >
                                {v.toUpperCase()}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
