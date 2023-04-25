import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function ImageCard({ src, prompt }){

    return (
        <div>
            <Image 
                src = {src}
                width={512}
                height={512}
                alt=''
                priority
            />
            {/* <p className={styles.post}>You dream is: {router.query.prompt}</p> */}
            <p>Don't worry! This cute Samoyed will take care of everything for you!</p>
        </div>
    )
}