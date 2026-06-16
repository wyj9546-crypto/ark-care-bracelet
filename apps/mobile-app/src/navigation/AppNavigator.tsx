import { MaterialCommunityIcons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { CheckinScreen } from '../screens/CheckinScreen';
import { CompanionScreen } from '../screens/CompanionScreen';
import { ContactReceivedScreen } from '../screens/ContactReceivedScreen';
import { ContactsScreen } from '../screens/ContactsScreen';
import { MeScreen } from '../screens/MeScreen';
import { StatusScreen } from '../screens/StatusScreen';
import { TodayScreen } from '../screens/TodayScreen';
import { colors, typography } from '../theme/theme';
import type { RootStackParamList, TabParamList } from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const icons: Record<keyof TabParamList, keyof typeof MaterialCommunityIcons.glyphMap> = {
  Today: 'home-heart',
  Companion: 'message-text-outline',
  Status: 'chart-timeline-variant',
  Me: 'account-circle-outline'
};

const labels: Record<keyof TabParamList, string> = {
  Today: '今日',
  Companion: '陪伴',
  Status: '近况',
  Me: '我的'
};

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSoft,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.line,
          height: 66,
          paddingTop: 6,
          paddingBottom: 8
        },
        tabBarLabelStyle: {
          fontSize: typography.tiny,
          fontWeight: '700'
        },
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name={icons[route.name]} size={size} color={color} />
        ),
        tabBarLabel: labels[route.name]
      })}
    >
      <Tab.Screen name="Today" component={TodayScreen} />
      <Tab.Screen name="Companion" component={CompanionScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      <Tab.Screen name="Me" component={MeScreen} />
    </Tab.Navigator>
  );
}

export function AppNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background }
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      <Stack.Screen name="Checkin" component={CheckinScreen} />
      <Stack.Screen name="Contacts" component={ContactsScreen} />
      <Stack.Screen name="ContactReceived" component={ContactReceivedScreen} />
    </Stack.Navigator>
  );
}
