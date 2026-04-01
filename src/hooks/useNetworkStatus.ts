import NetInfo from "@react-native-community/netinfo";
import { useEffect, useState } from "react";

export const useNetworkStatus = () => {
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      const offline = !state.isConnected || !state.isInternetReachable;
      setIsOffline(!!offline);
    });

    return () => unsubscribe();
  }, []);

  return { isOffline };
};
