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

export default function Account({ data }){

    const [user, setUser] = useState(null);
    
    const { firstName, lastName, email } = data ? data : { firstName: '', lastName: '', email: ''};

    useEffect(() => {
        setUser(data);
    }, [data]);

    return (
            
        <Layout sessionData={user}>
            {data ? 
                <>
                    <h1>All your dreams</h1>
                    <h2>{firstName} {lastName}</h2>
                    <p>{email}</p>
                </>
            : <></>}
        </Layout>
                
    )
}