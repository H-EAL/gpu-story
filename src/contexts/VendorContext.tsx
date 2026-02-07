import { createContext } from "react";

export type Vendor = "nvidia" | "amd" | "intel" | "vulkan" | "generic";

type VendorContextValue = {
    vendor: Vendor;
    setVendor: (vendor: Vendor) => void;
};

export const VendorContext = createContext<VendorContextValue | undefined>(undefined);
