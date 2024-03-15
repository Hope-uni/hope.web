'use client'

import styles from '@/styles/modules/auth.module.scss';
import { Button, Col, Form, Input, Row } from 'antd';
import FormItem from "antd/lib/form/FormItem";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeaderForm } from '@/components/auth/HeaderForm';

interface Props {
    token: string | null;
}

export const ResetPasswordForm = ({ token }: Props) => {
    const router = useRouter();

    const handleOnFinish = () => {
        router.push('/admin');
    }

    if (!token) {
        return (
            <div className={styles.auth_form}>
                <HeaderForm
                    title='Restablecer contraseña'
                    caption='Lo sentimos, hubo un problema al obtener el token. Por favor, verifique el enlace y vuelva a intentarlo.'
                    space='30px 0 25px 0'
                />
                <Button type="primary" style={{ marginTop: '2rem' }}>
                    <Link href="/login">Ir a iniciar sesión</Link>
                </Button>
            </div>
        );
    }

    return (
        <Form
            name="auth_reset_password"
            id='auth_form_antd'
            className={styles.auth_form}
            autoComplete="off"
            layout='vertical'
            initialValues={{ remember: true }}
            onFinish={handleOnFinish}
        >
            <HeaderForm
                title='Restablecer contraseña'
                caption='Ingrese la nueva contraseña y confírmela para finalizar el proceso de cambio de contraseña'
                space='10px 0 5px 0'
            />

            <FormItem
                name="password"
                className={styles.auth_form_input}
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    type="password"
                    placeholder="Contraseña"
                />
            </FormItem>

            <FormItem
                name="password"
                className={styles.auth_form_input}
                rules={[{ required: true, message: 'Please input your Password!' }]}
            >
                <Input
                    type="password"
                    placeholder="Confirmar contraseña"
                />
            </FormItem>

            <Form.Item className={styles.rowCenter}>
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