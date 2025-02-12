import PersonDataGeneralForm from '@/components/user/form/PersonDataGeneralForm';
import PersonDataSpecificForm from '@/components/user/form/PersonDataSpecificForm';
import UserDataForm from '@/components/user/form/UserDataForm';
import { StepFormInterface } from '@/constants/Forms';
import { ROLES } from '@/constants/Role';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import { FormCreateUser, FormCreateUserError } from '@/models/schema';
import { ParseToErrorAntd } from '@/services/user/helpers';
import { getStepsForm } from '@/utils/createUserForm';
import { validateRole } from '@/utils/session';
import { Form } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';

const initialStep = 0;

const useStepFormUser = () => {
  const {
    initCurrentRole,
    isAdminRoleSelected,
    currentRoleSelected,
    roleList,
    errors,
    messageErrorForm,
    messageErrorDetail,
    setCurrentRoleSelected,
    setIsAdminRoleSelected,
    setFields,
    setErrors,
    setMessageErrorForm,
    setMessageErrorDetail,
  } = useFormCreateUserStore();

  const [formGeneral] = Form.useForm();
  const [formSpecific] = Form.useForm();
  const [formUser] = Form.useForm();

  const roleSelected = Form.useWatch('roles', formGeneral);
  const identificationNumber = Form.useWatch(
    'identificationNumber',
    formSpecific,
  );
  const username = Form.useWatch('username', formUser);

  const forms = useMemo(
    () => ({
      '1': <PersonDataGeneralForm form={formGeneral} />,
      '2': <PersonDataSpecificForm form={formSpecific} />,
      '3': <UserDataForm form={formUser} />,
    }),
    [formGeneral, formSpecific, formUser],
  );

  const stepsForm = useMemo(() => {
    return getStepsForm(isAdminRoleSelected, forms);
  }, [isAdminRoleSelected, forms]);

  const [currentIndex, setCurrentIndex] = useState(initialStep);
  const [current, setCurrent] = useState<StepFormInterface>(
    stepsForm.items[initialStep],
  );

  useEffect(() => {
    formGeneral.setFieldValue('roles', initCurrentRole);
  }, [formGeneral, initCurrentRole]);

  useEffect(() => {
    const currenRoleData = roleList.find(
      (role) => role.id === Number(roleSelected),
    );

    if (currenRoleData) {
      setCurrentRoleSelected(currenRoleData);
    }
  }, [roleSelected, roleList, setCurrentRoleSelected]);

  useEffect(() => {
    const isAdmin =
      validateRole(currentRoleSelected.name, ROLES.ADMIN) || false;
    setIsAdminRoleSelected(isAdmin);
  }, [currentRoleSelected, setIsAdminRoleSelected]);

  useEffect(() => {
    setCurrent(stepsForm.items[currentIndex]);
  }, [stepsForm.items, currentIndex]);

  useEffect(() => {
    console.log(errors, 'errors');
    console.log(username, 'username');

    if (errors?.person && errors?.person?.length > 0 && identificationNumber) {
      formSpecific.setFields(errors?.person);
    }

    if (errors?.user && errors?.user?.length > 0 && username) {
      console.log(formUser.getFieldsValue());
      formUser.setFields(errors?.user);
    }
  }, [
    currentIndex,
    errors,
    formSpecific,
    formUser,
    identificationNumber,
    username,
  ]);

  const cleanForm = useCallback(() => {
    formGeneral.resetFields();
    formSpecific.resetFields();
    formUser.resetFields();
    setFields({} as FormCreateUser);
    setCurrentIndex(initialStep);
  }, [formGeneral, formSpecific, formUser, setFields]);

  const getCurrentInstanceForm = useCallback(() => {
    const instancesForm = isAdminRoleSelected
      ? [formGeneral, formUser]
      : [formGeneral, formSpecific, formUser];
    return instancesForm[currentIndex];
  }, [formGeneral, formSpecific, formUser, isAdminRoleSelected, currentIndex]);

  const applyErrors = useCallback(
    (validationErrors: FormCreateUserError) => {
      console.log(validationErrors, 'validationErrors');

      const { username, email, ...userSpecificErrors } = validationErrors;

      const errorsFormSpecific = ParseToErrorAntd(userSpecificErrors);
      const errorsFormUser = ParseToErrorAntd({ username, email });

      setErrors({
        person: errorsFormSpecific,
        user: errorsFormUser,
      });

      if (errorsFormSpecific.length > 0) {
        setCurrentIndex(1);
      } else {
        setCurrentIndex(stepsForm.items.length - 1);
      }
    },
    [setCurrentIndex, setErrors, stepsForm.items.length],
  );

  const validateForm = useCallback(async () => {
    const validateFormGeneral = await formGeneral.validateFields();
    const validateFormSpecific = await formSpecific.validateFields();
    const validateFormUser = await formUser.validateFields();

    if (
      !validateFormGeneral.errorFields &&
      !validateFormSpecific.errorFields &&
      !validateFormUser.errorFields
    ) {
      return true;
    }

    return false;
  }, [formGeneral, formSpecific, formUser]);

  const getCurrentValues = useCallback(() => {
    return {
      ...formGeneral.getFieldsValue(),
      ...formSpecific.getFieldsValue(),
      ...formUser.getFieldsValue(),
    };
  }, [formGeneral, formSpecific, formUser]);

  return {
    formGeneral,
    formSpecific,
    formUser,
    roleSelected,
    stepsForm,
    current,
    currentIndex,
    setCurrentIndex,
    cleanForm,
    getCurrentInstanceForm,
    applyErrors,
    validateForm,
    getCurrentValues,
  };
};

export default useStepFormUser;
