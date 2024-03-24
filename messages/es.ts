export const _ = {
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
        placeholder: 'Correo',
        rules: {
          required: 'Por favor ingrese su correo electrónico',
        },
      },
      password: {
        label: 'Contraseña',
        placeholder: 'Contraseña',
        rules: {
          required: 'Por favor ingrese su Contraseña',
        },
      },
      confirm_password: {
        label: 'Confirmar contraseña',
        placeholder: 'Confirmar contraseña',
        rules: {
          required: 'Por favor ingrese su Contraseña',
        },
      },
      email_or_username: {
        label: 'Usuario o correo electrónico',
        placeholder: 'Usuario o correo electrónico',
        rules: {
          required: 'Usuario o correo electrónico es requerido',
        },
      },
    },
  },
  User: {
    index: {
      title: 'Usuarios',
      caption: 'Lista de todos los usaurios (Pacientes, Tutores, Terapeuta).',
    },
    form: {
      create: {
        title: 'Crear usuario',
        caption: 'Registra nuevos usuarios. Completa este formulario para agregar usuarios al sistema.',
        next_button: 'Siguiente',
        prev_button: 'Atrás',
        submit_button: 'Crear usuario'
      }
    },
    fields: {
      user_role: {
        label: 'Rol del usaurio',
        placeholder: 'Rol del usaurio',
        rules: {
          required: 'Rol es requerido',
        },
      },
      first_name: {
        label: 'Primer nombre',
        placeholder: 'Ingrese su rimer nombre',
        rules: {
          required: 'Primer nombre es requerido',
        },
      },
      second_name: {
        label: 'Segundo nombre',
        placeholder: 'Ingrese su segundo nombre',
        rules: {
          required: 'Segundo nombre es requerido',
        },
      },
      first_surname: {
        label: 'Primer apellido',
        placeholder: 'Ingrese su primer apellido',
        rules: {
          required: 'Primer apellido es requerido',
        },
      },
      second_surname: {
        label: 'Segundo apellido',
        placeholder: 'Ingrese su segundo apellido',
        rules: {
          required: 'Segundo apellido es requerido',
        },
      },
      birthday: {
        label: 'Fecha nacimiento',
        placeholder: 'Fecha de nacimiento del paciente',
        rules: {
          required: 'Fecha de nacimiento es requerido',
        },
      },
      grade_of_tea: {
        label: 'Grado de autismo',
        placeholder: 'Grado de autismo del paciente',
        rules: {
          required: 'Grado de autismo es requerido',
        },
      },
      phase: {
        label: 'Fase',
        placeholder: 'Fase de la metodología',
        rules: {
          required: 'Fase de la metodología es requerido',
        },
      },
      tutor_in_charge: {
        label: 'Tutor a cargo',
        placeholder: 'Seleccione el tutor que estará a cargo del paciente',
        rules: {
          required: 'Tutor a cargo es requerido',
        },
      },
      observations: {
        label: 'Observaciones',
        placeholder: 'Obervaciones del paciente ej. cosas que le disgutan, cosas que le gustan...',
        rules: {
          required: 'Observaciones es requerido',
        },
      },
      identification: {
        label: 'Número de identificación',
        placeholder: 'Cedula de indentidad',
        rules: {
          required: 'Número de identificación es requerido',
        },
      },
      phone_number: {
        label: 'Celular',
        placeholder: 'Número del celuar',
        rules: {
          required: 'Celular es requerido',
        },
      },
      telephone: {
        label: 'Teléfono',
        placeholder: 'Número de teléfono',
        rules: {
          required: 'Teléfono es requerido',
        },
      },
      image_url: {
        label: 'Foto de perfil',
        placeholder: 'Foto de perfil',
        rules: {
          required: 'Foto de perfil es requerido',
        },
      },
      username: {
        label: 'Nombre de usuario',
        placeholder: 'Ingrese su nombre de usuario',
        rules: {
          required: 'Nombre de usuario es requerido',
        },
      },
      email: {
        label: 'Correo electrónico',
        placeholder: 'Ingrese su correo electrónico',
        rules: {
          required: 'Correo electrónico es requerido',
        },
      },
      password: {
        label: 'Contraseña',
        placeholder: 'Ingrese su contraseña',
        rules: {
          required: 'Contraseña es requerido',
        },
      },
      confirma_password: {
        label: 'Confirma contraseña',
        placeholder: 'Confirmae contraseña',
      }
    }
  },
  Patient: {
    index: {
      title: 'Usuarios',
      caption: 'Listado de todos los usuarios (Pacientes, Tutores, Terapeuta).',
    },
  },
  Tutor: {
    index: {
      title: 'Tutores',
      caption: 'Listado de todos los tutores.',
    },
  },
  Therapist: {
    index: {
      title: 'Terapeutas',
      caption: 'Listado de todos los terapeutas.',
    },
  },
  Pictogram: {
    index: {
      title: 'Pictogramas',
      caption: 'Listado de todos los pictogramas.',
    },
  },
  Category: {
    index: {
      title: 'Categorías',
      caption: 'Listado de todos las categorias de pictogramas.',
    },
  },
  Activity: {
    index: {
      title: 'Actividades',
      caption: 'Listado de todos las actividades.',
    },
  },
  Achievement: {
    index: {
      title: 'Logros',
      caption: 'Listado de todos los logros.',
    },
  },
  Role: {
    index: {
      title: 'Logros',
      caption: 'Listado de todos los logros.',
    },
    catalog: {
      patient: 'Paciente',
      tutor: 'Tutor',
      therapist: 'Terapeuta',
      admin: 'Admin'
    }
  },
  menu: {
    routes: {
      patients: 'Pacientes',
      tutors: 'Tutores',
      therapists: 'Tepeutas',
      pictograms: 'Pictogramas',
      categories: 'Categorias',
      activities: 'Actividades',
      achievements: 'Logros',
      users: 'Usuarios',
      roles: 'Roles',
      logout: 'Cerrar sesión'
    }
  },
  partials: {
    go_back_to_list: 'Volver a la lista'
  },
  components: {
    dragger: {
      title_bold: 'Haz clic para subir',
      title_regular: 'o arrastra y suelta',
      caption: 'SVG, PNG or JPG (máx. 800x400px)'
    }
  },
  Copy: '© {year} Hope. Todos los derechos reservados',
};