import { Achievement, SinglePatient } from '@/models/schema';
import style from '@/styles/modules/patient.module.scss';
import {
  Avatar,
  Button,
  ButtonProps,
  Empty,
  Flex,
  Grid,
  List,
  Spin,
  Tag,
} from 'antd';
import { ReactNode, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;

interface ActionListViewType {
  label: ReactNode | string;
  labelMobile?: ReactNode | string;
  actionCallback: (args: any) => void | Promise<void>;
  buttonProps?: ButtonProps;
}

interface Props {
  listAchievement: Achievement[];
  actions?: ActionListViewType[];
}

const AchievementListView = ({ listAchievement, actions = [] }: Props) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const [currentIdLoading, setCurrentIdLoading] = useState<number>();

  const handleAction = useCallback(
    async (id: number, callback: (args: any) => void | Promise<void>) => {
      setCurrentIdLoading(id);
      const patientToRemove = listAchievement.find((item) => item.id === id);
      await callback(patientToRemove);
      setCurrentIdLoading(undefined);
    },
    [listAchievement],
  );

  const getActions = useCallback(
    (patientId: number) => {
      return actions.map((item, index) => [
        <Flex
          justify="center"
          align="center"
          key={`action-${index}`}
          style={{
            width: screens.xs ? '50px' : '100%',
          }}
        >
          {patientId !== currentIdLoading ? (
            <Button
              className={style.patientSelected_btnDelete}
              onClick={() => handleAction(patientId, item.actionCallback)}
              disabled={patientId === currentIdLoading}
            >
              {screens.xs && item.labelMobile ? (
                <>{item.labelMobile}</>
              ) : (
                <span>{item.label}</span>
              )}
            </Button>
          ) : (
            <div
              style={{
                width: screens.xs ? '100%' : '100px',
              }}
            >
              <Spin />
            </div>
          )}
        </Flex>,
      ]);
    },
    [actions, currentIdLoading, handleAction, screens.xs],
  );

  const renderItem = useCallback(
    (item: Achievement) => (
      <List.Item actions={getActions(item.id)}>
        <List.Item.Meta
          avatar={<Avatar src={item.imageUrl} size={45} />}
          title={item.name}
        />
      </List.Item>
    ),
    [getActions],
  );

  return (
    <List
      itemLayout="horizontal"
      dataSource={listAchievement}
      renderItem={renderItem}
      locale={{
        emptyText: (
          <Empty
            description={t(
              'Therapist.actions.assign_patients.feedback.no_selected',
            )}
            style={{ marginTop: 30 }}
          />
        ),
      }}
    />
  );
};

export default AchievementListView;
