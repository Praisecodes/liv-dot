import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { EventCard, HText, Text } from "../components/common";
import { getEvents, getMetrics } from "../helpers/utils";
import { useNetworkStatus } from "../hooks";
import MainLayout from "../layouts/main_layout";

export default function Index() {
  const { isOffline } = useNetworkStatus();

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["get_events"],
    queryFn: getEvents,
    retry: 2,
  });

  const ListHeaderComponent = useCallback(() => {
    return (
      <View>
        <HText size="header1">
          Events
        </HText>

        {isOffline && (
          <View style={{ gap: getMetrics(13) }} className={`flex py-32 items-center justify-center`}>
            <Image
              source={require("@/assets/images/no-internet.png")}
              style={{
                width: getMetrics(270),
                height: getMetrics(270),
              }}
              contentFit="contain"
            />

            <Text className={`text-black-a80 text-center`} size="15">
              We're having troubles connecting.{"\n"}Please check your internet connection and try again.
            </Text>
          </View>
        )}

        {(isLoading && !isOffline) && (
          <View style={{ gap: getMetrics(13) }} className={`flex py-32 items-center justify-center`}>
            <ActivityIndicator color={"black"} />

            <Text className={`text-black-a80 text-center`} size="15">
              Loading Events...
            </Text>
          </View>
        )}

        {(!isLoading && !isOffline && isError) && (
          <View style={{ gap: getMetrics(13) }} className={`flex py-32 items-center justify-center`}>
            <Text className={`text-black-a80 text-center`} size="18">
              Oops! We've encountered an error getting events{"\n"}Please refresh
            </Text>
          </View>
        )}
      </View>
    )
  }, [isLoading, isError, isOffline]);

  return (
    <MainLayout>
      <FlatList
        data={data}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={false} />}
        renderItem={({ item }) => (isLoading || isError || isOffline) ? null : (
          <EventCard event={item} />
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.container}
        ListHeaderComponent={ListHeaderComponent}
      />
    </MainLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: getMetrics(16),
    paddingTop: getMetrics(12),
    paddingBottom: getMetrics(25),
    gap: getMetrics(12),
  }
});
