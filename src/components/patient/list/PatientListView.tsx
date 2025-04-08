import { SinglePatient } from '@/models/schema';
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

interface ActionPatientListViewType {
  label: ReactNode | string;
  labelMobile?: ReactNode | string;
  actionCallback: (args: any) => void | Promise<void>;
  buttonProps?: ButtonProps;
}

interface Props {
  listPatient: SinglePatient[];
  actions?: ActionPatientListViewType[];
}

const PatientListView = ({ listPatient, actions = [] }: Props) => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const [currentIdLoading, setCurrentIdLoading] = useState<number>();

  const handleAction = useCallback(
    async (id: number, callback: (args: any) => void | Promise<void>) => {
      setCurrentIdLoading(id);
      await callback(id);
      setCurrentIdLoading(undefined);
    },
    [],
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

  const renderPatientItem = useCallback(
    (item: SinglePatient) => (
      <List.Item actions={getActions(item.id)}>
        <List.Item.Meta
          avatar={<Avatar src={item.image} size={45} />}
          title={item.fullName}
          description={
            <>
              <Tag className="tag-degree">{item.teaDegree.name}</Tag>
              <Tag className="tag-permission">
                {t('Patient.detail.phase', { phase: item.currentPhase.id })}
              </Tag>
            </>
          }
        />
      </List.Item>
    ),
    [getActions, t],
  );

  return (
    <List
      itemLayout="horizontal"
      dataSource={listPatient}
      renderItem={renderPatientItem}
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

export default PatientListView;
