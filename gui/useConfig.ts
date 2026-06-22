import React from "react";
import axios from "axios";

export interface IConfig {
  baseCurrency: string
  rpc_password: string
  rpc_username: string
  rpc_url: string
  httpPort: number
  headline: string
  theme: string
  ipfs_gateway: string
  usd_ticker_url: string
}

export function useConfig():IConfig | null {
  const [config, setConfig] = React.useState(null);

  React.useEffect(() => {
    axios.get("/gui-settings").then((response) => {
      setConfig(response.data);
    });
  }, []);

  return config;
}
