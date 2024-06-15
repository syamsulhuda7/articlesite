import { useRouter } from "next/router";

export default function Profile () {
    const {query} = useRouter();
    console.log(query);
    return (
        <>
            <h1>Profile Page</h1>
            <p>id : {query.profile} </p>
        </>
    );
}