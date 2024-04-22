import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Input, Select, Space, Button, DatePicker } from 'antd';
import { SearchOutlined, CloseCircleFilled } from '@ant-design/icons';
import {
  E_FilterSearchType,
  FilterOptionType,
  SearchValueType,
} from '@/models/types/Table.d';

const { Search } = Input;
const { Option } = Select;
const { RangePicker } = DatePicker;

interface Props {
  searchValue: SearchValueType;
  filterValue: FilterOptionType | undefined;
  handleChange: any;
  handleSearch: any;
  handleDisable: any;
}

const InputSearch = ({
  searchValue,
  filterValue,
  handleChange,
  handleSearch,
  handleDisable,
}: Props) => {
  const getInputComponent = useMemo(
    () => ({
      [E_FilterSearchType.DATE_RANGE]: (
        <Space.Compact
          style={{
            width: '100%',
          }}
        >
          <RangePicker
            style={{ width: '326px' }}
            value={searchValue.value}
            onChange={handleChange}
            disabledDate={handleDisable ?? null}
          />

          <Button
            disabled={searchValue.value ? false : true}
            className="col-center"
            style={{ width: '44px' }}
            type="primary"
            onClick={handleSearch}
          >
            <SearchOutlined />
          </Button>
        </Space.Compact>
      ),
      [E_FilterSearchType.SELECT]: (
        <Space.Compact
          style={{
            width: '100%',
          }}
        >
          <Select onChange={handleChange} style={{ width: '326px' }}>
            {searchValue.selectOptions?.map((opt) => (
              <Option value={opt.value} key={'option-select-' + opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>

          <Button
            className="col-center"
            style={{
              width: '44px',
            }}
            type="primary"
            onClick={handleSearch}
          >
            <SearchOutlined />
          </Button>
        </Space.Compact>
      ),
      [E_FilterSearchType.TEXT]: (
        <Search
          style={{ width: '400px' }}
          placeholder={filterValue?.placeholder}
          value={searchValue.value}
          enterButton={<SearchOutlined />}
          onSearch={handleSearch}
          onChange={handleChange}
        />
      ),
    }),
    [
      filterValue?.placeholder,
      handleChange,
      handleDisable,
      handleSearch,
      searchValue.selectOptions,
      searchValue.value,
    ],
  );

  return (
    <Space direction="vertical">
      {getInputComponent[searchValue.inputType ?? E_FilterSearchType.TEXT]}
    </Space>
  );
};

export default InputSearch;
