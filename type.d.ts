interface IEvent {
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
