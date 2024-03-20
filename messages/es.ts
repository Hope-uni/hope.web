export const messages = {
  Index: {
    title: 'Hello world!',
  },
  Auth: {
    form: {
      login: {
        title: 'Inicio de sesión',
      },
      forgot_password: {
        title: 'Restablecer contraseña',
        caption:
          'Ingrese el nombre de usuario o la dirección de correo electrónico asociada con su cuenta y le enviaremos un enlace para restablecer su contraseña',
      },
      reset_password: {
        title: 'Restablecer contraseña',
        caption:
          'Ingrese la nueva contraseña y confírmela para finalizar el proceso de cambio de contraseña',
        caption_no_token:
          'Lo sentimos, hubo un problema al obtener el token. Por favor, verifique el enlace y vuelva a intentarlo.',
      },
      forgot_password_link: '¿Olvidó su contraseña?',
      login_link: 'Iniciar sesión',
      go_back_to: 'Regresa a ',
      submit: 'Entrar',
      send: 'Enviar',
    },
    fields: {
      email: {
        label: 'Correo',
        Placeholder: 'Correo',
        rules: {
          required: 'Por favor ingrese su correo electrónico',
        },
      },
      password: {
        label: 'Contraseña',
        Placeholder: 'Contraseña',
        rules: {
          required: 'Por favor ingrese su Contraseña',
        },
      },
      confirm_password: {
        label: 'Confirmar contraseña',
        Placeholder: 'Confirmar contraseña',
        rules: {
          required: 'Por favor ingrese su Contraseña',
        },
      },
      email_or_username: {
        label: 'Usuario o correo electrónico',
        Placeholder: 'Usuario o correo electrónico',
        rules: {
          required: 'Usuario o correo electrónico es requerido',
        },
      },
    },
  },
  Copy: '© {year} Hope. Todos los derechos reservados',
};
