import { UserFormFieldNames } from '@/constants/Forms';
import { I_VALIDATION_ERRORS } from '@/models/types';
import { ErrorAntd } from '@/services/user/helpers';

type GroupedAntdFormErrors = Record<
  keyof typeof UserFormFieldNames,
  ErrorAntd[]
>;

export const getErrorsAntdByStep = (
  validationErrors: I_VALIDATION_ERRORS,
): GroupedAntdFormErrors => {
  const groupedErrors: GroupedAntdFormErrors = {
    general: [],
    specific: [],
    user: [],
  };

  for (const [key, message] of Object.entries(validationErrors)) {
    for (const step in UserFormFieldNames) {
      const stepKey = step as keyof typeof UserFormFieldNames;
      if (UserFormFieldNames[stepKey].includes(key)) {
        groupedErrors[stepKey].push({
          name: key,
          errors: [message],
        });
        break;
      }
    }
  }

  return groupedErrors;
};
