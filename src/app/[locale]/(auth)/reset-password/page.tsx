'use client';
import { ResetPasswordForm } from '@/components/auth/ResetPasswordForm';
import { useSearchParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return <ResetPasswordForm token={token} />;
}
