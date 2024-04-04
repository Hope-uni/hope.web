'use client';

import PersonDataGeneralForm from '@/components/user/form/PersonDataGeneralForm';
import PersonDataSpecificForm from '@/components/user/form/PersonDataSpecificForm';
import UserDataForm from '@/components/user/form/UserDataForm';
import styles from '@/styles/modules/user.module.scss';
import { Button, Divider, Flex, Typography, message } from 'antd';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const { Title } = Typography;

export default function EditUserForm() {
  const t = useTranslations('_.User');
  const [currentRole, setCurrentRole] = useState<string>('therapist');

  const handleSubmit = () => {
    message.success('Processing complete!');
  };

  return (
    <Flex vertical className={`${styles.wrapper_edit_user}`} gap={10}>
      <Flex vertical gap={10} className={styles.edit_user_content}>
        <Title level={3} className={styles.edit_user_title_sections}>
          {t('form.edit.title_data_user')}
        </Title>
        <UserDataForm isEdit gutterRow={[20, 0]} spanCol={12} />
        <Divider type="horizontal" className={styles.section_divider} />
        <Title level={3} className={styles.edit_user_title_sections}>
          {t('form.edit.title_data_general')}
        </Title>
        <PersonDataGeneralForm
          setCurrentRole={setCurrentRole}
          isEdit
          gutterRow={[20, 0]}
          spanCol={12}
        />
        <Divider type="horizontal" className={styles.section_divider} />
        <Title level={3} className={styles.edit_user_title_sections}>
          {t('form.edit.title_data_specific', { personType: currentRole })}
        </Title>
        <PersonDataSpecificForm
          selectedRole={currentRole}
          isEdit
          gutterRow={[20, 0]}
          spanCol={12}
          spanColMedium={8}
        />
      </Flex>
      <Flex justify="flex-end" className={styles.steps_button_actions} gap={10}>
        <Button type="default" className={styles.button} onClick={handleSubmit}>
          {t('form.edit.cancel_button')}
        </Button>
        <Button type="primary" className={styles.button} onClick={handleSubmit}>
          {t('form.edit.edit_button')}
        </Button>
      </Flex>
    </Flex>
  );
}
