import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(()=>{
    router.push('/articles');
  },[])
  return <div className="h-2000px w-full bg-slate-400">HOME PAGE</div>;
}
