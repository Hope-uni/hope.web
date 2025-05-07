import AchievementListView from '@/components/achievement/list/AchievementListView';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { Achievement } from '@/models/schema';
import { UnassignAchievementService } from '@/services/achievements/achievements.service';
import stylesPatient from '@/styles/modules/patient.module.scss';
import { Flex } from 'antd';
import { Empty } from 'antd/lib';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { BsTrash2Fill } from 'react-icons/bs';

interface Props {
  achievementList: Achievement[];
  patientId: number;
  updateQueriesAfterUnassignAssignment: (
    patientId: number,
    achievementId: number,
  ) => Promise<void>;
}

export default function UnassignAchievementForm({
  achievementList,
  patientId,
  updateQueriesAfterUnassignAssignment,
}: Props) {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();

  const handleUnassign = useCallback(
    async (achievement: Achievement) => {
      try {
        const res = await UnassignAchievementService({
          achievementId: achievement.id,
          patientId,
        });

        if (res.error && res.statusCode !== 201) {
          openNotification.error({
            description: res.message,
          });
          return;
        }

        await updateQueriesAfterUnassignAssignment(patientId, achievement.id);

        openNotification.success({
          description: res.message,
        });
      } catch (error) {
        openNotification.error({
          description: 'Unknown Error',
        });
      }
    },
    [openNotification, patientId, updateQueriesAfterUnassignAssignment],
  );

  return (
    <div
      style={{
        height: 'calc(400px + 2rem)',
        paddingBottom: '2rem',
      }}
    >
      {achievementList.length > 0 ? (
        <div className={stylesPatient.patientSelectedWrapper}>
          <h3 className={stylesPatient.patientSelected_title}>
            {achievementList.length}{' '}
            {t(
              'Patient.actions.unassign_achievement.modal.title_achievement_assigned',
            )}
          </h3>
          <div
            className={stylesPatient.patientSelected_scroll}
            style={{
              height: '380px',
            }}
          >
            <AchievementListView
              listAchievement={achievementList}
              actions={[
                {
                  label: t(
                    'Patient.actions.unassign_achievement.button_unassign',
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
              'Patient.actions.unassign_achievement.feedback.no_assignments',
            )}
            style={{ marginTop: 30, width: '400px' }}
          />
        </Flex>
      )}
    </div>
  );
}
