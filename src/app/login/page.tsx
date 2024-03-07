'use client'

import styles from '@/styles/modules/auth.module.scss';
import Image from 'next/image';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import FormItem from "antd/lib/form/FormItem";

export default function LoginPage() {

    return (
        <Form
            name="auth_login"
            id='auth_form_antd'
            className={styles.auth_form}
            initialValues={{ remember: true }}
        >
            <h1 className={styles.auth_form_title}>Iniciar sesión</h1>
            <FormItem
                name="email"
                className={styles.auth_form_input}
                rules={[{ required: true, message: 'Please input your Username!' }]}
            >
                <Input placeholder="Correo" />
            </FormItem>
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

            <Button type="primary" htmlType="submit" className={styles.auth_form_submit}>
                Entrar
            </Button>
        </Form>
    );
}