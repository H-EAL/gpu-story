import { useContext } from "react";
import type { ReactNode } from "react";
import { VendorContext, type Vendor } from "../contexts/VendorContext";

type VendorCalloutProps = {
    only?: Vendor;
    exclude?: Vendor[];
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

    const calloutVendor = only ?? vendor;

    return (
        <details
            className={`vendor-callout vendor-callout--${calloutVendor}`}
            open
        >
            <summary className="vendor-callout-summary">
                <span className="vendor-callout-eyebrow">{vendorLabel(calloutVendor)}</span>
            </summary>
            <div className="vendor-callout-body">{children}</div>
        </details>
    );
}
