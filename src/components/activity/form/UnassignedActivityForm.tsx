import PatientListView from '@/components/patient/list/PatientListView';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { SinglePatient } from '@/models/schema';
import { UnassignActivityService } from '@/services/activity/activity.service';
import stylesPatient from '@/styles/modules/patient.module.scss';
import { Flex } from 'antd';
import { Empty } from 'antd/lib';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash2Fill } from 'react-icons/bs';

interface Props {
  listPatient: SinglePatient[];
  updateQueriesAfterUnassign: (patientIds: number[]) => Promise<void>;
}

export default function UnassignedActivityForm({
  listPatient,
  updateQueriesAfterUnassign,
}: Props) {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();

  const handleUnassign = useCallback(
    async (patientId: number) => {
      try {
        const res = await UnassignActivityService(patientId);

        if (res.error && res.statusCode !== 201) {
          openNotification.error({
            description: res.message,
          });
          return;
        }

        await updateQueriesAfterUnassign([patientId]);

        openNotification.success({
          description: res.message,
        });
      } catch (error) {
        openNotification.error({
          description: 'Unknown Error',
        });
      }
    },
    [openNotification, updateQueriesAfterUnassign],
  );

  return (
    <div
      style={{
        height: 'calc(400px + 2rem)',
        paddingBottom: '2rem',
      }}
    >
      {listPatient.length > 0 ? (
        <div className={stylesPatient.patientSelectedWrapper}>
          <h3 className={stylesPatient.patientSelected_title}>
            {listPatient.length}{' '}
            {t(
              'Activity.actions.unassign_activity.modal.title_patient_assigned',
            )}
          </h3>
          <div
            className={stylesPatient.patientSelected_scroll}
            style={{
              height: '380px',
            }}
          >
            <PatientListView
              listPatient={listPatient}
              actions={[
                {
                  label: t(
                    'Activity.actions.unassign_activity.button_unassign',
                  ),
                  labelMobile: <BsTrash2Fill />,
                  actionCallback: handleUnassign,
                  buttonProps: {
                    type: 'default',
                    className: 'primary_modal_footer_btn_cancel',
                  },
                },
              ]}
            />
          </div>
        </div>
      ) : (
        <Flex
          align="center"
          justify="center"
          style={{
            height: '100%',
          }}
        >
          <Empty
            description={t(
              'Activity.actions.unassign_activity.feedback.no_assignments',
            )}
            style={{ marginTop: 30, width: '400px' }}
          />
        </Flex>
      )}
    </div>
  );
}
