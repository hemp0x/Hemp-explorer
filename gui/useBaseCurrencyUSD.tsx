import * as React from "react";
import axios from "axios";
import { useConfig } from "./useConfig";

export function useBaseCurrencyUSD() {
  const [usdRate, setUsdRate] = React.useState<null | number>(null);
  const config = useConfig();
  const tickerUrl = config?.usd_ticker_url || "";

  React.useEffect(() => {
    if (!tickerUrl) {
      return;
    }
    async function work() {
      try {
        const response = await axios.get(tickerUrl);
        const value = parseFloat(response.data.price);
        if (!Number.isNaN(value)) {
          setUsdRate(value);
        }
      } catch (e) {
        setUsdRate(null);
      }
    }
    work();
  }, [tickerUrl]);

  return usdRate;
}
