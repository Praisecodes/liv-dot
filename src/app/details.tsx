import { differenceInMinutes, format } from 'date-fns';
import { router } from 'expo-router';
import React, { useEffect, useMemo } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, HText, Text } from '../components/common';
import { getMetrics } from '../helpers/utils';
import MainLayout from '../layouts/main_layout';
import { useEventDetails } from '../stores/zustand';

const Details = () => {
  const { details, clearDetails } = useEventDetails();

  const PAYMENT_STATUS = useMemo(() => (
    details?.paymentStatus ?? "unpaid"
  ), [details]);

  const EVENT_PAST = useMemo(() => (
    differenceInMinutes(details?.endDate ?? new Date().toISOString(), new Date().toISOString()) <= 0
  ), [details]);

  const SHOW_STARTED = useMemo(() => {
    const showStarted = (differenceInMinutes(new Date(), details?.startDate ?? new Date()) >= 0) && !EVENT_PAST;

    console.log("Show's Started:", showStarted);

    return showStarted;
  }, [details, EVENT_PAST]);

  const REPLAY_AVAILABLE = useMemo(() => (
    details?.replayAvailable ?? false
  ), [details])

  const BTN_TEXT = useMemo(() => {
    if (EVENT_PAST && !REPLAY_AVAILABLE) {
      return "This Show Is No Longer Available"
    } else {
      switch (PAYMENT_STATUS) {
        case "paid": {
          if (EVENT_PAST && REPLAY_AVAILABLE) {
            return "Replay This Event";
          } else if (!SHOW_STARTED) {
            return "This Show Hasn't Started Yet";
          } else {
            return "Watch Live Event";
          }
        }
        case "pending":
          return "We're Confirming Your Payment";
        case "unpaid":
          return "Pay For This Event"
      }
    }
  }, [REPLAY_AVAILABLE, PAYMENT_STATUS, EVENT_PAST]);

  const handleButtonPressed = () => { }

  useEffect(() => {
    if (!details) router.back();

    return () => {
      clearDetails();
    }
  }, []);

  return (
    <MainLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={[styles.header]}>
          <HText size='header1'>
            {details?.name ?? ""}
          </HText>
          <Text size='13' className={`text-black-a70`}>
            {details?.location} • {format(details?.startDate ?? new Date(), "MMM dd, yyyy hh:mma")} - {format(details?.endDate ?? new Date(), "MMM dd, yyyy hh:mma")}
          </Text>
        </View>

        <View
          style={[styles.image]}
          className={`bg-black-a10`}
        ></View>

        <Text size='15' className={`text-black-a80`}>
          {details?.description ?? ""}
        </Text>

        <View className={`mt-3`}>
          <Button
            text={BTN_TEXT}
            onPress={handleButtonPressed}
            disabled={PAYMENT_STATUS === "pending" || !SHOW_STARTED || (EVENT_PAST && !REPLAY_AVAILABLE)}
          />
        </View>
      </ScrollView>
    </MainLayout>
  )
}

export default Details;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: getMetrics(16),
    paddingTop: getMetrics(25),
    paddingBottom: getMetrics(25),
    gap: getMetrics(20),
  },
  header: {
    gap: getMetrics(8),
  },
  image: {
    width: "100%",
    height: getMetrics(190),
    borderRadius: getMetrics(8),
  }
});
