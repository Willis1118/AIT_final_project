import { dbConnection } from "../../lib/dbConnect";

export default async function handler(req, res){

    const user = req.body;

    await dbConnection();

    console.log(req.body);
    res.redirect(302, '/');
}