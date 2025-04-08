import { Select } from 'antd';
import { ReactNode, useCallback, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

interface Props<T> {
  list: T[];
  keyValue: keyof T;
  keyLabel: keyof T;
  onChange: (itemSelected: T) => void;
}

export default function SearchableList<T>({
  list,
  keyValue,
  keyLabel,
  onChange,
}: Props<T>) {
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const handleChange = useCallback(
    (value: string | number | undefined) => {
      const selected = list.find((item) => item[keyValue] === value);
      if (selected) {
        onChange(selected);
      }

      setDropdownOpen(false);
    },
    [keyValue, list, onChange],
  );

  return (
    <>
      <Select
        className="primary custom-assign-patient"
        showSearch
        allowClear
        autoClearSearchValue={false}
        onChange={handleChange}
        open={dropdownOpen}
        tagRender={() => <></>}
        suffixIcon={<></>}
        prefix={<BsSearch />}
        maxTagCount={0}
        onDropdownVisibleChange={(open) => setDropdownOpen(open)}
        filterOption={(input, option) =>
          (option?.children as unknown as string)
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        disabled={list.length === 0}
      >
        {list.map((item) => (
          <Select.Option key={String(item[keyValue])} value={item[keyValue]}>
            {item[keyLabel] as ReactNode}
          </Select.Option>
        ))}
      </Select>
    </>
  );
}
