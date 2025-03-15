import { Button, Modal, ModalProps } from 'antd';
import { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsXLg } from 'react-icons/bs';

interface Props extends ModalProps {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  loading?: boolean;
  onOpen?: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onClose?: () => void;
}

const HModal = ({
  description,
  loading = false,
  onOpen,
  onOk,
  children,
  onClose,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const handleOnCancel = useCallback(() => {
    if (!loading) {
      if (onOpen) {
        onOpen(false);
      }
      if (onClose) {
        onClose();
      }
    }
  }, [loading, onClose, onOpen]);

  return (
    <Modal
      centered
      onCancel={handleOnCancel}
      wrapClassName="primary"
      closeIcon={null}
      destroyOnClose
      cancelButtonProps={{
        type: 'default',
        onClick: handleOnCancel,
        disabled: loading,
        className: 'primary_modal_footer_btn_cancel',
      }}
      cancelText={t('common.modals.delete.btn_cancel')}
      {...props}
    >
      <div className="primary_modal_content">
        <Button
          type="link"
          onClick={handleOnCancel}
          disabled={loading}
          className="primary_modal_close_icon"
        >
          <BsXLg color="#FF4E00" size={18} />
        </Button>
        {children}
      </div>
    </Modal>
  );
};

export default HModal;
