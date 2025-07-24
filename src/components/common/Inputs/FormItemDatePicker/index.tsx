import { ROLES } from '@/constants/guards';
import { AgeLimit, MaxMinAgeRule, UserRules } from '@/constants/rules';
import { Role } from '@/models/schema';
import { validateRole } from '@/utils/session';
import { DatePicker, Form, FormItemProps } from 'antd';
import dayjs, { Dayjs } from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const today = dayjs();
const ThreeYearsAgo = today.clone().subtract(3, 'years');
const EighteenYearsAgo = today.clone().subtract(18, 'years');
const OneHundredYearsAgo = today.clone().subtract(100, 'years');

const disabledDate = (current: Dayjs, min: Dayjs, max: Dayjs) => {
  if (!current) {
    return false;
  }

  return current.isBefore(min, 'day') || current.isAfter(max, 'day');
};

interface Props extends FormItemProps {
  currentRoleSelected: Role;
  placeholder?: string;
}

const FormItemDatePicker = ({
  currentRoleSelected,
  placeholder,
  ...formItemProps
}: Props) => {
  const { t } = useTranslation();

  const optionsDatePicker = useMemo(() => {
    if (validateRole(currentRoleSelected.name, ROLES.PATIENT)) {
      return {
        defaultPickerValue: ThreeYearsAgo,
        rule: {
          minAge: AgeLimit.patient.min,
          maxAge: AgeLimit.patient.max,
          field: t('Role.catalog.patient'),
        },
        minDate: EighteenYearsAgo,
        maxDate: ThreeYearsAgo,
        disabledDate: (current: Dayjs) =>
          disabledDate(current, EighteenYearsAgo, ThreeYearsAgo),
      };
    }

    return {
      defaultPickerValue: EighteenYearsAgo,
      rule: {
        minAge: AgeLimit.default.min,
        maxAge: AgeLimit.default.max,
        field: currentRoleSelected.name,
      },
      minDate: OneHundredYearsAgo,
      maxDate: EighteenYearsAgo,
      disabledDate: (current: Dayjs) =>
        disabledDate(current, OneHundredYearsAgo, EighteenYearsAgo),
    };
  }, [currentRoleSelected.name, t]);

  return (
    <Form.Item
      {...formItemProps}
      rules={[
        ...UserRules.user.birthday,
        ...MaxMinAgeRule(optionsDatePicker.rule),
      ]}
    >
      <DatePicker
        placeholder={placeholder}
        defaultPickerValue={optionsDatePicker.defaultPickerValue}
        disabledDate={optionsDatePicker.disabledDate}
        minDate={optionsDatePicker.minDate}
        maxDate={optionsDatePicker.maxDate}
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};

export default FormItemDatePicker;
