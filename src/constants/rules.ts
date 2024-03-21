import { t } from "@/utils/translator";

export const Rules = {
    login: {
        email: [
            {
                required: true,
                message: t('_.Auth.fields.email.rules.required')
            }
        ],
        password: [
            {
                required: true,
                message: t('_.Auth.fields.password.rules.required'),
            },
        ]
    },
    forgotPassword: {
        emailOrUsername: [
            {
                required: true,
                message: t('_.Auth.fields.email_or_username.rules.required'),
            },
        ]
    },
    resetPassword: {
        password: [
            {
                required: true,
                message: t('_.Auth.fields.password.rules.required')
            }
        ],
        confirmPassword: [
            {
                required: true,
                message: t('_.Auth.fields.confirm_password.rules.required')
            }
        ]
    }
};