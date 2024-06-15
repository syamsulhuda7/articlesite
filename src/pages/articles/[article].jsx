import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const ArticleDetail = () => {
    const router = useRouter();
    const { index, data } = router.query;
    const [article, setArticle] = useState(null);

    useEffect(() => {
        if (data) {
            setArticle(JSON.parse(data));
        }
    }, [data]);

    console.log(article);

    return (
        <div className=' w-full bg-slate-200 flex flex-col items-center justify-center px-40 py-10 gap-5'>
            <img className='' src={article?.image} alt={article?.title} />
            <h1 className=' font-bold text-3xl text-center '>{article?.title}</h1>
            <p className=' text-justify'>{article?.description}</p>
            <button onClick={()=>router.push('/articles')} className='border border-black px-4 py-2 rounded-lg transition-all ease-in-out duration-150 hover:scale-105'>&laquo; Back to Articles</button>
        </div>
    );
};

export default ArticleDetail;