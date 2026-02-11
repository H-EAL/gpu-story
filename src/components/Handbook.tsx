function Handbook({ index, title }: { index: number; title: string }) {
    return (
        <figure
            className="handbook-cover"
            role="img"
            aria-label={`Handbook volume ${index}: ${title}`}
        >
            <div className="handbook-series-title">
                <h1>The Showrunner's Handbook</h1>
                <h2>A Practical Guide to Theater Operations</h2>
            </div>
            <hr />
            <div className="handbook-volume-title">
                <h2>Volume {index}</h2>
                <h1>{title}</h1>
            </div>
        </figure>
    );
}

export default Handbook;
