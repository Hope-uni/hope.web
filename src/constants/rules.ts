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
    },
    user: {
        create: {
            user_role: [
                {
                    required: true,
                    message: t('_.User.fields.user_role.rules.required')
                }
            ],
            first_name: [
                {
                    required: true,
                    message: t('_.User.fields.first_name.rules.required')
                }
            ],
            second_name: [
                {
                    required: true,
                    message: t('_.User.fields.second_name.rules.required')
                }
            ],
            first_surname: [
                {
                    required: true,
                    message: t('_.User.fields.first_surname.rules.required')
                }
            ],
            second_surname: [
                {
                    required: true,
                    message: t('_.User.fields.second_surname.rules.required')
                }
            ]
        }
    }
};