import Image from "next/image";

export default function PostCard({ post }){
    const d = new Date(post.createdAt);
    post.createdAt = d.toLocaleDateString();

    return(
        <div>
            <Image
                src={`data:image/png;base64, ${post.image}`}
                width={512}
                height={512}
                alt=''
                priority
            />
            <h2>{post.title}</h2>
            <p>{post.createdAt}</p>
        </div>
    )
}