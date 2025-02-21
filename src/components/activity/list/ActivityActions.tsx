import { RenderModeActionTypes } from '@/components/table/helpers';
import PopupActions from '@/components/table/PopupActions';
import { SingleActivity } from '@/models/schema';
import { ActionType } from '@/models/types';
import { DeleteActivityService } from '@/services/activity/activity.service';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  activity: SingleActivity;
  actions?: Array<ActionType>;
  classWrapper?: string;
  renderMode?: RenderModeActionTypes;
}

const ActionsActions = ({
  activity,
  actions = ['edit', 'delete'],
  classWrapper,
  renderMode = 'popup',
}: Props) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(() => {
    //TODO Implements a modal for edit;
  }, []);

  const handleDelete = useCallback(async () => {
    return await DeleteActivityService(String(activity.id));
  }, [activity.id]);

  return (
    <>
      <PopupActions
        id={activity.id}
        actions={actions}
        route="activities"
        classWrapper={classWrapper}
        renderMode={renderMode}
        onEdit={handleEdit}
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
    </>
  );
};

export default ActionsActions;
