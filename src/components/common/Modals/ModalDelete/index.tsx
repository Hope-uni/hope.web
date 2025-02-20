import styles from '@/styles/modules/partials.module.scss';
import { Button, Modal } from 'antd';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsXLg } from 'react-icons/bs';

interface Props {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  open: boolean;
  loading: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onOk?: () => void;
}

const ModalDelete = ({
  title,
  description,
  open,
  loading,
  setOpen,
  onOk,
}: Props) => {
  const { t } = useTranslation();

  const handleOnCancel = useCallback(() => {
    if (!loading) {
      setOpen(false);
    }
  }, [loading, setOpen]);

  return (
    <Modal
      open={open}
      centered
      onCancel={handleOnCancel}
      wrapClassName="primary"
      title={null}
      footer={null}
      closeIcon={null}
      destroyOnClose
    >
      <div className={styles.modal_delete_content}>
        <Button
          type="link"
          onClick={handleOnCancel}
          disabled={loading}
          className={styles.modal_delete_close_icon}
        >
          <BsXLg color="#FF4E00" size={18} />
        </Button>
        <div className={styles.modal_delete_header}>
          <p className={styles.modal_delete_header_title}>{title}</p>
        </div>
        <div className={styles.modal_delete_body}>
          <p className={styles.modal_delete_body_description}>{description}</p>
          <p className={styles.modal_delete_body_caption}>
            {t('common.modals.delete.caption')}
          </p>
        </div>
        <div className={styles.modal_delete_footer}>
          <Button
            type="default"
            onClick={handleOnCancel}
            disabled={loading}
            className={styles.modal_delete_footer_btn_cancel}
          >
            <span>{t('common.modals.delete.btn_cancel')}</span>
          </Button>
          <Button
            type="default"
            onClick={onOk}
            loading={loading}
            className={styles.modal_delete_footer_btn_delete}
          >
            {t('common.modals.delete.btn_ok')}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ModalDelete;
