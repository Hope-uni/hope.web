const es = {
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
      email_or_username: {
        label: 'Usuario o correo electrónico',
        placeholder: 'Usuario o correo electrónico',
        rules: {
          required: 'Usuario o correo electrónico es requerido',
          validator: 'Ingrese un correo electrónico o usuario válido',
        },
      },
      password: {
        label: 'Contraseña',
        placeholder: 'Contraseña',
        rules: {
          required: 'Contraseñá es requerida',
          min: 'La contraseña debe tener al menos 8 caracteres',
        },
      },
      confirm_password: {
        label: 'Confirmar contraseña',
        placeholder: 'Confirmar contraseña',
        rules: {
          required: 'Por favor ingrese su Contraseña',
        },
      },
    },
    errors: {
      unauthorized:
        'Parece que tu cuenta no tiene los permisos requeridos para ingresar. Si necesitas acceso, por favor contacta al administrador.',
    },
  },
  User: {
    index: {
      title: 'Usuarios',
      caption: 'Lista de todos los usuarios (Pacientes, Tutores, Terapeuta).',
      createButton: 'Crear usuario',
      searchPlaceholder: 'Buscar usuarios...',
      columns: {
        email: 'Correo electrónico',
        user: 'Usuario',
        role: 'Rol',
      },
    },
    form: {
      create: {
        title: 'Crear usuario',
        caption:
          'Registra nuevos usuarios. Completa este formulario para agregar usuarios al sistema.',
        next_button: 'Siguiente',
        prev_button: 'Atrás',
        submit_button: 'Crear usuario',
        steps: {
          step_1: {
            title: 'Datos generales',
            titleForm: 'Información general del usuario',
            description: 'Información general',
          },
          step_2: {
            title: 'Datos especificos',
            titleForm: 'Información especifica del {{roleName}}',
            description: 'Datos del usuario',
          },
          step_3: {
            title: 'Usuario',
            titleForm: 'Crear usario',
            description: 'Crear usuario',
          },
        },
      },
      edit: {
        title: 'Editar usuario',
        title_data_user: 'Información del usuario',
        title_data_general: 'Datos generales',
        title_data_specific: 'Datos del {{personType}}',
        cancel_button: 'Cancelar',
        edit_button: 'Editar',
      },
      feedback: {
        user_not_found:
          'El usuario solicitado no existe o no se encuentra registrado.',
        not_changed_detect: 'No se detectaron cambios',
      },
    },
    fields: {
      user_role: {
        label: 'Rol del usuario',
        placeholder: 'Rol del usuario',
        rules: {
          required: 'Rol es requerido',
        },
      },
      first_name: {
        label: 'Primer nombre',
        placeholder: 'Ingrese el primer nombre',
        rules: {
          required: 'Primer nombre es requerido',
        },
      },
      second_name: {
        label: 'Segundo nombre',
        placeholder: 'Ingrese el segundo nombre',
        rules: {
          required: 'Segundo nombre es requerido',
        },
      },
      first_surname: {
        label: 'Primer apellido',
        placeholder: 'Ingrese el primer apellido',
        rules: {
          required: 'Primer apellido es requerido',
        },
      },
      second_surname: {
        label: 'Segundo apellido',
        placeholder: 'Ingrese el segundo apellido',
        rules: {
          required: 'Segundo apellido es requerido',
        },
      },
      gender: {
        label: 'Género',
        placeholder: 'Ingrese el género',
        rules: {
          required: 'Género es requerido',
        },
      },
      address: {
        label: 'Dirección',
        placeholder: 'Ingrese una dirección',
        rules: {
          required: 'Dirección es requerido',
        },
      },
      birthday: {
        label: 'Fecha nacimiento',
        placeholder: 'Fecha de nacimiento del paciente',
        rules: {
          required: 'Fecha de nacimiento es requerida',
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
          required: 'Fase de la metodología es requerida',
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
        placeholder:
          'Observaciones del paciente ej. cosas que le disgustan, cosas que le gustan...',
        rules: {
          required: 'Observaciones es requerido',
        },
      },
      identification: {
        label: 'Número de identificación',
        placeholder: 'Cedula de identidad',
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
          required: 'Foto de perfil es requerida',
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
          required: 'Contraseña es requerida',
        },
      },
      confirma_password: {
        label: 'Confirma contraseña',
        placeholder: 'Confirmar contraseña',
      },
    },
    actions: {
      delete: {
        modal: {
          title: 'Deshabilitar usuario',
          description:
            '¿Estás seguro/a de que deseas deshabilitar al usuario <StrongValue />?',
        },
      },
    },
  },
  Patient: {
    index: {
      title: 'Pacientes',
      caption: 'Listado de todos los pacientes.',
      createButton: 'Crear paciente',
      searchPlaceholder: 'Buscar paciente...',
      columns: {
        name: 'Nombre',
        age: 'Edad',
        grade: 'Grado',
        phase: 'Fase',
        achievements: 'Logros',
        years_old: '{{age}} años',
      },
    },
    detail: {
      tabs: {
        record_tab: 'Expediente',
        actividades_tab: 'Actividades',
        pictogramas_tab: 'Pictogramas',
        logros_tab: 'Logros',
      },
      title_observation: 'Observaciones',
      title_current_activity: 'Actividad asignada',
      title_completed_activities: 'Actividades completdas',
      title_custom_pictograms: 'Pictogramas personalizados',
      title_achieved_achievements: 'Logros conseguidos',
      title_info_tutor: 'Información del tutor',
      title_info_therapist: 'Terapeuta a cargo',
      progress: 'Progreso',
      progress_with_percent: 'Progreso {{value}}%',
      grade: 'Grado {grade}',
      phase: 'Fase {{phase}}',
      phase_2: 'Fase: {{phase}}',
      card_profile: {
        info_descriptions: {
          email: 'Correo',
          telephone: 'Teléfono',
        },
      },
      description_patient: {
        birthday: 'Fecha de nacimiento',
        telephone: 'Teléfono de casa',
        address: 'Dirección',
      },
      feedback: {
        current_activity_not_assigned:
          'El paciente no tiene ninguna actividad asignada.',
        no_completed_activities:
          'El paciente no ha completado ninguna actividad.',
        no_created_custom_pictograms:
          'El paciente no ha creado pictogramas personalizados.',
        no_assigned_achievements: 'El paciente no tiene logros asignados.',
        no_therapist_assigned: 'El paciente no tiene terapeuta asignado.',
        no_created_observation: 'El paciente no tiene observación.',
      },
    },
    actions: {
      delete: {
        modal: {
          title: 'Deshabilitar paciente',
          description:
            '¿Estás seguro/a de que deseas deshabilitar al paciente <StrongValue />?',
        },
      },
      next_phase: {
        modal: {
          title: 'Avanzar de nivel',
          description:
            '¿Estás seguro/a de que deseas avanzar de fase a <StrongValue />?',
          ok_text: 'Confirmar',
        },
      },
      add_observation: {
        button_add: 'Agregar obvervación',
        button_add_mobile: 'Agregar',
        modal: {
          title: 'Agregar nueva observación',
          ok_text: 'Guardar',
        },
      },
      add_achievement: {
        button_add: 'Asignar logro',
        button_add_mobile: 'Asignar',
        modal: {
          title: 'Asignar logros',
          ok_text: 'Guardar',
        },
      },
    },
    fields: {
      assign_achievements: {
        label: 'Logros',
        placeholder: 'Lista de logros',
        rules: {
          required: 'Logro es requerido',
        },
      },
    },
  },
  Tutor: {
    index: {
      title: 'Tutores',
      caption: 'Listado de todos los tutores.',
      createButton: 'Crear tutor',
      searchPlaceholder: 'Buscar tutores...',
      columns: {
        name: 'Nombre',
        email: 'Correo electrónico',
        phone: 'Celular',
        telephone: 'Teléfono',
        patientsInCharge: 'Niños a cargo',
      },
    },
    detail: {
      tabs: {
        generl_info: 'Información general',
        children_in_charge: 'Niños a cargo',
      },
      description_labels: {
        email: 'Correo electrónico',
        phone: 'Celular',
        telephone: 'Teléfono de casa',
        address: 'Dirección',
      },
      title_children_in_charge: 'Niños a cargo',
      feedback: {
        no_children_not_assigned: 'El tutor no tiene pacientes asignados.',
      },
    },
    actions: {
      delete: {
        modal: {
          title: 'Deshabilitar tutor',
          description:
            '¿Estás seguro/a de que deseas deshabilitar al tutor <StrongValue />?',
        },
      },
    },
  },
  Therapist: {
    index: {
      title: 'Terapeutas',
      caption: 'Listado de todos los terapeutas.',
      createButton: 'Crear terapeuta',
      searchPlaceholder: 'Buscar terapeutas...',
      columns: {
        name: 'Nombre',
        email: 'Correo electrónico',
        email_short: 'Correo',
        phone: 'Celular',
        patientsInCharge: 'Niños a cargo',
      },
    },
    detail: {
      tabs: {
        generl_info: 'Información general',
        children_in_charge: 'pacientes',
        activities_created: 'Actividades',
      },
      description_labels: {
        email: 'Correo electrónico',
        identification: 'Número identificación',
        phone: 'Celular',
        address: 'Dirección',
      },
      title_children_in_charge: 'Pacientes a cargo',
      title_activities_created: 'Actividades creadas',
      feedback: {
        current_activity_not_created:
          'El terapeuta no tiene actividades creadas.',
        no_children_not_assigned: 'El terapeuta no tiene pacientes asignados.',
      },
    },
    actions: {
      delete: {
        modal: {
          title: 'Deshabilitar terapeuta',
          description:
            '¿Estás seguro/a de que deseas deshabilitar al terapeuta <StrongValue />?',
        },
      },
      assign_patients: {
        button_add: 'Asignar pacientes',
        modal: {
          title: 'Asignar paciente',
          ok_text: 'Guardar',
        },
      },
    },
    fields: {
      assign_patients: {
        label: 'Pacientes',
        placeholder: 'Lista de pacientes disponibles',
        rules: {
          required: 'Pacientes es requerido',
        },
      },
    },
  },
  Pictogram: {
    index: {
      title: 'Pictogramas',
      caption: 'Listado de todos los pictogramas.',
      createButton: 'Crear pictograma',
      searchPlaceholder: 'Buscar pictogramas...',
      columns: {
        image: 'Image',
        name: 'Nombre',
        category: 'Categoría',
      },
    },
    form: {},
    fields: {
      name: {
        label: 'Nombre',
        placeholder: 'Nombre del pictograma',
        rules: {
          required: 'Nombre del pictograma es requerido',
        },
      },
      category: {
        label: 'Categoría',
        placeholder: 'Seleccione una categoría',
        rules: {
          required: 'Categoría es requerido',
        },
      },
      image: {
        label: 'Imagen',
        placeholder: 'Imagen',
        rules: {
          required: 'Imagen es requerido',
        },
      },
    },
    actions: {
      form: {
        modal: {
          title_create: 'Crear pictograma',
          ok_text_create: 'Guardar',
          title_edit: 'Editar pictograma',
          ok_text_edit: 'Editar',
        },
      },
      delete: {
        modal: {
          title: 'Eliminar pictograma',
          description:
            '¿Estás seguro/a de que deseas deshabilitar el pictograma <StrongValue />?',
        },
      },
    },
  },
  Category: {
    index: {
      title: 'Categorías',
      caption: 'Listado de todos las categorías de pictogramas.',
      createButton: 'Crear categoría',
      searchPlaceholder: 'Buscar categoría...',
      columns: {
        icon: 'Icono',
        name: 'Descripción',
      },
    },
    fields: {
      name: {
        label: 'Nombre',
        placeholder: 'Nombre de la categoría',
        rules: {
          required: 'Nombre es requerido',
        },
      },
      icon: {
        label: 'Imagen',
        placeholder: 'Imagen de la cateogría',
        rules: {
          required: 'Imagen es requerida',
        },
      },
    },
    actions: {
      delete: {
        modal: {
          title: 'Eliminar categoría',
          description:
            '¿Estás seguro/a de que deseas deshabilitar la categoría <StrongValue />?',
        },
      },
      form: {
        modal: {
          title_create: 'Crear categoría',
          ok_text_create: 'Guardar',
          title_edit: 'Editar categoría',
          ok_text_edit: 'Editar',
        },
      },
    },
  },
  Activity: {
    index: {
      title: 'Actividades',
      caption: 'Listado de todos las actividades.',
      createButton: 'Crear actividad',
      searchPlaceholder: 'Buscar actividades...',
      columns: {
        name: 'Nombre',
        description: 'Descripción',
        assignments: 'Asignaciones',
        points: 'Puntos',
        phase: 'Fase',
      },
    },
    form: {
      feedback: {
        activity_not_found:
          'La actividad solicitado no existe o no está registrada.',
      },
    },
    fields: {
      name: {
        label: 'Nombre',
        placeholder: 'Nombre de la actividad',
        rules: {
          required: 'Nombre es requerido',
          len: 'Nombre de la actividad debe contener máximo 30 caracteres',
        },
      },
      description: {
        label: 'Descripción',
        placeholder: 'Descripción corta de la actividad a realizar',
        rules: {
          required: 'Descripción es requerido',
        },
      },
      satisfactoryPoints: {
        label: 'Puntos',
        placeholder: 'Puntos para pasar de fase',
        rules: {
          required: 'Puntos es requerido',
          max: 'Puntos no debe ser mayor a {{points}}',
        },
      },
      phase: {
        label: 'Phase',
        placeholder: 'Fase de la actividad',
        rules: {
          required: 'Fase es requerido',
        },
      },
      pictogramSentence: {
        label: 'Solución de la actividad',
        placeholderSearch: 'Buscar pictogramas por nombre...',
        labelPreviewSentence: 'Oración solución',
        captionSelectPictograms:
          '<bold>Selecciona</bold> los pictogramas haciendo <bold>clic</bold> en ellos para construir la <bold>solución</bold>. La oración aparecerá en la parte <bold>inferior</bold>.',
        captionPreviewSentence:
          'Reorganiza los pictogramas a tu gusto, moviéndolos en el orden que prefieras.',
        captionOverlayPictogramDesktop:
          '*Si el nombre del pictograma no se ve completo, pasa el cursor sobre el icono para ver el nombre completo.',
        captionOverlayPictogramMobile:
          '*Si el nombre del pictograma no se ve completo, mantén presionado el icono para ver el nombre completo.',
        rules: {
          required: 'Solución es requerido',
          min: 'Debe seleccionar al menos un pictograma',
          max: 'La solución no debe contener más de {{limit}} pictogramas',
        },
      },
    },
    actions: {
      detail: {
        modal: {
          title: 'Detalle actividad',
        },
      },
      delete: {
        modal: {
          title: 'Eliminar actividad',
          description:
            '¿Estás seguro/a de que deseas elminar la actividad <StrongValue />?',
        },
      },
      form: {
        modal: {
          title_create: 'Crear actividad',
          ok_text_create: 'Guardar',
          title_edit: 'Editar actividad',
          ok_text_edit: 'Editar',
        },
      },
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
      title: 'Roles',
      caption: 'Listado de todos los Roles.',
      searchPlaceholder: 'Buscar rol, permiso...',
      columns: {
        name: 'Nombre',
        permission: 'Permisos',
      },
    },
    catalog: {
      patient: 'Paciente',
      tutor: 'Tutor',
      therapist: 'Terapeuta',
      admin: 'Admin',
    },
  },
  Gender: {
    catalog: {
      masculine: 'Masculino',
      female: 'Femenino',
    },
  },
  Phase: {
    index: {
      title: 'Fases',
      caption: 'Lista de todos las fases.',
      searchPlaceholder: 'Buscar fases...',
      columns: {
        name: 'Nombre',
        description: 'Descripción',
        scoreActivities: 'Act. requeridas',
      },
    },
    actions: {
      edit: {
        modal: {
          title: 'Editar Fase',
          ok_text: 'editar',
        },
      },
    },
    fields: {
      name: {
        label: 'Nombre',
        placeholder: 'Ingrese el nombre de la fase',
        rules: {
          required: 'Nombre es requerido',
        },
      },
      description: {
        label: 'Descripción',
        placeholder: 'Ingrese la description de la fase',
        rules: {
          required: 'Descripción es requerido',
        },
      },
      scoreActivities: {
        label: 'Act. requeridas',
        placeholder: 'Ingrese la cantidad de actividades requeridas',
        rules: {
          required: 'Act. requeridas es requerido',
          integer: 'Act. requeridas debe ser un entero positivo',
        },
      },
    },
  },
  Grades: {
    catalog: {
      grade_1: 'Grado 1',
      grade_2: 'Grado 2',
      grade_3: 'Grado 3',
    },
  },
  menu: {
    routes: {
      dashboard: 'Dashboard',
      users: 'Usuarios',
      all: 'Todos',
      patients: 'Pacientes',
      tutors: 'Tutores',
      therapists: 'Tepeutas',
      methodology: 'Metodología',
      pictograms: 'Pictogramas',
      activities: 'Actividades',
      phases: 'Fases',
      setting: 'Configuración',
      achievements: 'Logros',
      categories: 'Categorias',
      roles: 'Roles',
      logout: 'Cerrar sesión',
    },
  },
  Actions: {
    edit: 'Editar',
    delete: 'Deshabilitar',
    modebn: 'Modo B/N',
    Upload_phase: 'Avanzar de fase',
    view_detail: 'Ver detalle',
    assign_patient: 'Asignar paciente',
  },
  partials: {
    go_back_to_list: 'Volver a la lista',
  },
  components: {
    dragger: {
      title_bold: 'Haz clic para subir',
      title_regular: 'o arrastra y suelta',
      caption: 'SVG, PNG or JPG (máx. 800x400px)',
    },
    table: {
      page: 'página',
      range_results: '{{rangeFrom}}-{{rangeTo}} de {{total}} elementos',
      single_results: 'Mostrando {{total}} elementos',
    },
    popupActions: {
      show: {
        label: 'Ver detalle',
      },
      edit: {
        label: 'Editar',
      },
      assign_patients: {
        label: 'Asignar pacientes',
      },
      ediAssigments: {
        label: 'Editar asignaciones',
      },
      delete: {
        label: 'Deshabilitar',
      },
    },
    CardProfile: {
      years_old: 'años',
    },
  },
  Copy: '© {{year}} Hope. Todos los derechos reservados',
  Status: {
    result: {
      code_404:
        'Lo sentimos, pero la página que intentaste visitar no está disponible en este momento. Por favor, verifica la dirección e inténtalo de nuevo más tarde.',
    },
    unexpected_error: 'An unexpected error occurred. Please try again later.',
  },
  common: {
    form: {
      fields: {
        username: {
          rules: {
            pattern: 'El usuario debe contener entre 3 y 16 carácteres',
          },
        },
        email: {
          rules: {
            pattern: 'El correo electrónico no es válido',
          },
        },
        identification: {
          rules: {
            pattern:
              'El formato de número de identificación no es válido. Debe tener el siguiente formato: xxx-xxxxx-xxxxZ',
          },
        },
        phone: {
          rules: {
            base: 'El formato no es válido:',
            length: 'debe tener 8 dígitos en total',
            numeric: 'no debe contener letras ni carácteres especiales',
          },
        },
        mobile: {
          rules: {
            startWith: 'debe iniciar con un número entre 5 y 8',
          },
        },
        landline: {
          rules: {
            startWith: 'debe iniciar con el número 2',
          },
        },
      },
      rules: {
        max_len: '{{field}} debe tener como máximo {{limit}} caracteres',
        whitespace: 'No se permiten espacios en blancos',
        only_spaces_between_words: 'Solo se permite un espacio entre palabras',
      },
    },
    not_asignment: 'Sin asignar',
    uncategorized: 'Sin categoría',
    modals: {
      delete: {
        title: 'Deshabilitar {{entity}}',
        description:
          '¿Estás seguro/a de que deseas deshabilitar al {{entity}} {{value}}?',
        caption: 'Por favor, confirma tu decisión para continuar',
        btn_cancel: 'Cancelar',
        btn_ok: 'Deshabilitar',
      },
    },
  },
  feedback: {
    common: {
      id_not_provided: 'Id no proporcionado',
      unknow_error: 'Error desconocido',
      not_changed_detect: 'No se detectaron cambios',
    },
    message_error: {
      title: '¡Lo sentimos, algo ha salido mal!',
      subtitle: 'Ha ocurrido un error inesperado',
    },
  },
} as const;

export default es;
