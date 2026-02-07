import type { ReactNode } from "react";
import { useContext } from "react";
import { VendorContext, type Vendor } from "../contexts/VendorContext";

type VendorCalloutProps = {
    only?: Vendor;
    exclude?: Vendor[];
    title?: string;
    children: ReactNode;
};

function vendorLabel(v: Vendor) {
    if (v === "nvidia") return "NVIDIA";
    if (v === "amd") return "AMD";
    if (v === "intel") return "Intel";
    return v.toUpperCase();
}

export function VendorCallout({ only, exclude, children }: VendorCalloutProps) {
    const ctx = useContext(VendorContext);
    if (!ctx) return null;

    const { vendor } = ctx;

    if (only && only !== vendor) return null;
    if (exclude && exclude.includes(vendor)) return null;

    const scopeLabel = only ? vendorLabel(only) : vendorLabel(vendor);

    return (
        <aside className={`vendor-callout vendor-callout--${vendor}`} role="note">
            <p className="vendor-callout-eyebrow">{scopeLabel} only</p>
            <div className="vendor-callout-body">{children}</div>
        </aside>
    );
}
