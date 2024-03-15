'use client'

import styles from '@/styles/modules/auth.module.scss';
import { Button, Form, Input } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeaderForm } from '@/components/auth/HeaderForm';

export const ForgotPasswordForm = () => {
    const router = useRouter();

    const handleOnFinish = () => {
        router.push('/admin');
    }

    return (
        <Form
            name="auth_forgot_password"
            id='auth_form_antd'
            className={styles.auth_form}
            autoComplete="off"
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={handleOnFinish}
        >
            <HeaderForm
                title='Restablecer contraseña'
                caption='Ingrese el nombre de usuario o la dirección de correo electrónico asociada con su cuenta y le enviaremos un enlace para restablecer su contraseña'
            />

            <Form.Item
                name="emailOrUsername"
                rules={[
                    {
                        required: true,
                        message: 'Usuario o correo electrónico es requerido',
                    },
                ]}
            >
                <Input placeholder='usuario o correo electrónico' />
            </Form.Item>



            <Form.Item className={styles.rowCenter}>
                <br />
                <Button type="primary" htmlType="submit" className={styles.auth_form_submit}>
                    Enviar
                </Button>
                <div className={styles.auth_form_link_back_row}>
                    <p className={styles.auth_form_already_have_account}>
                        Regresa a
                    </p>
                    <Link href='/login' className={styles.auth_form_link_back}>
                        Iniciar sesión
                    </Link>
                </div>
            </Form.Item>

        </Form>
    );
}