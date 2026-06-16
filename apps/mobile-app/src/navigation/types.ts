import type { NavigatorScreenParams } from '@react-navigation/native';

export type TabParamList = {
  Today: undefined;
  Companion: undefined;
  Status: undefined;
  Me: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<TabParamList> | undefined;
  Checkin: undefined;
  Contacts: undefined;
  ContactReceived: undefined;
};
