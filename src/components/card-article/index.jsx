export default function CardArticle ({sendArticles}) {
    return (
        <>
        {sendArticles.map((item) => (
                <div key={item.id} className="relative h-fit w-[400px] bg-slate-200 rounded-sm">
                    <div className=" h-64 w-full">
                        <img className="h-full w-full object-cover" src={item.image} alt={item.title} />
                    </div>
                    <p className="px-4 py-2">
                    {item.title.length > 60 ? item.title.slice(0, 60).toUpperCase() + '...' : item.title.toUpperCase()}
                    </p>
                    </div>
            ))}
        </>
    )
}