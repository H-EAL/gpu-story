function Handbook({ index, title }: { index: number; title: string }) {
    return (
        <figure
            className="flex font-mono w-1/2"
            style={{ filter: "drop-shadow(0 28px 52px rgba(0,0,0,0.7))" }}
        >
            {/* ── Spine ── */}
            <div className="w-6 shrink-0 rounded-l-sm border border-r-0 border-stage-cool-border-hi bg-linear-to-r from-[#071420] to-[#0d1e30] flex items-center justify-center overflow-hidden">
                <span
                    className="text-[0.45rem] uppercase tracking-[0.5em] text-stage-cool select-none whitespace-nowrap"
                    style={{ writingMode: "vertical-lr", transform: "rotate(180deg)" }}
                >
                    Vol. {String(index).padStart(2, "0")}
                </span>
            </div>

            {/* ── Cover ── */}
            <div className="flex-1 aspect-2/3 border border-l-0 border-r-0 border-stage-cool-border-hi bg-[#08131e] flex flex-col px-7 py-8">
                {/* Title */}
                <div className="flex-1 flex flex-col justify-start gap-3">
                    <h1 className="text-2xl font-bold leading-snug tracking-wide text-stage-cool-hi m-0">
                        The
                        <br />
                        Showrunner's
                        <br />
                        Handbook
                    </h1>
                    <p className="text-[0.6rem] uppercase tracking-[0.22em] text-stage-cool m-0 leading-relaxed">
                        A Practical Guide to Theater Operations
                    </p>
                </div>

                {/* Divider */}
                <div className="border-t border-stage-cool-border my-4" />

                {/* Volume + Topic */}
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.48rem] uppercase tracking-[0.3em] text-stage-cool/50">
                            Volume
                        </span>
                        <span className="text-lg font-bold text-stage-cool-hi leading-none">
                            {String(index).padStart(2, "0")}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[0.48rem] uppercase tracking-[0.3em] text-stage-cool/50">
                            Topic
                        </span>
                        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-stage-cool-hi">
                            {title}
                        </span>
                    </div>
                </div>
            </div>

            {/* ── Page block edge ── */}
            <div className="w-3 shrink-0 rounded-r-sm border border-l-0 border-stage-cool-border-hi bg-linear-to-r from-[#1a3550] to-[#2a4a6a] opacity-60" />
        </figure>
    );
}

export default Handbook;
