import { EVENTS } from "@/data";
import { useCallback } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { EventCard, HText } from "../components/common";
import { getMetrics } from "../helpers/utils";
import MainLayout from "../layouts/main_layout";

export default function Index() {
  const ListHeaderComponent = useCallback(() => {
    return (
      <View>
        <HText size="header1">
          Events
        </HText>
      </View>
    )
  }, []);
  return (
    <MainLayout>
      <FlatList
        data={EVENTS}
        renderItem={({ item }) => (
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
