import type { ComponentType } from "react";

import Story1 from "./chapter-1/story.mdx";
import Handbook1 from "./chapter-1/handbook.mdx";
import Story2 from "./chapter-2/story.mdx";
import Handbook2 from "./chapter-2/handbook.mdx";
import Story3 from "./chapter-3/story.mdx";
import Handbook3 from "./chapter-3/handbook.mdx";
import Story4 from "./chapter-4/story.mdx";
import Handbook4 from "./chapter-4/handbook.mdx";

export type Chapter = {
    storyTitle: string;
    handbookTitle: string;
    StoryText: ComponentType;
    HandbookText: ComponentType;
};

export const CHAPTERS: Chapter[] = [
    {
        storyTitle: "Once Upon a Theater",
        handbookTitle: "Infrastructure",
        StoryText: Story1,
        HandbookText: Handbook1,
    },
    {
        storyTitle: "The Call to Stage",
        handbookTitle: "Dispatch",
        StoryText: Story2,
        HandbookText: Handbook2,
    },
    {
        storyTitle: "From Yard to Stage",
        handbookTitle: "Memory",
        StoryText: Story3,
        HandbookText: Handbook3,
    },
    {
        storyTitle: "The Cost of Disagreement",
        handbookTitle: "Control Flow",
        StoryText: Story4,
        HandbookText: Handbook4,
    },
];
