'use client';

import { Show } from '@/components/Show';
import PersonDataGeneralForm from '@/components/user/form/PersonDataGeneralForm';
import PersonDataSpecificForm from '@/components/user/form/PersonDataSpecificForm';
import UserDataForm from '@/components/user/form/UserDataForm';
import styles from '@/styles/modules/user.module.scss';
import { Button, Divider, Flex, Steps, Typography, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const { Text, Title } = Typography;

interface StepFormInterface {
  step: string;
  title: string;
  titleForm: string;
  description: string;
}

// este objeto va a cambiar
const stepsData: StepFormInterface[] = [
  {
    step: '1',
    title: 'Datos generales',
    titleForm: 'Información general del usuario',
    description: 'Información general',
  },
  {
    step: '2',
    title: 'Datos especificos',
    titleForm: 'Información especifica del paciente',
    description: 'Datos del paciente',
  },
  {
    step: '3',
    title: 'Usuario',
    titleForm: 'Crear usario',
    description: 'Crear usuario',
  },
];

const initialStep = 0;

export default function CreateUserForm() {
  const t = useTranslations('_.User');
  const [currentIndex, setCurrentIndex] = useState(initialStep);
  const [current, setCurrent] = useState<StepFormInterface>(
    stepsData[initialStep],
  );
  const [currentRole, setCurrentRole] = useState<string>('patient');

  useEffect(() => {
    setCurrent(stepsData[currentIndex]);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handlePrev = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const handleSubmit = () => {
    message.success('Processing complete!');
  };

  const items = stepsData.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  const forms: any = {
    '1': <PersonDataGeneralForm setCurrentRole={setCurrentRole} />,
    '2': <PersonDataSpecificForm selectedRole={currentRole} />,
    '3': <UserDataForm />,
  };

  return (
    <Flex
      className={`${styles.wrapper_steps_create_user} steps_create_user`}
      gap={10}
    >
      <Steps direction="vertical" current={currentIndex} items={items} />
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
              <span className={styles.total_steps}>/{stepsData.length}</span>
            </Text>
            <Title className={styles.steps_current_title}>
              {current?.titleForm}
            </Title>
          </Flex>
          {current && forms[current?.step]}
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
                {t('form.create.prev_button')}
              </Button>
            </Show.When>
            <Show.When isTrue={currentIndex < stepsData.length - 1}>
              <Button
                type="primary"
                className={styles.button}
                onClick={handleNext}
              >
                {t('form.create.next_button')}
              </Button>
            </Show.When>
            <Show.When isTrue={currentIndex === stepsData.length - 1}>
              <Button
                type="primary"
                className={styles.button}
                onClick={handleSubmit}
              >
                {t('form.create.submit_button')}
              </Button>
            </Show.When>
          </Show>
        </Flex>
      </Flex>
    </Flex>
  );
}
