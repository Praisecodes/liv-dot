import { PlayIcon } from '@/assets/icons';
import { getMetrics } from '@/src/helpers/utils';
import { useEventDetails } from '@/src/stores/zustand';
import { format } from 'date-fns';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from './text';

interface Props {
  event: IEvent;
  onPress?: () => void;
}

const EventCard: React.FC<Props> = ({ event, onPress }) => {
  const { setDetails } = useEventDetails();

  const handleCardPressed = () => {
    if (onPress) {
      onPress();
      return;
    }

    // navigate to event details screen
    setDetails(event);
    router.navigate({
      pathname: "/details"
    });
  };

  return (
    <TouchableOpacity onPress={handleCardPressed}>
      <View className={`w-full overflow-hidden bg-white`} style={[styles.container]}>
        <View style={[styles.thumbnail]}></View>

        <View
          className={`flex flex-row items-center border-t border-t-black-a10`}
          style={[styles.detailsContainer]}
        >
          <View style={{ gap: getMetrics(5) }} className={`flex-1`}>
            <Text size='15' weight='bold' numberOfLines={1}>
              {event.name}
            </Text>
            <Text size='13' numberOfLines={1} className={`text-black-a70`}>
              {format(event.startDate, "MMMM dd, yyyy")} - {event.location}
            </Text>
          </View>

          <TouchableOpacity onPress={() => { }}>
            <View style={[styles.button]} className={`rounded-full bg-primary flex items-center justify-center`}>
              <PlayIcon />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default EventCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: getMetrics(8),
  },
  detailsContainer: {
    gap: getMetrics(12),
    paddingHorizontal: getMetrics(10),
    paddingVertical: getMetrics(13),
  },
  thumbnail: {
    width: "100%",
    height: getMetrics(190),
  },
  button: {
    width: getMetrics(50),
    height: getMetrics(50),
  }
});
