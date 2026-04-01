import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, StyleSheet, View } from 'react-native';
import { Button, HText, Text } from '../components/common';
import { getEventById, getMetrics } from '../helpers/utils';
import MainLayout from '../layouts/main_layout';

const Details = () => {
  const { id } = useLocalSearchParams();

  const { data: details, isLoading, refetch, isError } = useQuery({
    queryKey: ["get_event", id],
    queryFn: async () => await getEventById(id as string),
    enabled: !!id,
  })

  const getEventState = (event: IEvent | null): EventViewState => {
    if (event?.isOffline ?? false) return "OFFLINE";

    if ((event?.paymentStatus ?? "unpaid") === "unpaid") return "NOT_PURCHASED";
    if ((event?.paymentStatus ?? "unpaid") === "pending") return "PENDING";

    const now = new Date();
    const start = !!event?.startDate ? new Date(event.startDate) : new Date();
    const end = !!event?.endDate ? new Date(event.endDate) : new Date();

    if (now < start) return "UPCOMING";
    if (now >= start && now <= end) return "LIVE";

    if (event?.replayAvailable ?? false) return "REPLAY";

    return "ENDED";
  };

  const STATE_CONFIG = {
    NOT_PURCHASED: {
      text: "Pay For This Event",
      disabled: false,
    },
    PENDING: {
      text: "We're Confirming Your Payment",
      disabled: true,
    },
    UPCOMING: {
      text: "This Show Hasn't Started Yet",
      disabled: true,
    },
    LIVE: {
      text: "Watch Live Event",
      disabled: false,
    },
    REPLAY: {
      text: "Replay This Event",
      disabled: false,
    },
    ENDED: {
      text: "This Show Is No Longer Available",
      disabled: true,
    },
    OFFLINE: {
      text: "This Event Is Only Available Offline",
      disabled: true,
    },
  };

  const state = !!details ? getEventState(details) : "UPCOMING";
  const config = STATE_CONFIG[state];

  const handleButtonPressed = () => { }

  return (
    <MainLayout>
      <ScrollView
        contentContainerStyle={styles.container}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={false} />}
      >
        {(isLoading) && (
          <View className={`flex-1 items-center justify-center`} style={{ gap: getMetrics(13) }}>
            <ActivityIndicator color={"black"} />

            <Text className={`text-black-a80 text-center`}>
              Loading Details...
            </Text>
          </View>
        )}

        {(!isLoading && isError) && (
          <View style={{ gap: getMetrics(13) }} className={`flex-1 items-center justify-center`}>
            <Text className={`text-black-a80 text-center`} size="18">
              Oops! We've encountered an error getting event details{"\n"}Please refresh
            </Text>
          </View>
        )}

        {(!isLoading && !isError) && (
          <>
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
              {state !== "OFFLINE" && (
                <Button
                  text={config.text}
                  onPress={handleButtonPressed}
                  disabled={config.disabled}
                />
              )}

              {state === "OFFLINE" && (
                <Text className={`text-center text-[#FF0000]`} size='13'>
                  Unfortunately, this event is only available offline
                </Text>
              )}
            </View>
          </>
        )}
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
