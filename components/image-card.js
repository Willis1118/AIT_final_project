import Image from "next/image";

import styles from '../styles/card.module.css';

export default function ImageCard({ image, prompt }){

    return (
        <div className={styles.card}>
            <div className={styles['image-container']}>
                <Image 
                    src = {`data:image/png;base64, ${image}`}
                    width={300}
                    height={300}
                    alt=''
                    priority
                    quality={15}
                />
                <div className={styles.prompt}>
                    <p>{prompt}</p>
                </div>
            </div>
        </div>
    )
}