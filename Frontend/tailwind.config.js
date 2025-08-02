/**
 * Tailwind CSS
 * @type {import('tailwindcss').Config}
 */
export const darkMode = 'class';
export const content = ['./src/**/*.{astro,html,js,jsx,ts,tsx}'];
export const theme = {
  extend: {
    colors: {
      // Dark theme colors for client
      clientDarkPrimary: 'rgba(2,190,165,255)',
      clientDarkSecondary: 'rgba(243,243,243,1)',
      clientDarkTextColor: 'rgba(255,255,255,1)',
      clientDarkIconColor: 'rgba(255,255,255,1)',
      clientDarkButtonColor: 'rgb(4,188,163)',
      clientDarkTableColor: 'rgba(79,194,248,1)',
      clientDarkEnableBorderColor: '#117B67',
      clientDarkDisabledBorderColor: 'rgba(255,226,226,1)',

      // Light theme colors for client
      clientLightPrimary: 'rgba(255,255,255,255)', // blanco
      clientLightSecondary: 'rgb(4,188,163)', // verde fuerte
      clientLightTextColor: 'rgba(9,13,40,1)', // #090D28
      clientLightIconColor: 'rgba(9,13,40,1)', // #090D28
      clientLightButtonColor: 'rgb(4,188,163)', // #F08A54
      clientLightTableColor: 'rgba(234,88,12,1)', // #ea580c
      clientLightEnableBorderColor: '#117B67', // #DCFCE7
      clientLightDisabledBorderColor: 'rgba(254,226,226,1)', // #FEE2E2
    },
    fontFamily: {},
    fontSize: {}
  }
};
export const plugins = [];
