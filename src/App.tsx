import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Chapter from "./pages/Chapter";
import { VendorProvider } from "./contexts/VendorProvider";

import Home from "./pages/Home";
import Story1 from "./content/chapter-1/story.mdx";
import Handbook1 from "./content/chapter-1/handbook.mdx";
import Story2 from "./content/chapter-2/story.mdx";
import Handbook2 from "./content/chapter-2/handbook.mdx";
import Story3 from "./content/chapter-3/story.mdx";
import Handbook3 from "./content/chapter-3/handbook.mdx";
import Story4 from "./content/chapter-4/story.mdx";
import Handbook4 from "./content/chapter-4/handbook.mdx";

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    }, [pathname]);

    return null;
}

const CHAPTERS = [
    {
        title: "Infrastructure",
        StoryText: Story1,
        HandbookText: Handbook1,
    },
    {
        title: "Dispatch",
        StoryText: Story2,
        HandbookText: Handbook2,
    },
    {
        title: "Memory",
        StoryText: Story3,
        HandbookText: Handbook3,
    },
    {
        title: "Control Flow",
        StoryText: Story4,
        HandbookText: Handbook4,
    },
];

function App() {
    return (
        <VendorProvider initialVendor="nvidia">
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                {CHAPTERS.map((chapter, index) => (
                    <Route
                        key={index}
                        path={`/chapter-${index + 1}`}
                        element={
                            <Chapter
                                StoryText={chapter.StoryText}
                                HandbookText={chapter.HandbookText}
                                volume={index + 1}
                                title={chapter.title}
                                prev={
                                    index > 0
                                        ? { label: `Chapter ${index}`, to: `/chapter-${index}` }
                                        : undefined
                                }
                                next={
                                    index < CHAPTERS.length - 1
                                        ? {
                                              label: `Chapter ${index + 2}`,
                                              to: `/chapter-${index + 2}`,
                                          }
                                        : undefined
                                }
                            />
                        }
                    />
                ))}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </VendorProvider>
    );
}

export default App;
