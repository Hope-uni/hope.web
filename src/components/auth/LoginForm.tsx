'use client'

import styles from '@/styles/modules/auth.module.scss';
import { Button, Col, Form, Input, Row } from 'antd';
import FormItem from "antd/lib/form/FormItem";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HeaderForm } from '@/components/auth/HeaderForm';

export const LoginForm = () => {
    const router = useRouter();

    const handleOnFinish = () => {
        router.push('/admin');
    }

    return (
        <Form
            name="auth_login"
            id='auth_form_antd'
            className={styles.auth_form}
            initialValues={{ remember: true }}
            onFinish={handleOnFinish}
        >
            <HeaderForm title='Iniciar sesión' />

            <FormItem
                name="email"
                className={styles.auth_form_input}
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input placeholder="Correo" />
            </FormItem>

            <div className='w-100'>
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
                <FormItem>
                    <Link href='/login/forgot-password' className={styles.auth_form_link_forgot}>
                        ¿Olvidó su contraseña?
                    </Link>
                </FormItem>
            </div>

            <Button type="primary" htmlType="submit" className={styles.auth_form_submit}>
                Entrar
            </Button>
        </Form>
    );
}