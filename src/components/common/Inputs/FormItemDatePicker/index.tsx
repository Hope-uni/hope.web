import { ROLES } from '@/constants/guards';
import { AgeLimit, MaxMinAgeRule, UserRules } from '@/constants/rules';
import { Role } from '@/models/schema';
import { validateRole } from '@/utils/session';
import { DatePicker, Form, FormItemProps } from 'antd';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const ThreeYearsAgo = dayjs(new Date()).subtract(3, 'years');
const EighteenYearsAgo = dayjs(new Date()).subtract(18, 'years');

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
          maxAge: AgeLimit.patient.min,
          field: t('Role.catalog.patient'),
        },
        disabledDate: (current: any) =>
          current && current.valueOf() >= ThreeYearsAgo,
      };
    }

    return {
      defaultPickerValue: EighteenYearsAgo,
      rule: {
        minAge: AgeLimit.default.min,
        maxAge: AgeLimit.default.min,
        field: currentRoleSelected.name,
      },
      disabledDate: (current: any) =>
        current && current.valueOf() >= EighteenYearsAgo,
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
        style={{ width: '100%' }}
      />
    </Form.Item>
  );
};

export default FormItemDatePicker;
