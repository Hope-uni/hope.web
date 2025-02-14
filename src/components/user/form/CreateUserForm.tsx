'use client';

import { Show } from '@/components/Show';
import useStepFormUser from '@/hooks/useStepFormUser';
import { useFormCreateUserStore } from '@/lib/store/formCreateUser';
import {
  CreateUserSteps,
  FormCreateUser,
  FormCreateUserError,
} from '@/models/schema';
import { CreateUserHelper, CurrentRoleType } from '@/services/user/helpers';
import styles from '@/styles/modules/user.module.scss';
import { Alert, Button, Divider, Flex, Steps, Typography, message } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { Text, Title } = Typography;

export default function CreateUserForm() {
  const { t } = useTranslation();
  const [loadingForm, setLoadingForm] = useState(false);
  const {
    fields,
    currentRoleSelected,
    messageErrorForm,
    messageErrorDetail,
    setFields,
    setErrors,
    setMessageErrorForm,
    setMessageErrorDetail,
  } = useFormCreateUserStore();

  const {
    stepsForm,
    current,
    currentIndex,
    setCurrentIndex,
    cleanForm,
    getCurrentInstanceForm,
    applyErrors,
  } = useStepFormUser();

  const handleSubmit = useCallback(
    async (values: FormCreateUser) => {
      try {
        setLoadingForm(true);
        setMessageErrorForm('');
        setMessageErrorDetail('');
        setErrors(undefined);

        const res = await CreateUserHelper(
          values,
          currentRoleSelected.name as CurrentRoleType,
        );

        if (res.error && res.statusCode !== 201) {
          if (
            res.validationErrors &&
            Object.keys(res.validationErrors).length > 0
          ) {
            applyErrors(res.validationErrors as FormCreateUserError);
          }

          setMessageErrorForm(res?.message);
          setLoadingForm(false);
          return;
        }

        cleanForm();
        message.success(res.message);
        setLoadingForm(false);
      } catch (error) {
        setLoadingForm(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setErrors, currentRoleSelected.name, cleanForm, applyErrors],
  );

  const handleNext = useCallback(
    async ({ isLastStep = false } = {}) => {
      const currentInstanceForm = getCurrentInstanceForm();

      if (!currentInstanceForm) return;

      const validate = await currentInstanceForm.validateFields();

      if (!validate.errorFields) {
        if (isLastStep) {
          handleSubmit({
            ...fields,
            ...currentInstanceForm.getFieldsValue(),
          });
          return;
        }
        setFields({
          ...fields,
          ...currentInstanceForm.getFieldsValue(),
        });
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    },
    [getCurrentInstanceForm, setFields, fields, setCurrentIndex, handleSubmit],
  );

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  return (
    <>
      {messageErrorForm && (
        <Alert
          message={messageErrorForm}
          description={messageErrorDetail}
          banner
          type="error"
        />
      )}
      <div className={`${styles.wrapper_steps_create_user} steps_create_user`}>
        <Steps
          className="customSteps"
          direction="vertical"
          current={currentIndex}
          items={stepsForm.items.map((item) => CreateUserSteps.parse(item))}
        />
        <Divider type="vertical" className={styles.steps_divider} />
        <Flex vertical className={styles.steps_content}>
          <Flex vertical gap={10}>
            <Flex
              className={styles.steps_content_title}
              align="flex-start"
              gap={10}
            >
              <Text className={styles.steps_current_step}>
                {current?.step}
                <span className={styles.total_steps}>
                  /{stepsForm.items.length}
                </span>
              </Text>
              <Title className={styles.steps_current_title}>
                {current?.titleForm}
              </Title>
            </Flex>
            {current && stepsForm.forms[current?.step]}
          </Flex>
          <Flex
            justify="flex-end"
            className={styles.steps_button_actions}
            gap={10}
          >
            <Show>
              <Show.When isTrue={currentIndex > 0}>
                <Button
                  type="default"
                  className={styles.button}
                  onClick={handlePrev}
                >
                  {t('User.form.create.prev_button')}
                </Button>
              </Show.When>
              <Show.When isTrue={currentIndex < stepsForm.items.length - 1}>
                <Button
                  type="primary"
                  className={styles.button}
                  onClick={() => handleNext()}
                >
                  {t('User.form.create.next_button')}
                </Button>
              </Show.When>
              <Show.When isTrue={currentIndex === stepsForm.items.length - 1}>
                <Button
                  type="primary"
                  className={styles.button}
                  onClick={() =>
                    handleNext({
                      isLastStep: true,
                    })
                  }
                  loading={loadingForm}
                >
                  {t('User.form.create.submit_button')}
                </Button>
              </Show.When>
            </Show>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
