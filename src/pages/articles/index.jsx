import CardArticle from "@/components/card-article";
import Loading from "@/components/loading";
import Pagination from "@/components/pagination";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Articles () {
    const [articles, setArticles] = useState([]);
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        const token = localStorage.getItem('token')
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://103.164.54.252:8000/api/articles?page=${page}`, {
                    headers : {
                        Authorization : `Bearer ${token}`
                    }
                })
                setData(response.data)
                setArticles(response.data.data)
            } catch (error) {
                 console.error(error)   
            } finally {
                setLoading(false)
            }
        }
        fetchData();
    },[page])
    return (
        <>
        {loading ? <Loading/> : (
        <div className="min-h-[90vh] max-h-full w-full bg-slate-300 p-6 flex flex-col items-center">
            <div className="flex flex-wrap gap-4 items-center justify-center">
                <CardArticle sendArticles={articles}/>
            </div>
            <Pagination sendData={data} sendPage={setPage}/>
        </div>
        )}
        </>
    )
}