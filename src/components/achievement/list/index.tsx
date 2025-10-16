'use client';

import { useAchievementColumns } from '@/components/achievement/list/AchievementColumn';
import AchievementGridCard from '@/components/achievement/list/AchievementGridCard';
import WrapperTable from '@/components/table/Wrappertable';
import { useOpenNotification } from '@/context/Notification/NotificationProvider';
import { useFetchListAchievementsQuery } from '@/lib/queries/achievement';
import { useTableStore } from '@/lib/store/table';
import { E_ActionKeyTable } from '@/models/types/Table.d';
import { Space } from 'antd';
import { useTranslation } from 'react-i18next';

export default function PatientIndex() {
  const { t } = useTranslation();
  const { openNotification } = useOpenNotification();
  const [columns] = useAchievementColumns();
  const { searching, paginationTable, dispatch } = useTableStore();

  const { data, isLoading, isRefetching } = useFetchListAchievementsQuery(
    {
      paginate: {
        page: paginationTable?.page,
        size: paginationTable?.size,
      },
    },
    undefined,
  );

  const handleSearch = () => {
    dispatch({ type: E_ActionKeyTable.CLEAR_SELECTED });
    openNotification.success({
      description: 'Processing complete!',
    }); // TODO it's will change for message returned by api
  };

  return (
    <>
      <Space direction="vertical" size={10} className="main-wrapper-table">
        <WrapperTable
          id="achievement-table"
          cols={columns}
          data={data}
          searchable={false}
          searchProps={{
            onSearch: handleSearch,
            searching: searching,
            placeholder: t('Achievement.index.searchPlaceholder'),
          }}
          viewDisplayProps={{
            defaultView: 'grid',
            showViewToggle: true,
            grid: {
              xs: 2,
              xxl: 6,
            },
            renderItemViewGrid: (achievement) => (
              <AchievementGridCard achievement={achievement} />
            ),
          }}
          loading={isLoading}
          fetching={isRefetching}
          scroll
        />
      </Space>
    </>
  );
}
