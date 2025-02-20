import { Button, Modal, ModalProps } from 'antd';
import { Dispatch, ReactNode, SetStateAction, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsXLg } from 'react-icons/bs';

interface Props extends ModalProps {
  title?: string | JSX.Element;
  description?: string | JSX.Element;
  loading: boolean;
  onOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const HModal = ({
  description,
  loading,
  onOpen,
  onOk,
  children,
  ...props
}: Props) => {
  const { t } = useTranslation();

  const handleOnCancel = useCallback(() => {
    if (!loading) {
      onOpen(false);
    }
  }, [loading, onOpen]);

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
