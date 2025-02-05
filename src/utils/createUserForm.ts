import { stepsData } from '@/constants/Forms/CreateUser';

export interface FormsType {
  '1'?: JSX.Element;
  '2'?: JSX.Element;
  '3'?: JSX.Element;
}

export const getStepsForm = (isAdmin: boolean, forms: FormsType) => {
  let stepItems = stepsData;
  let stepForms = forms;

  if (isAdmin) {
    stepForms = {
      '1': forms['1'],
      '2': forms['3'],
    };

    stepItems = [
      stepsData[0],
      {
        ...stepsData[2],
        step: '2',
      },
    ];
  }

  return {
    items: stepItems,
    forms: stepForms,
  };
};
