import { DefaultTheme } from '@react-navigation/native';

import Colors from '../utils/colors';

const navigationTheme = {
  ...DefaultTheme,
  // override colors
    colors: {
    ...DefaultTheme.colors,
    text: Colors.black,
    border: Colors.tabBar,
    background: Colors.ghostWhite
  }
};

export default navigationTheme;
