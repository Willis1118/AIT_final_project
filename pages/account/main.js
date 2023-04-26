import { useState, useEffect } from "react";

import Layout from "../../components/layout";
import { getSession } from '../../utils/api/get-session';

export async function getServerSideProps(context){
    const session = await getSession(context.req, context.res);

    return {
        props: {
            data: session.user ? session.user : null
        }
    };
}

export default function Posts({ data }){

    const [user, setUser] = useState(null);
    
    const { firstName, lastName, email } = data;

    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
        <Layout sessionData={user}>
            <h1>All your dreams</h1>
            <h2>{firstName} {lastName}</h2>
            <p>{email}</p>
        </Layout>
    )
}