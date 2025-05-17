import AssignActivityForm from '@/components/activity/form/AssignActivityForm';
import UnassignedActivityForm from '@/components/activity/form/UnassignedActivityForm';
import HModal from '@/components/common/Modals';
import { Show } from '@/components/Show';
import { RenderModeActionTypes } from '@/components/table/helpers';
import { PopupActions } from '@/components/table/PopupActions';
import { QueryKeys, RoutesName } from '@/constants';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import useActivityForm from '@/hooks/useActivityForm';
import { useOverlayStore } from '@/lib/store';
import { SingleActivity } from '@/models/schema';
import { ActionType } from '@/models/types';
import {
  AssignActivityService,
  DeleteActivityService,
} from '@/services/activity/activity.service';
import styles from '@/styles/modules/partials.module.scss';
import { Form } from 'antd';
import { useRouter } from 'next/navigation';
import { memo, useCallback, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { useShallow } from 'zustand/react/shallow';

interface Props {
  activity?: SingleActivity;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const ActivityActions = ({
  activity,
  actions = ['show', 'assign_activity', 'unassign_activity', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const router = useRouter();
  const [assignForm] = Form.useForm();
  const setLoading = useOverlayStore(useShallow((state) => state.setLoading));
  const [loadingForm, setLoadingForm] = useState(false);

  const [openAssignPatient, setOpenAssignPatient] = useState(false);
  const [openUnassignPatient, setOpenUnassignPatient] = useState(false);

  const {
    availableForActivityList,
    assignedToActivityList,
    getDetailActivityCached,
    getAvailableForActivity,
    getAssignedToActivity,
    updateQueriesAfterAssign,
    updateQueriesAfterUnassign,
  } = useActivityForm(activity?.id);

  const handleDelete = useCallback(async () => {
    return await DeleteActivityService(String(activity?.id));
  }, [activity?.id]);

  const handleShow = useCallback(async () => {
    const cachedData = getDetailActivityCached();

    if (!cachedData) {
      setLoading(true);
    }

    router.push(`${RoutesName.activity.index}/${activity?.id}`, {
      scroll: false,
    });
  }, [activity?.id, getDetailActivityCached, router, setLoading]);

  const handleAssign = useCallback(async () => {
    try {
      if (!activity?.id) {
        return;
      }

      setLoadingForm(true);

      const validateFormUser = await assignForm.validateFields();

      if (validateFormUser.errorFields) {
        return;
      }

      const values = assignForm.getFieldsValue();

      const res = await AssignActivityService({
        activityId: activity?.id,
        patients: [...values.patients],
      });

      if (res.error && res.statusCode !== 201) {
        openNotification.error({
          description: res.message,
        });
        setLoadingForm(false);
        return;
      }

      await updateQueriesAfterAssign([...values.patients]);

      openNotification.success({
        description: res.message,
      });

      setLoadingForm(false);
      setOpenAssignPatient(false);
      assignForm.resetFields();
    } catch (error) {
      setLoadingForm(false);
    }
  }, [activity?.id, assignForm, openNotification, updateQueriesAfterAssign]);

  const handleOpenAssignPatient = useCallback(async () => {
    await getAvailableForActivity();
    setOpenAssignPatient(true);
    setLoading(false);
  }, [getAvailableForActivity, setLoading]);

  const handleOpenUnassignPatient = useCallback(async () => {
    await getAssignedToActivity();
    setOpenUnassignPatient(true);
    setLoading(false);
  }, [getAssignedToActivity, setLoading]);

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
              queryKey={[QueryKeys.Activity.ListActivity]}
              onShow={handleShow}
              onAssign={handleOpenAssignPatient}
              onUnassign={handleOpenUnassignPatient}
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

      {/* assign activity to patient modal */}
      {activity?.id && (
        <HModal
          open={openAssignPatient}
          width={600}
          loading={loadingForm}
          onOpen={setOpenAssignPatient}
          okText={t('Activity.actions.assign_activity.modal.ok_text')}
          okButtonProps={{
            type: 'primary',
            onClick: handleAssign,
            loading: loadingForm,
            className: styles.footer_btn_confirm,
            disabled: availableForActivityList.length === 0,
          }}
          title={t('Activity.actions.assign_activity.modal.title')}
        >
          <AssignActivityForm
            form={assignForm}
            initialPatients={availableForActivityList}
          />
        </HModal>
      )}

      {/* unassign activity to patient modal */}
      {activity?.id && (
        <HModal
          open={openUnassignPatient}
          width={600}
          loading={loadingForm}
          onOpen={setOpenUnassignPatient}
          footer={null}
          title={t('Activity.actions.unassign_activity.modal.title')}
        >
          <UnassignedActivityForm
            listPatient={assignedToActivityList}
            updateQueriesAfterUnassign={updateQueriesAfterUnassign}
          />
        </HModal>
      )}
    </>
  );
};

export default memo(ActivityActions);
