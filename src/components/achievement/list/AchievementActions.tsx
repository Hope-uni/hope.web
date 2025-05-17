import AchievementForm from '@/components/achievement/form/index';
import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import { PopupActions } from '@/components/table/PopupActions';
import { QueryKeys } from '@/constants';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useInvalidateQueries from '@/hooks/useInvalidateQueries';
import { useTableStore } from '@/lib/store/table';
import { Achievement, FormAchievementErrors } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CreateAchievementService,
  DeleteAchievementService,
  EditAchievementService,
} from '@/services/achievements/achievements.service';
import { ParseToErrorAntd } from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import { deepEqual, removeKeysFromObject } from '@/utils/objects';
import { Button, Form } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BsPlusLg } from 'react-icons/bs';

interface Props {
  achievement?: Achievement;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const AchievementActions = ({
  achievement,
  actions = ['edit', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();
  const { paginationTable } = useTableStore();
  const { invalidateQueries, removeQueries } = useInvalidateQueries();
  const { openNotification } = useOpenNotification();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (openForm && isEdit) {
      form?.setFieldsValue({
        ...achievement,
        imageFile: achievement?.imageUrl,
      });
    }
  }, [form, openForm, achievement, isEdit]);

  const handleOpenEdit = useCallback(() => {
    setIsEdit(true);
    setOpenForm(true);
  }, []);

  const handleOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const applyErrors = useCallback(
    (validationErrors: FormAchievementErrors) => {
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

      if (isEdit && achievement) {
        res = await EditAchievementService(values, achievement.id);
      } else {
        res = await CreateAchievementService(values);
      }

      if (!res) {
        return;
      }

      if (res.error && res.statusCode !== 201) {
        if (
          res.validationErrors &&
          Object.keys(res.validationErrors).length > 0
        ) {
          applyErrors(res.validationErrors as FormAchievementErrors);
        }
        setLoading(false);
        return;
      }

      await removeQueries([
        [
          QueryKeys.Achievement.ListAchievement,
          [
            {
              paginate: {
                page: paginationTable?.page,
                size: paginationTable?.size,
              },
            },
            undefined,
          ],
        ].toString(),
      ]);

      if (isEdit) {
        await invalidateQueries([QueryKeys.User.FindByRole]);
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
  }, [
    form,
    isEdit,
    achievement,
    removeQueries,
    paginationTable?.page,
    paginationTable?.size,
    openNotification,
    applyErrors,
    invalidateQueries,
  ]);

  const validateIfFormHasChanged = useCallback(() => {
    if (achievement) {
      let values = form.getFieldsValue();
      let fieldsFiltered = undefined;
      let keyToDelete: (keyof typeof achievement)[] = ['id'];

      fieldsFiltered = removeKeysFromObject(achievement, keyToDelete);

      if (deepEqual(values, fieldsFiltered)) {
        openNotification.warning({
          description: t('feedback.common.not_changed_detect'),
        });
        return;
      }
      handleSubmit();
    }
  }, [achievement, form, handleSubmit, openNotification, t]);

  const handleDelete = useCallback(async (id: number) => {
    return await DeleteAchievementService(id);
  }, []);

  return (
    <>
      {achievement && (
        <Show>
          <Show.When isTrue={renderMode === 'popup'}>
            <PopupActions
              id={achievement?.id}
              actions={actions}
              route="achievements"
              classWrapper={classWrapper}
              queryKey={[QueryKeys.Achievement.ListAchievement]}
              onEdit={handleOpenEdit}
              onDelete={handleDelete}
              modalDeleteTitle={t('Achievement.actions.delete.modal.title')}
              modalDeleteDescription={
                <Trans
                  i18nKey="Achievement.actions.delete.modal.description"
                  components={{
                    StrongValue: <strong>{achievement?.name}</strong>,
                  }}
                />
              }
            />
          </Show.When>
        </Show>
      )}

      <Show>
        <Show.When isTrue={renderMode === 'add_achievement'}>
          <Button
            type="default"
            icon={<BsPlusLg />}
            className={styles.btn_add_content}
            onClick={handleOpenForm}
          >
            <span className={styles.btn_add_content_label}>
              {t('Achievement.index.createButton')}
            </span>
          </Button>
        </Show.When>
      </Show>

      {/* create/edit achievement modal */}
      <HModal
        open={openForm}
        loading={loading}
        onOpen={setOpenForm}
        okText={
          isEdit
            ? t('Achievement.actions.form.modal.ok_text_edit')
            : t('Achievement.actions.form.modal.ok_text_create')
        }
        okButtonProps={{
          type: 'primary',
          onClick: isEdit ? validateIfFormHasChanged : handleSubmit,
          loading: loading,
          className: styles.footer_btn_confirm,
        }}
        title={
          isEdit
            ? t('Achievement.actions.form.modal.title_edit')
            : t('Achievement.actions.form.modal.title_create')
        }
      >
        <AchievementForm form={form} />
      </HModal>
    </>
  );
};

export default AchievementActions;
