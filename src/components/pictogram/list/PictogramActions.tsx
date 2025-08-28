import HModal from '@/components/common/Modals';
import PictogramForm from '@/components/pictogram/form';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import { PopupActions } from '@/components/table/PopupActions';
import { QueryKeys } from '@/constants';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useInvalidateQueries from '@/hooks/useInvalidateQueries';
import { useValidateServiceError } from '@/hooks/useValidateServiceError';
import { FormPictogramErrors, SinglePictogram } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CreatePictogramService,
  DeletePictogramService,
  EditPictogramService,
} from '@/services/pictogram/pictogram.service';
import { ParseToErrorAntd } from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import { deepEqual, removeKeysFromObject } from '@/utils/objects';
import { Button, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BsPlusLg } from 'react-icons/bs';

interface Props {
  pictogram?: SinglePictogram;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const PictogramActions = ({
  pictogram,
  actions = ['edit', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();
  const { invalidateQueries } = useInvalidateQueries();
  const { openNotification } = useOpenNotification();
  const { handleErrorService } = useValidateServiceError();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (openForm && isEdit) {
      form?.setFieldsValue({
        ...pictogram,
        categoryId: pictogram?.category.id,
        imageFile: pictogram?.imageUrl,
      });
    }
  }, [form, openForm, pictogram, isEdit]);

  const handleOpenEdit = useCallback(() => {
    setIsEdit(true);
    setOpenForm(true);
  }, []);

  const handleOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const applyErrors = useCallback(
    (validationErrors: FormPictogramErrors) => {
      const errors = validationErrors;
      form.setFields(ParseToErrorAntd(errors));
    },
    [form],
  );

  const handleSubmit = useCallback(async () => {
    try {
      setLoading(true);

      const validateFormUser = await form.validateFields();

      if (validateFormUser.errorFields) {
        return;
      }

      const values = form.getFieldsValue();

      let res = null;

      if (isEdit && pictogram) {
        res = await EditPictogramService(values, String(pictogram.id));
      } else {
        res = await CreatePictogramService(values);
      }

      if (!res) {
        return;
      }

      if (res.error) {
        handleErrorService(res, () => {
          applyErrors(res.validationErrors as FormPictogramErrors);
        });

        setLoading(false);
        return;
      }

      await invalidateQueries([QueryKeys.Pictogram.ListPictogram]);

      openNotification.success({
        description: res.message,
      });

      setLoading(false);
      setOpenForm(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);
    }
  }, [
    form,
    isEdit,
    pictogram,
    invalidateQueries,
    openNotification,
    handleErrorService,
    applyErrors,
  ]);

  const validateIfFormHasChanged = useCallback(() => {
    if (pictogram) {
      let currentFormValues = form.getFieldsValue();

      const initialValues = {
        categoryId: pictogram.category.id,
        name: pictogram?.name,
        imageFile: pictogram?.imageUrl,
      };

      let valuesToCompare = {
        categoryId: currentFormValues.categoryId,
        name: currentFormValues?.name,
        imageFile: currentFormValues?.imageFile,
      };

      if (deepEqual(initialValues, valuesToCompare)) {
        openNotification.warning({
          description: t('feedback.common.not_changed_detect'),
        });
        return;
      }
      handleSubmit();
    }
  }, [pictogram, form, handleSubmit, openNotification, t]);

  const handleDelete = useCallback(async () => {
    return await DeletePictogramService(String(pictogram?.id));
  }, [pictogram?.id]);

  return (
    <>
      {pictogram && (
        <Show>
          <Show.When isTrue={renderMode === 'popup'}>
            <PopupActions
              id={pictogram.id}
              actions={actions}
              route="pictograms"
              classWrapper={classWrapper}
              queryKey={[QueryKeys.Pictogram.ListPictogram]}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              modalDeleteTitle={t('Pictogram.actions.delete.modal.title')}
              modalDeleteDescription={
                <Trans
                  i18nKey="Pictogram.actions.delete.modal.description"
                  components={{
                    StrongValue: <strong>{pictogram.name}</strong>,
                  }}
                />
              }
            />
          </Show.When>
        </Show>
      )}
      <Show>
        <Show.When isTrue={renderMode === 'add_pictogram'}>
          <Button
            type="default"
            icon={<BsPlusLg />}
            className={styles.btn_add_content}
            onClick={handleOpenForm}
          >
            <span className={styles.btn_add_content_label}>
              {t('Pictogram.index.createButton')}
            </span>
          </Button>
        </Show.When>
      </Show>

      {/* form pictogram modal */}
      <HModal
        open={openForm}
        loading={loading}
        onOpen={setOpenForm}
        okText={
          isEdit
            ? t('Pictogram.actions.form.modal.ok_text_edit')
            : t('Pictogram.actions.form.modal.ok_text_create')
        }
        okButtonProps={{
          type: 'primary',
          onClick: isEdit ? validateIfFormHasChanged : handleSubmit,
          loading: loading,
          className: styles.footer_btn_confirm,
        }}
        title={
          isEdit
            ? t('Pictogram.actions.form.modal.title_edit')
            : t('Pictogram.actions.form.modal.title_create')
        }
      >
        <PictogramForm form={form} />
      </HModal>
    </>
  );
};

export default PictogramActions;
