import { useFormActivityStore } from '@/lib/store/forms/formActivity';
import { CheckCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Flex, Grid, Input, Select, Space, Tag } from 'antd';
import debounce from 'lodash/debounce';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

const { useBreakpoint } = Grid;

export const FilterPictograms = () => {
  const { t } = useTranslation();
  const screens = useBreakpoint();
  const [searchValue, setSearchValue] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<number | undefined>();

  const {
    pictogramList,
    categoriesPictogramList,
    filters,
    isRefetchingPictograms,
    setFiltersPictogram,
  } = useFormActivityStore();

  const isFiltering = useMemo(() => {
    const activeFilters = Object.values(filters || {}).filter((item) => !!item);
    return activeFilters.length > 0;
  }, [filters]);

  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        setFiltersPictogram({
          categoryId: filters?.categoryId,
          pictogramName: value,
        });
      }, 300),
    [filters?.categoryId, setFiltersPictogram],
  );

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleFilterCategory = useCallback(
    (value: number) => {
      setFilterCategory(value);
      setFiltersPictogram({
        pictogramName: filters?.pictogramName,
        categoryId: value,
      });
    },
    [setFilterCategory, filters?.pictogramName, setFiltersPictogram],
  );

  const handleSearch = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handleResetAll = useCallback(() => {
    setFiltersPictogram(undefined);
    setSearchValue('');
    setFilterCategory(undefined);
  }, [setFilterCategory, setFiltersPictogram]);

  return (
    <Flex vertical gap={8}>
      <Space.Compact
        size="middle"
        block
        direction={screens.sm ? 'horizontal' : 'vertical'}
        className="filter-compact-search-select"
      >
        <Input
          value={searchValue}
          allowClear
          addonBefore={<SearchOutlined />}
          placeholder={
            screens.sm
              ? t('Activity.fields.pictogramSentence.placeholderSearch')
              : t('Activity.fields.pictogramSentence.placeholderSearchMobile')
          }
          onChange={handleSearch}
          status={undefined}
        />
        <Select
          value={filterCategory}
          allowClear
          placeholder={t(
            'Activity.fields.pictogramSentence.placeholderCategoryFilter',
          )}
          labelRender={(value) => (
            <Tag className="tag-filter-selected" icon={<CheckCircleOutlined />}>
              {value.label}
            </Tag>
          )}
          onChange={handleFilterCategory}
        >
          {categoriesPictogramList.map((item) => (
            <Select.Option key={item.id} value={item.id}>
              {item.name}
            </Select.Option>
          ))}
        </Select>
      </Space.Compact>
      {isFiltering && !isRefetchingPictograms && (
        <Flex justify="space-between" align="center">
          <span>
            {t('Activity.fields.pictogramSentence.feedback.showResult', {
              count: pictogramList.length,
            })}
          </span>
          <Button color="primary" variant="link" onClick={handleResetAll}>
            {t('Activity.fields.pictogramSentence.action.showAll')}
          </Button>
        </Flex>
      )}
    </Flex>
  );
};
