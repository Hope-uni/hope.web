import PopupActions from '@/components/table/PopupActions';
import { Pictogram } from '@/models/schema';
import { ActionType } from '@/models/types';
import { DeletePictogramService } from '@/services/pictogram/pictogram.service';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

interface Props {
  pictogram: Pictogram;
  actions?: Array<ActionType>;
  classWrapper?: string;
}

const PictogramActions = ({
  pictogram,
  actions = ['edit', 'delete'],
  classWrapper,
}: Props) => {
  const { t } = useTranslation();

  const handleEdit = useCallback(() => {
    //TODO Implements a modal for edit;
  }, []);

  const handleDelete = useCallback(async () => {
    return await DeletePictogramService(String(pictogram.id));
  }, [pictogram.id]);

  return (
    <PopupActions
      id={pictogram.id}
      actions={actions}
      route="pictograms"
      classWrapper={classWrapper}
      onEdit={handleEdit}
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
  );
};

export default PictogramActions;
