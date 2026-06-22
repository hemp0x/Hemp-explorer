import fs from "fs";

const defaultConfig = {
  baseCurrency: "HEMP",
  rpc_password: "anonymous",
  rpc_username: "anonymous",
  rpc_url: "http://127.0.0.1:8766",
  httpPort: 80,
  headline: "Hemp0x Mainnet",
  theme: "dark",
  ipfs_gateway: "https://cloudflare-ipfs.com/ipfs/",
  usd_ticker_url: "",
};
const PROMPT_USER_TO_UPDATE_MESSAGE =
  "Please update your ./config.json file with your info";
export default function getConfig() {
  createConfigIfNeeded();

  const text = Buffer.from(fs.readFileSync("./config.json"));
  const config = JSON.parse(text);
  validateConfig(config);

  return config;
}

function createConfigIfNeeded() {
  if (fs.existsSync("./config.json") === false) {
    const text = JSON.stringify(defaultConfig, null, 4);
    fs.writeFileSync("./config.json", text);
  }
}

function validateConfig(config) {
  if (!config.rpc_password) {
    throw new Error(PROMPT_USER_TO_UPDATE_MESSAGE);
  }
}
