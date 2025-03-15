import PhaseForm from '@/components/category/form';
import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import PopupActions from '@/components/table/PopupActions';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { CategoryPictogram, FormCategoryErrors } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CreateCategoryPictogramService,
  DeleteCategoryPictogramService,
  EditCategoryPictogramService,
} from '@/services/category/category.service';
import { ParseToErrorAntd } from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import { deepEqual, removeKeysFromObject } from '@/utils/objects';
import { Button, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BsPlusLg } from 'react-icons/bs';

interface Props {
  category?: CategoryPictogram;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const CategoryActions = ({
  category,
  actions = ['edit', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (openForm && isEdit) {
      form?.setFieldsValue(category);
    }
  }, [form, openForm, category, isEdit]);

  const handleOpenEdit = useCallback(() => {
    setIsEdit(true);
    setOpenForm(true);
  }, []);

  const handleOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const applyErrors = useCallback(
    (validationErrors: FormCategoryErrors) => {
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

      if (isEdit && category) {
        res = await EditCategoryPictogramService(values, String(category.id));
      } else {
        res = await CreateCategoryPictogramService(values);
      }

      if (!res) {
        return;
      }

      if (res.error && res.statusCode !== 201) {
        if (
          res.validationErrors &&
          Object.keys(res.validationErrors).length > 0
        ) {
          applyErrors(res.validationErrors as FormCategoryErrors);
        }
        setLoading(false);
        return;
      }

      openNotification.success({
        description: res.message,
      });
      setLoading(false);
      setOpenForm(false);
      form.resetFields();
    } catch (error) {
      setLoading(false);
    }
  }, [form, isEdit, category, openNotification, applyErrors]);

  const validateIfFormHasChanged = useCallback(() => {
    if (category) {
      let values = form.getFieldsValue();
      let fieldsFiltered = undefined;
      let keyToDelete: (keyof typeof category)[] = ['id'];

      fieldsFiltered = removeKeysFromObject(category, keyToDelete);

      if (deepEqual(values, fieldsFiltered)) {
        openNotification.warning({
          description: t('feedback.common.not_changed_detect'),
        });
        return;
      }
      handleSubmit();
    }
  }, [category, form, handleSubmit, openNotification, t]);

  const handleDelete = useCallback(async () => {
    return await DeleteCategoryPictogramService(String(category?.id));
  }, [category?.id]);

  return (
    <>
      {category && (
        <Show>
          <Show.When isTrue={renderMode === 'popup'}>
            <PopupActions
              id={category?.id}
              actions={actions}
              route="categories"
              classWrapper={classWrapper}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              modalDeleteTitle={t('Category.actions.delete.modal.title')}
              modalDeleteDescription={
                <Trans
                  i18nKey="Category.actions.delete.modal.description"
                  components={{
                    StrongValue: <strong>{category?.name}</strong>,
                  }}
                />
              }
            />
          </Show.When>
        </Show>
      )}
      <Show>
        <Show.When isTrue={renderMode === 'add_category'}>
          <Button
            type="default"
            icon={<BsPlusLg />}
            className={styles.btn_add_content}
            onClick={handleOpenForm}
          >
            <span className={styles.btn_add_content_label}>
              {t('Category.index.createButton')}
            </span>
          </Button>
        </Show.When>
      </Show>

      {/* edit phase modal */}
      <HModal
        open={openForm}
        loading={loading}
        onOpen={setOpenForm}
        okText={
          isEdit
            ? t('Category.actions.form.modal.ok_text_edit')
            : t('Category.actions.form.modal.ok_text_create')
        }
        okButtonProps={{
          type: 'primary',
          onClick: isEdit ? validateIfFormHasChanged : handleSubmit,
          loading: loading,
          className: styles.footer_btn_confirm,
        }}
        title={
          isEdit
            ? t('Category.actions.form.modal.title_edit')
            : t('Category.actions.form.modal.title_create')
        }
      >
        <PhaseForm form={form} />
      </HModal>
    </>
  );
};

export default CategoryActions;
