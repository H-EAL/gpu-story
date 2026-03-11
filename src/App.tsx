import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";

import Chapter from "./pages/Chapter";
import { VendorProvider } from "./contexts/VendorProvider";
import Home from "./pages/Home";
import { CHAPTERS } from "./content/chapters";

function ScrollToTop() {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        const raf = requestAnimationFrame(() => {
            if (hash) {
                const el = document.getElementById(hash.slice(1));
                if (el) {
                    el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
                    return;
                }
            }
            window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        });
        return () => cancelAnimationFrame(raf);
    }, [pathname, hash]);

    return null;
}

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
                                key={index + 1}
                                StoryText={chapter.StoryText}
                                HandbookText={chapter.HandbookText}
                                volume={index + 1}
                                title={chapter.handbookTitle}
                                storyTitle={chapter.storyTitle}
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
