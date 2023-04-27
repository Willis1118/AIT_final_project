import { useState, useEffect } from "react";

import Layout from "../components/layout";
import { getSession } from '../utils/api/get-session';

export async function getServerSideProps(context){
    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null
        }
    };
}

export default function About({ data }){

    const [user, setUser] = useState(null);
    
    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
        <Layout sessionData={user}>
            <h1>Final project for AIT</h1>
        </Layout>
    )
}