import React, { useEffect } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { getMetrics } from '../helpers/utils';
import MainLayout from '../layouts/main_layout';
import { useEventDetails } from '../stores/zustand';

const Details = () => {
  const { details, clearDetails } = useEventDetails();

  useEffect(() => {
    return () => {
      clearDetails();
    }
  }, []);
  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Event details content goes here */}
      </ScrollView>
    </MainLayout>
  )
}

export default Details;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: getMetrics(16),
    paddingTop: getMetrics(12),
    paddingBottom: getMetrics(25),
    gap: getMetrics(12),
  }
});
