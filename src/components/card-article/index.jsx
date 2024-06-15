import { useRouter } from "next/router";

export default function CardArticle ({sendArticles}) {
    
    const router = useRouter()
    
    const handleClick = (index, slug) => {
        const singleData = sendArticles[index];
        console.log(singleData);
        console.log(slug);
        router.push({
            pathname: `/articles/${slug}`,
            query: { data: JSON.stringify(singleData) },
        });
    }
    return (
        <>
        {sendArticles.map((item, index) => (
                <div onClick={()=>handleClick(index, item.slug)} key={item.id} className="relative h-fit w-[400px] bg-slate-200 rounded-sm cursor-pointer">
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