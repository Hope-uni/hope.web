'use client'
import { useSearchParams } from "next/navigation";
import styles from '@/styles/modules/auth.module.scss';
import { ResetPasswordForm } from "@/components/auth/ResetPasswordForm";
import { Button } from "antd";
import Link from "next/link";

export default function ResetPasswordPage() {

    const searchParams = useSearchParams();
    const token = searchParams.get('token');

    return (
        <ResetPasswordForm token={token} />
    );
}