import { useContext } from "react";
import terms from "../content/terms.json";
import { VendorContext, type Vendor } from "../contexts/VendorContext";

type TermForm = "default" | "acr" | "plural" | "ext";

type VendorTerm = {
    default: string;
    acr: string;
    plural: string;
    ext: string;
};

type TermEntry = {
    label: string;
    nvidia: VendorTerm;
    amd: VendorTerm;
    intel: VendorTerm;
};

const termDictionary = terms as Record<string, TermEntry>;
const VENDORS: Vendor[] = ["nvidia", "amd", "intel"];

type TermProps = {
    src: string;
    acr?: boolean;
    plural?: boolean;
    ext?: boolean;
    vendor?: Vendor;
};

function getForm({ acr, plural, ext }: Omit<TermProps, "src">): TermForm {
    const count = [acr, plural, ext].filter(Boolean).length;
    if (count > 1) {
        console.warn("Term: use only one of acr, plural, ext");
    }

    if (acr) return "acr";
    if (plural) return "plural";
    if (ext) return "ext";
    return "default";
}

function getTerm(entry: TermEntry, vendor: Vendor, form: TermForm): string {
    const vendorTerms = entry[vendor as keyof TermEntry] as VendorTerm | undefined;
    return vendorTerms?.[form] ?? vendorTerms?.default ?? entry.label;
}

export function Term({ src, acr, plural, ext, vendor }: TermProps) {
    const ctx = useContext(VendorContext);
    if (!ctx) return <span className="term term--generic">{src}</span>;

    const { vendor: contextVendor } = ctx;
    const usedVendor = vendor || contextVendor;
    const entry = termDictionary[src];
    const form = getForm({ acr, plural, ext });

    if (!entry) {
        return <span className={`term term--${usedVendor}`}>{src}</span>;
    }

    const current = getTerm(entry, usedVendor, form);

    return (
        <span className="term-wrap">
            <span className={`term term--${usedVendor}`}>{current}</span>

            {!vendor && (
                <span className="term-tooltip" role="tooltip">
                    <strong>{entry.label}</strong>
                    {VENDORS.filter((v) => v !== usedVendor).map((v) => (
                        <span key={v} className={`term-tooltip-row term-tooltip-row--${v}`}>
                            <b>{v.toUpperCase()}:</b> {getTerm(entry, v, form)}
                        </span>
                    ))}
                </span>
            )}
        </span>
    );
}
