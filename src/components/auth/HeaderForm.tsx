import styles from '@/styles/modules/auth.module.scss';


interface Props {
    title: string;
    caption?: string;
    space?: string;
}

export const HeaderForm = ({
    title,
    caption = '',
    space = '30px 0 20px 0'
}: Props) => {


    return (
        <div className={styles.auth_form_header}>
            <h1 className={styles.auth_form_title} style={{
                margin: space
            }}>
                {title}
            </h1>
            {caption && (
                <p className={styles.auth_form_caption}>{caption}</p>
            )}
        </div>
    );
}