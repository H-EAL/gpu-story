declare module "*.mdx" {
    import type { FC, ReactNode } from "react";
    const component: FC<{ children?: ReactNode }>;
    export default component;
}
