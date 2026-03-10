function Handbook({ index, title }: { index: number; title: string }) {
    return (
        <figure
            className="flex font-mono w-3/4 sm:w-3/5 lg:w-1/2 min-w-0 overflow-hidden"
            style={{ filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.7))" }}
        >
            {/* ── Spine ── */}
            <div className="w-5 sm:w-6 shrink-0 rounded-l-sm border border-r-0 border-stage-cool-border-hi bg-linear-to-r from-[#071420] to-[#0d1e30] flex items-center justify-center overflow-hidden">
                <span
                    className="text-[0.4rem] uppercase tracking-[0.4em] text-stage-cool select-none whitespace-nowrap"
                    style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
                >
                    Vol. {String(index).padStart(2, "0")}
                </span>
            </div>

            {/* ── Cover ── */}
            <div className="flex-1 min-w-0 aspect-2/3 border border-l-0 border-r-0 border-stage-cool-border-hi bg-[#08131e] flex flex-col px-4 py-5 sm:px-5 sm:py-8 overflow-hidden">
                {/* Title */}
                <div className="flex-1 flex flex-col justify-start gap-2 sm:gap-3">
                    <h1 className="text-base sm:text-xl lg:text-2xl font-bold leading-snug tracking-wide text-stage-cool-hi m-0 wrap-break-word">
                        The
                        <br />
                        Showrunner's
                        <br />
                        Handbook
                    </h1>
                    <p className="text-[0.55rem] uppercase tracking-[0.18em] text-stage-cool m-0 leading-relaxed">
                        A Practical Guide to Theater Operations
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-stage-cool-border my-3 sm:my-4" />

                {/* Volume + Topic */}
                <div className="flex flex-col gap-2 sm:gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.42rem] uppercase tracking-[0.25em] text-stage-cool/50">
                            Volume
                        </span>
                        <span className="text-sm sm:text-lg font-bold text-stage-cool-hi leading-none">
                            {String(index).padStart(2, "0")}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.42rem] uppercase tracking-[0.25em] text-stage-cool/50">
                            Topic
                        </span>
                        <span className="text-[0.6rem] sm:text-xs font-semibold uppercase tracking-[0.12em] text-stage-cool-hi">
                            {title}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Page block edge ── */}
            <div className="w-2 sm:w-3 shrink-0 rounded-r-sm border border-l-0 border-stage-cool-border-hi bg-linear-to-r from-[#1a3550] to-[#2a4a6a] opacity-60" />
        </figure>
    );
}

export default Handbook;
