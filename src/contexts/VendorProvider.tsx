import { useMemo, useState, type ReactNode } from "react";
import { VendorContext, type Vendor } from "./VendorContext";

export function VendorProvider({
    children,
    initialVendor = "nvidia",
}: {
    children: ReactNode;
    initialVendor?: Vendor;
}) {
    const [vendor, setVendor] = useState<Vendor>(initialVendor);

    const value = useMemo(() => ({ vendor, setVendor }), [vendor]);

    return <VendorContext.Provider value={value}>{children}</VendorContext.Provider>;
}
