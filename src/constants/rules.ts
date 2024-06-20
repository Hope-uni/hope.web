import { t } from "@/utils/translator";
import { Rule } from 'antd/lib/form';

interface I_Rules {
    [key: string]: {
        [key: string]: Rule[]
    }
}

export const Rules: I_Rules = {
    auth: {
        emailOrUsername: [
            {
                required: true,
                message: t('_.Auth.fields.email_or_username.rules.required')
            },
            {
                validator: async (_, value) => {
                    if (!value) {
                        return Promise.reject();
                    }

                    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    const usernamePattern = /^[a-zA-Z0-9]{3,16}$/;

                    if (emailPattern.test(value) || usernamePattern.test(value)) {
                        return Promise.resolve();
                    }

                    return Promise.reject(t('_.Auth.fields.email_or_username.rules.validator'));
                }
            }
        ],
        password: [
            {
                required: true,
                message: t('_.Auth.fields.password.rules.required'),
            },
            {
                min: 3,
                message: t('_.Auth.fields.password.rules.min'),
            }
        ]
    },
    user: {
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
};