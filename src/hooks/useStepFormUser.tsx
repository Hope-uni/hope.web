import PersonDataGeneralForm from '@/components/user/form/PersonDataGeneralForm';
import PersonDataSpecificForm from '@/components/user/form/PersonDataSpecificForm';
import UserDataForm from '@/components/user/form/UserDataForm';
import { getErrorsAntdByStep } from '@/components/user/helpers';
import { StepFormInterface } from '@/constants/Forms';
import { ROLES } from '@/constants/guards';
import { useFormCreateUserStore } from '@/lib/store/forms/formCreateUser';
import { FormCreateUser, FormCreateUserError } from '@/models/schema';
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
    setHasUnsavedChanges,
    setCurrentRoleSelected,
    setIsAdminRoleSelected,
    setFields,
    setErrors,
  } = useFormCreateUserStore();

  const [formGeneral] = Form.useForm();
  const [formSpecific] = Form.useForm();
  const [formUser] = Form.useForm();

  const roleSelected = Form.useWatch('roles', formGeneral);

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

  const cleanForm = useCallback(() => {
    formGeneral.resetFields();
    formSpecific.resetFields();
    formUser.resetFields();
    setFields({} as FormCreateUser);
    setCurrentIndex(initialStep);
    setHasUnsavedChanges(false);
  }, [formGeneral, formSpecific, formUser, setFields, setHasUnsavedChanges]);

  const getCurrentInstanceForm = useCallback(() => {
    const instancesForm = isAdminRoleSelected
      ? [formGeneral, formUser]
      : [formGeneral, formSpecific, formUser];
    return instancesForm[currentIndex];
  }, [formGeneral, formSpecific, formUser, isAdminRoleSelected, currentIndex]);

  const applyErrors = useCallback(
    (validationErrors: FormCreateUserError) => {
      const formErrorsGrouped = getErrorsAntdByStep(validationErrors);
      setErrors(formErrorsGrouped);

      const errosGeneralAndSpecific = [
        ...formErrorsGrouped.general,
        ...formErrorsGrouped.specific,
      ];

      if (errosGeneralAndSpecific.length > 0) {
        if (formErrorsGrouped.general.length > 0) {
          setCurrentIndex(0);
        }

        if (formErrorsGrouped.specific.length > 0) {
          setCurrentIndex(1);
        }
      } else {
        setCurrentIndex(stepsForm.items.length - 1);
      }
    },
    [setErrors, stepsForm.items],
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
