import { useRouter } from "next/router";

import Layout from "../components/layout";
import { getSession } from "../utils/api/get-session";

export async function getServerSideProps(context){
    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null
        }
    }
}

export default function ErrorPage({ data, error }){

    const router = useRouter();

    return (
        <>
        <Layout sessionData={data}>
            <h1>Oops...Something went wrong...</h1>
        </Layout>
        </>
    )
}