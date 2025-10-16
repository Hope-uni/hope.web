'use client';

import HModal from '@/components/common/Modals';
import GoToBack from '@/components/GoToBack';
import { HeaderContent } from '@/components/layouts/partials/HeaderContent';
import UserForm from '@/components/user/form/UserForm';
import { useFormCreateUserStore } from '@/lib/store/forms/formCreateUser';
import { Flex, Space } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styles from '@/styles/modules/partials.module.scss';
import { ExclamationCircleOutlined } from '@ant-design/icons';

export default function CreatePatientPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { hasUnsavedChanges } = useFormCreateUserStore();
  const [confirmCancelCreationModal, setConfirmCancelCreationModal] =
    useState(false);

  const handleOnGoToBack = useCallback(() => {
    router.back();
  }, [router]);

  const handleConfirmGoToBack = useCallback(() => {
    if (hasUnsavedChanges) {
      setConfirmCancelCreationModal(true);
      return;
    }
    handleOnGoToBack();
  }, [hasUnsavedChanges, handleOnGoToBack]);

  return (
    <>
      <Space direction="vertical" size={10}>
        <GoToBack onGoToBack={handleConfirmGoToBack} />
        <HeaderContent
          title={t('User.form.create.title')}
          caption={t('User.form.create.caption')}
        />
        <UserForm isEdit={false} />
        <HModal
          open={confirmCancelCreationModal}
          onOpen={setConfirmCancelCreationModal}
          okText={t('common.modals.unsavedChanges.btn_cancel')}
          cancelText={t('common.modals.unsavedChanges.btn_ok')}
          okButtonProps={{
            type: 'primary',
            onClick: () => setConfirmCancelCreationModal(false),
          }}
          cancelButtonProps={{
            type: 'default',
            onClick: handleOnGoToBack,
          }}
          title={
            <Flex gap={5}>
              <ExclamationCircleOutlined />
              {t('common.modals.unsavedChanges.title')}
            </Flex>
          }
          className={styles.modal_unsaved_changes_content}
        >
          <div className={styles.modal_unsaved_changes_body}>
            <p className={styles.modal_unsaved_changes_body_description}>
              {t('common.modals.unsavedChanges.description')}
            </p>
            <p className={styles.modal_unsaved_changes_body_caption}>
              {t('common.modals.delete.caption')}
            </p>
          </div>
        </HModal>
      </Space>
    </>
  );
}
