import Image from "next/image";

import styles from '../styles/card.module.css';

export default function PostCard({ post }){
    const d = new Date(post.createdAt);
    post.createdAt = d.toLocaleDateString();

    return(
        <div className={styles.card}>
            <div className={styles['image-container']}>
                <Image
                    src={`data:image/png;base64, ${post.image}`}
                    width={256}
                    height={256}
                    alt=''
                    priority
                />
                <div className={styles.prompt}>
                    <h2>{post.title}</h2>
                    <p>{post.createdAt}</p>
                </div>
            </div>
        </div>
    )
}