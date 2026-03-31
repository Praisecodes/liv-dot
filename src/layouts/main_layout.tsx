import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface Props {
  children: React.ReactNode;
}

const MainLayout: React.FC<Props> = ({ children }) => {
  return (
    <SafeAreaView edges={["top"]} className={`flex-1 bg-bg`}>
      {children}
    </SafeAreaView>
  )
}

export default MainLayout;

const styles = StyleSheet.create({});
