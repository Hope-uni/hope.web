import { ThemeConfig } from "antd";

export const theme: ThemeConfig = {
    token: {
        // Seed Token
        colorPrimary: '#15539C',
        colorError: '#DC143C',
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
            navArrowColor: '#C7C6C6'
        },
        Typography: {
            titleMarginBottom: 0,
            titleMarginTop: 0,
        },
        Button: {
            colorPrimary: '#15539C',
            colorTextBase: '#000',
            fontSize: 16,
            controlHeight: 35,
            algorithm: true, // Enable algorithm,

            defaultBg: '#fff',
            defaultBorderColor: '#A0A0A0',
            defaultColor: '#000',
            defaultHoverBorderColor: '#15539C',
            defaultHoverColor: '#15539C',
        },
        Form: {
            labelColor: '#1C1816',
            labelFontSize: 16,
            labelHeight: 40,
        },
        Input: {
            colorPrimary: '#DC143C',
            algorithm: true, // Enable algorithm
        },
    },
};