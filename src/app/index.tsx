import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { ActivityIndicator, FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { EventCard, HText, Text } from "../components/common";
import { getEvents, getMetrics } from "../helpers/utils";
import MainLayout from "../layouts/main_layout";

export default function Index() {
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

        {(isLoading) && (
          <View style={{ gap: getMetrics(13) }} className={`flex py-32 items-center justify-center`}>
            <ActivityIndicator color={"black"} />

            <Text className={`text-black-a80 text-center`} size="15">
              Loading Events...
            </Text>
          </View>
        )}

        {(!isLoading && isError) && (
          <View style={{ gap: getMetrics(13) }} className={`flex py-32 items-center justify-center`}>
            <Text className={`text-black-a80 text-center`} size="18">
              Oops! We've encountered an error getting events{"\n"}Please refresh
            </Text>
          </View>
        )}
      </View>
    )
  }, [isLoading, isError]);

  return (
    <MainLayout>
      <FlatList
        data={data}
        refreshControl={<RefreshControl onRefresh={refetch} refreshing={false} />}
        renderItem={({ item }) => (isLoading || isError) ? null : (
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
