import Image from "next/image";

export default function PostCard({image, title}){
    return(
        <div>
            <Image
                src={`data:image/png;base64, ${image}`}
                width={512}
                height={512}
                alt=''
                priority
            />
            <h2>{title}</h2>
        </div>
    )
}