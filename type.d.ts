interface IEvent {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  thumbnail: string;
  liveStreamUrl: string;
  paymentStatus: 'paid' | 'unpaid' | 'pending';
  isOffline: boolean;
  replayAvailable: boolean;
}

type EventViewState =
  | "NOT_PURCHASED"
  | "PENDING"
  | "UPCOMING"
  | "LIVE"
  | "REPLAY"
  | "ENDED"
  | "OFFLINE";
