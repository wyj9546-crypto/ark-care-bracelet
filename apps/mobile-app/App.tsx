import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { StatusBar } from 'react-native';

import { PhoneFrame } from './src/components/PhoneFrame';
import { AppNavigator } from './src/navigation/AppNavigator';
import { colors } from './src/theme/theme';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <PhoneFrame>
        <NavigationContainer>
          <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
          <AppNavigator />
        </NavigationContainer>
      </PhoneFrame>
    </SafeAreaProvider>
  );
}
