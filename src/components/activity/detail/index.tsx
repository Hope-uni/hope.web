import PictogramItem from '@/components/pictogram/PictogramItem';
import {
  DetailActivity,
  SinglePictogramWithOutCategorySchema,
} from '@/models/schema';
import style from '@/styles/modules/activity.module.scss';
import { Descriptions, Divider, Flex, Typography } from 'antd';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  activity: DetailActivity;
}

const ActivityDetail = ({ activity }: Props) => {
  const { t } = useTranslation();

  const solutionText = useMemo(() => {
    return activity.activitySolution.map((item) => item.name).join(' ');
  }, [activity.activitySolution]);

  return (
    <div className={style.detail_activity}>
      <Flex vertical gap="15px">
        <Flex vertical gap={3}>
          <span className={style.text_name}>{activity?.name}</span>
          <p className={style.text_description}>{activity?.description}</p>
        </Flex>
        <Flex vertical>
          <Descriptions className="ant-descriptions-secondary">
            <Descriptions.Item label={t('Activity.index.columns.assignments')}>
              {activity?.assignments?.length || 0}
            </Descriptions.Item>
            <Descriptions.Item label={t('Activity.index.columns.points')}>
              {activity?.satisfactoryPoints}
            </Descriptions.Item>
            <Descriptions.Item label={t('Activity.index.columns.phase')}>
              {activity?.phase.name}
            </Descriptions.Item>
          </Descriptions>
        </Flex>
      </Flex>
      <Divider />
      <div className={style.solution_preview}>
        <Typography.Title className={style.solution_preview_label}>
          {t('Activity.fields.pictogramSentence.labelPreviewSentence')}
        </Typography.Title>
        <div>
          <div className={style.solution_preview_pictograms}>
            {activity.activitySolution?.map((pictogram) => (
              <div
                key={pictogram.id}
                className={style.container_selected_pictogram}
              >
                <PictogramItem
                  key={pictogram.id}
                  pictogram={SinglePictogramWithOutCategorySchema.parse(
                    pictogram,
                  )}
                  sizeContainer={100}
                  sizeImg={80}
                  showLabel={false}
                />
              </div>
            ))}
          </div>
          <Typography.Text className={style.solution_text}>
            {solutionText}
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default ActivityDetail;
