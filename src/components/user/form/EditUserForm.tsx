'use client';

import { Show } from '@/components/Show';
import PersonDataGeneralForm from '@/components/user/form/PersonDataGeneralForm';
import PersonDataSpecificForm from '@/components/user/form/PersonDataSpecificForm';
import UserDataForm from '@/components/user/form/UserDataForm';
import useStepFormUser from '@/hooks/useStepFormUser';
import { useOverlayStore } from '@/lib/store';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import { FormCreateUserError, FormCreateUserSchema } from '@/models/schema';
import { CreateUserHelper, CurrentRoleType } from '@/services/user/helpers';
import styles from '@/styles/modules/user.module.scss';
import { deepEqual, removeKeysFromObject } from '@/utils/objects';
import { Alert, Button, Divider, Flex, Typography, message } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

export default function EditUserForm() {
  const { t } = useTranslation();
  const { setLoading } = useOverlayStore();

  const {
    isAdminRoleSelected,
    currentRoleSelected,
    fields,
    messageErrorForm,
    messageErrorDetail,
    setErrors,
    setFields,
    setMessageErrorForm,
    setMessageErrorDetail,
  } = useFormCreateUserStore();

  const {
    formGeneral,
    formSpecific,
    formUser,

    applyErrors,
    validateForm,
    getCurrentValues,
  } = useStepFormUser();

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);
      setMessageErrorForm('');
      setMessageErrorDetail('');
      setErrors(undefined);

      const isFormValidated = await validateForm();

      if (!isFormValidated) {
        return;
      }

      const values = getCurrentValues();

      const res = await CreateUserHelper(
        values,
        currentRoleSelected.name as CurrentRoleType,
        true,
        fields.id,
      );

      if (res.error && res.statusCode !== 201) {
        if (
          res.validationErrors &&
          Object.keys(res.validationErrors).length > 0
        ) {
          applyErrors(res.validationErrors as FormCreateUserError);
        }

        setMessageErrorForm(res.message);
        setLoading(false);

        return;
      }

      setFields(
        FormCreateUserSchema.parse({
          ...fields,
          ...values,
        }),
      );

      message.success(res.message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    setLoading,
    setErrors,
    validateForm,
    getCurrentValues,
    currentRoleSelected.name,
    fields,
    setFields,
    applyErrors,
  ]);

  const validateIfFormHasChanged = useCallback(() => {
    let values = getCurrentValues();
    let fieldsFiltered = undefined;
    let keyToDelete: (keyof typeof fields)[] = ['id', 'image'];

    fieldsFiltered = removeKeysFromObject(fields, keyToDelete);

    if (deepEqual(values, fieldsFiltered)) {
      message.warning(t('User.form.feedback.not_changed_detect'));
      return;
    }
    handleSubmit();
  }, [fields, getCurrentValues, handleSubmit, t]);

  return (
    <Flex vertical className={`${styles.wrapper_edit_user}`} gap={10}>
      {messageErrorForm && (
        <Alert
          message={messageErrorForm}
          description={messageErrorDetail}
          banner
          type="error"
        />
      )}
      <Flex vertical gap={10} className={styles.edit_user_content}>
        <Title level={3} className={styles.edit_user_title_sections}>
          {t('User.form.edit.title_data_user')}
        </Title>
        <UserDataForm form={formUser} gutterRow={[20, 0]} spanCol={12} />

        <Show>
          <Show.When isTrue={!isAdminRoleSelected}>
            <Divider type="horizontal" className={styles.section_divider} />
            <Title level={3} className={styles.edit_user_title_sections}>
              {t('User.form.edit.title_data_general')}
            </Title>
            <PersonDataGeneralForm
              form={formGeneral}
              gutterRow={[20, 0]}
              spanCol={12}
            />
            <Divider type="horizontal" className={styles.section_divider} />
            <Title level={3} className={styles.edit_user_title_sections}>
              {t('User.form.edit.title_data_specific', {
                personType: currentRoleSelected?.name?.toLowerCase(),
              })}
            </Title>
            <PersonDataSpecificForm
              form={formSpecific}
              gutterRow={[20, 0]}
              spanCol={12}
              spanColMedium={8}
            />
          </Show.When>
        </Show>
      </Flex>
      <Flex justify="flex-end" className={styles.steps_button_actions} gap={10}>
        <Button type="default" className={styles.button}>
          {t('User.form.edit.cancel_button')}
        </Button>
        <Button
          type="primary"
          className={styles.button}
          onClick={validateIfFormHasChanged}
        >
          {t('User.form.edit.edit_button')}
        </Button>
      </Flex>
    </Flex>
  );
}
