function Handbook({ index, title }: { index: number; title: string }) {
    return (
        <figure
            className={`
            w-150
            flex flex-col gap-0.5 items-center content-start
            bg-linear-180 from-[rgb(32,32,32)] to-[rgb(21,21,21)]
            border border-[#2e2e2e] rounded-r-md px-2 py-3
            border-l-20 border-r-6 border-r-amber-100/40
            aspect-392/305
            text-[#ffe6b0]
            inset-shadow-lime-600
            text-center
            font-[Consolas]
            font-bold
        `}
        >
            <div className="grid items-center text-center gap-1">
                <h1 className="text-2xl text-[#fff2cc]">The Showrunner's Handbook</h1>
                <h2>A Practical Guide to Theater Operations</h2>
            </div>
            <hr />
            <div className="grid w-full grow items-center text-center content-center justify-end pr-4">
                <h2 className="uppercase tracking-widest text-lg/relaxed opacity-85 pb-1 border-b border-b-amber-100 text-[#d8b97b]">
                    Volume {index}
                </h2>
                <h1 className="text-[#f0d9a6] text-xl/relaxed my-2">{title}</h1>
            </div>
        </figure>
    );
}

export default Handbook;
