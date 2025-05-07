import { UPLOAD_FILE_STATUS } from '@/constants/Upload';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { GetProp, Upload, UploadFile, UploadProps } from 'antd';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

export default function useUploadFile() {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const normFile = (e: any) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const getBase64 = (img: Blob, callback: any) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handleBeforeUpload = (file: UploadFile) => {
    const isValidSize = file.size ? file.size / 1024 / 1024 < 1 : false;
    if (!isValidSize) {
      openNotification.error({
        message: t('components.dragger.errors.title'),
        description: t('components.dragger.errors.max_weight'),
      });
    }

    return isValidSize || Upload.LIST_IGNORE;
  };

  const handleOnPreview = useCallback(
    async (file: UploadFile) => {
      let src = file.url as string;
      if (!src) {
        src = await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(file.originFileObj as FileType);
          reader.onload = () => resolve(reader.result as string);
        });
      }
      setPreviewImage(src);
    },
    [setPreviewImage],
  );

  const handleOnChange: UploadProps['onChange'] = (info) => {
    try {
      let newFileList = [...info.fileList];
      newFileList = newFileList.slice(-1);

      if (info.file.status === UPLOAD_FILE_STATUS.REMOVED) {
        return;
      }

      if (info.file.status === UPLOAD_FILE_STATUS.UPLOADING) {
        return;
      }

      if (info.file.originFileObj) {
        getBase64(info.file.originFileObj, (url: any) => {
          setPreviewImage(url);
        });
      }

      return;
    } catch (error) {
      throw error;
    }
  };

  const handleOnRemove = useCallback((file: UploadFile) => {
    setPreviewImage(null);
  }, []);

  return {
    previewImage,
    normFile,
    handleBeforeUpload,
    handleOnPreview,
    handleOnChange,
    handleOnRemove,
  };
}
