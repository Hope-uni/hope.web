import dayjs from 'dayjs';

export const formCreatePatientDemo = {
  general: [
    {
      name: 'firstName',
      value: 'Pepe',
    },
    {
      name: 'surname',
      value: 'Ramos',
    },
    {
      name: 'gender',
      value: 'Masculino',
    },
    {
      name: 'address',
      value: 'Managua',
    },
  ],
  specific: [
    {
      name: 'birthday',
      value: dayjs('2018-10-17'),
    },
    {
      name: 'teaDegreeId',
      value: 1,
    },
    {
      name: 'phaseId',
      value: 1,
    },
    {
      name: 'tutorId',
      value: 7,
    },
  ],
  user: [
    {
      name: 'username',
      value: 'pepe',
    },
    {
      name: 'email',
      value: 'pepe@hope.com',
    },
  ],
};
