import { ThemeConfig } from 'antd';
import COLORS from '@/styles/modules/variablesExport.module.scss';

export const theme: ThemeConfig = {
  token: {
    // Seed Token
    colorPrimary: COLORS.primaryColor,
    colorError: COLORS.error,
    fontFamily: 'poppins-regular',
    borderRadius: 10,
  },
  components: {
    Layout: {
      siderBg: '#E8E8E8',
      headerBg: 'transparent',
      headerPadding: '15px 30px 5px 30px',
      headerHeight: 70,
    },
    Steps: {
      iconSize: 50,
      iconFontSize: 24,
      navArrowColor: COLORS.grey5,
    },
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
    },
    Button: {
      colorPrimary: COLORS.primaryColor,
      colorTextBase: COLORS.black,
      fontSize: 16,
      controlHeight: 40,
      algorithm: true, // Enable algorithm,

      defaultBg: COLORS.white,
      defaultBorderColor: COLORS.grey3,
      defaultColor: COLORS.black,
      defaultHoverBorderColor: COLORS.primaryColor,
      defaultHoverColor: COLORS.primaryColor,
    },
    Form: {
      labelColor: '#1C1816',
      labelFontSize: 16,
      labelHeight: 40,
    },
    Input: {
      colorPrimary: COLORS.primaryColor,
      colorError: COLORS.error,
      algorithm: true, // Enable algorithm
    },
    Switch: {
      handleBg: COLORS.mainGrey,
      colorPrimary: COLORS.success,
      colorPrimaryHover: COLORS.success,
    },
    Table: {
      borderColor: COLORS.grey,
      headerBg: COLORS.white,
      headerBorderRadius: 0,
      headerColor: COLORS.primaryColorText,
      fixedHeaderSortActiveBg: COLORS.error,
    },
    Descriptions: {
      contentColor: COLORS.greyDark,
      itemPaddingBottom: 20,
      colorTextTertiary: COLORS.primaryColorText,
      fontSize: 16,
    },
    Tabs: {
      fontSize: 16,
      itemColor: COLORS.greyDark,
      itemHoverColor: COLORS.primaryColor,
      itemSelectedColor: COLORS.primaryColorText,
      lineWidth: 2,
    },
  },
  hashed: false,
};
