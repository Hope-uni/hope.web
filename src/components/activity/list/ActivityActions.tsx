import ActivityForm from '@/components/activity/form';
import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import PopupActions from '@/components/table/PopupActions';
import { RoutesName } from '@/constants';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useOverlayStore } from '@/lib/store';
import { FormActivityErrors, SingleActivity } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  CreateActivityService,
  DeleteActivityService,
} from '@/services/activity/activity.service';
import { ParseToErrorAntd } from '@/services/user/helpers';
import styles from '@/styles/modules/partials.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Form } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { BsPlusLg } from 'react-icons/bs';

interface Props {
  activity?: SingleActivity;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const ActivityActions = ({
  activity,
  actions = ['show', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const router = useRouter();
  const [form] = Form.useForm();
  const [loadingForm, setLoadingForm] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const { setLoading } = useOverlayStore();

  const queryClient = useQueryClient();

  const handleOpenForm = useCallback(() => {
    setOpenForm(true);
  }, []);

  const applyErrors = useCallback(
    (validationErrors: FormActivityErrors) => {
      const errors = ParseToErrorAntd(validationErrors);
      if (errors.length > 0) {
        form.setFields(errors);
        form.scrollToField(errors[0].name, {
          behavior: 'smooth',
          block: 'center',
        });
      }
    },
    [form],
  );

  const handleSubmit = useCallback(async () => {
    try {
      setLoadingForm(true);

      const validateFormUser = await form.validateFields();

      if (validateFormUser.errorFields) {
        return;
      }

      const values = form.getFieldsValue();

      const res = await CreateActivityService(values);

      if (res.error && res.statusCode !== 201) {
        if (
          res.validationErrors &&
          Object.keys(res.validationErrors).length > 0
        ) {
          applyErrors(res.validationErrors as FormActivityErrors);
        }
        setLoadingForm(false);
        return;
      }

      openNotification.success({
        description: res.message,
      });

      setLoadingForm(false);
      setOpenForm(false);
      form.resetFields();
    } catch (error) {
      setLoadingForm(false);
    }
  }, [form, applyErrors, openNotification]);

  const handleDelete = useCallback(async () => {
    return await DeleteActivityService(String(activity?.id));
  }, [activity?.id]);

  const handleShow = useCallback(async () => {
    const cachedData = queryClient.getQueryData([
      'find-activity-by-id',
      activity?.id,
    ]);

    if (!cachedData) {
      setLoading(true);
    }

    router.push(`${RoutesName.activity.index}/${activity?.id}`, {
      scroll: false,
    });
  }, [activity?.id, queryClient, router, setLoading]);

  return (
    <>
      {activity && (
        <Show>
          <Show.When isTrue={renderMode === 'popup'}>
            <PopupActions
              id={activity.id}
              actions={actions}
              route="activities"
              classWrapper={classWrapper}
              renderMode={renderMode}
              onShow={handleShow}
              onDelete={handleDelete}
              modalDeleteTitle={t('Activity.actions.delete.modal.title')}
              modalDeleteDescription={
                <Trans
                  i18nKey="Activity.actions.delete.modal.description"
                  components={{
                    StrongValue: <strong>{activity.name}</strong>,
                  }}
                />
              }
            />
          </Show.When>
        </Show>
      )}
      <Show>
        <Show.When isTrue={renderMode === 'add_activity'}>
          <Button
            type="default"
            icon={<BsPlusLg />}
            className={styles.btn_add_content}
            onClick={handleOpenForm}
          >
            <span className={styles.btn_add_content_label}>
              {t('Activity.index.createButton')}
            </span>
          </Button>
        </Show.When>
      </Show>

      {/* form activity modal */}
      <HModal
        open={openForm}
        loading={loadingForm}
        onOpen={setOpenForm}
        width={800}
        okText={t('Activity.actions.form.modal.ok_text_create')}
        okButtonProps={{
          type: 'primary',
          onClick: handleSubmit,
          loading: loadingForm,
          className: styles.footer_btn_confirm,
        }}
        title={t('Activity.actions.form.modal.title_create')}
      >
        <ActivityForm form={form} />
      </HModal>
    </>
  );
};

export default ActivityActions;
