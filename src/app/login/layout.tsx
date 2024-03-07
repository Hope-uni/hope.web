import styles from '@/styles/modules/auth.module.scss';
import Image from 'next/image';
import login_img from '@/assets/img/auth_layout_img.svg'
import hopeLogo from '@/assets/img/hope_logo.svg';


interface Props {
    children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
    return (
        <div className={styles.auth_wrapper_layout}>
            <div className={styles.auth_wrapper_layout_inner}>
                <div className={styles.auth_layout_img}>
                    <Image
                        src={login_img}
                        alt='hope_admin'
                    />
                </div>
                <div className={styles.form_auth_wrapper}>
                    <div className={styles.form_auth_card}>
                        <Image
                            className={styles.form_auth_logo}
                            src={hopeLogo}
                            alt='hope_logo'
                            width={150}
                        />
                        {children}
                        <footer className={styles.form_auth_copy}>
                            <small>&copy; 2024 Hope. Todos los derechos reservados</small>
                        </footer>
                    </div>
                </div>
            </div>
        </div>
    );
}