import React, { useCallback, useEffect, useState } from 'react';
import { Select, Space, Flex } from 'antd';
import { CloseCircleFilled } from '@ant-design/icons';
import {
  E_FilterSearchType,
  FilterOptionType,
  SearchPropsType,
  SearchValueType,
} from '@/models/types/Table.d';
import InputSearch from './InputSearch';

const { Compact } = Space;

const initSearchValue = {
  value: null,
  filter: null,
  inputType: E_FilterSearchType.TEXT,
  selectOptions: [],
};

const SearchTable = ({
  placeholder,
  searching,
  filterable = false,
  filterOptions,
  minWidthSelect,
  handleDisable,
  onSearch = () => {},
  onClear = () => {},
}: SearchPropsType) => {
  const { Option } = Select;
  const [filterValue, setFilterValue] = useState<FilterOptionType>();
  const [searchValue, setSearchValue] =
    useState<SearchValueType>(initSearchValue);
  const [showDelete, setShowDelete] = useState(false);
  const regexNumber = /^-?\d+(?:\.\d+)?$/;

  useEffect(() => {
    if (filterable && filterOptions) {
      setFilterValue(!filterOptions.length ? undefined : filterOptions[0]);
    } else {
      setFilterValue({
        value: '',
        label: '',
        placeholder: placeholder,
        type: E_FilterSearchType.TEXT,
      });
    }
  }, [filterOptions, filterable, placeholder]);

  const handleChangeFilter = useCallback(
    (filterOption: string) => {
      if (filterable && filterOptions && filterOptions?.length > 0) {
        let currentOpt = filterOptions.find(
          (opt) => opt.value === filterOption,
        );
        setFilterValue(currentOpt);
        setSearchValue({
          ...searchValue,
          value: '',
          filter: currentOpt?.value,
          inputType: currentOpt?.type ?? E_FilterSearchType.TEXT,
          selectOptions: currentOpt?.options ?? [],
        });
      }
    },
    [filterOptions, filterable, searchValue],
  );

  const handleChange = (e: any) => {
    if (['dateRange', 'select'].includes(searchValue.inputType)) {
      setShowDelete(false);
      setSearchValue({
        ...searchValue,
        value: e ?? '',
        filter: filterValue?.value,
      });
      return;
    }

    if (['number'].includes(searchValue.inputType)) {
      if (regexNumber.test(e.target.value) || e.target.value === '') {
        setShowDelete(e.target.value.length > 0 ? true : false);
        setSearchValue({
          ...searchValue,
          value: e.target.value ?? '',
          filter: filterValue?.value,
        });
      }
      return;
    }

    setShowDelete(e.target.value.length > 0 ? true : false);
    setSearchValue({
      ...searchValue,
      value: e.target.value ?? '',
      filter: filterValue?.value,
    });

    return;
  };

  const handleClear = () => {
    setSearchValue(initSearchValue);
    setShowDelete(false);
    onSearch(-1);
  };

  const handleSearch = () => {
    onClear();
    onSearch(searchValue);
  };

  const selectSearch = useCallback(() => {
    {
      if (filterable && filterOptions && filterOptions.length > 0) {
        return (
          <Select
            defaultValue={filterOptions[0].value}
            onChange={handleChangeFilter}
            style={{
              minWidth: minWidthSelect,
            }}
          >
            {filterOptions.map((opt) => (
              <Option value={opt.value} key={'search-select-' + opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );
      }
    }
  }, [Option, filterOptions, filterable, handleChangeFilter, minWidthSelect]);

  return (
    <Flex
      className={`wrapper-search site-input-group-wrapper ${filterOptions && filterOptions.length > 0 ? 'has-options' : 'single-input-search'}`}
    >
      <Flex className="inner-container">
        {searching ? (
          <Flex className="cont-clear-result">
            <span className="clear-result" onClick={handleClear}>
              Mostrar todo //TODO luego se aplicará intl
            </span>
          </Flex>
        ) : (
          ''
        )}
        <Flex>
          <Compact>
            {selectSearch()}
            <InputSearch
              searchValue={searchValue}
              filterValue={filterValue}
              handleChange={handleChange}
              handleSearch={handleSearch}
              handleDisable={handleDisable}
            />
            {showDelete && (
              <CloseCircleFilled className="clearable" onClick={handleClear} />
            )}
          </Compact>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default SearchTable;
