# Hemp0x Explorer

An RPC-driven block explorer for the [hemp0x](https://hemp0x.com) blockchain. Forked from [ravenrebels/rebel-explorer](https://github.com/ravenrebels/rebel-explorer) and rewired to talk to a local `hemp0xd` node over JSON-RPC.

## Requirements

- Node.js 20+ and npm
- A fully indexed `hemp0xd` node reachable over RPC. Your `hemp.conf` must include:
    ```
    txindex=1
    addressindex=1
    assetindex=1
    timestampindex=1
    spentindex=1
    rpcuser=<your_rpc_user>
    rpcpassword=<your_rpc_password>
    ```
    Default mainnet RPC port is `8766`.

## Install

```
git clone https://github.com/hemp0x/Hemp-explorer.git
cd Hemp-explorer
npm install
npm run build
```

## Configure

Copy the sample config and fill in your RPC credentials:

```
cp config.example.json config.json
```

Defaults assume mainnet (`http://127.0.0.1:8766`) and base currency `HEMP`. If `config.json` is missing on first start, one is auto-created from the defaults in `getConfig.js`.

### USD price ticker

`usd_ticker_url` is empty by default. The explorer treats USD price as opt-in: when blank, the GUI hides every USD price card and just shows native HEMP amounts. Once HEMP has a public price feed, set the field to a URL returning `{ "price": "<number>" }` (Binance-compatible shape) and the USD cards turn back on automatically. Until then, no Binance or RVN call ever happens client-side.

## Run

```
npm start
```

Then open `http://localhost:<httpPort>`.

## Docker

```
docker build -t hemp0x-explorer .
docker run --rm -p 8080:8080 \
  -v $(pwd)/config.json:/app/config.json:ro \
  hemp0x-explorer
```

The image listens on `8080` by default (override via `PORT` env or `httpPort` in `config.json`). Mount your `config.json` read-only.

## GUI development

```
npm run dev
```

Parcel watches the `gui/` folder and rebuilds on save.

## What was forked vs. upstream

This fork only touches what hemp0x needs:

- Default RPC URL, port, and base currency point at hemp0x mainnet
- USD price widget is gated behind `usd_ticker_url` instead of hardcoding Binance `RVNUSDT`
- Address history view threads `baseCurrency` through to `@ravenrebels/ravencoin-history-list` so HEMP deltas categorize correctly
- Footer link points at hemp0x.com (upstream credit preserved)
- Dockerfile + `config.example.json` for prod deploy

The underlying RPC method names (`getblock`, `getaddressbalance`, `listassets`, etc.) are stock Ravencoin/Bitcoin RPC and exist on `hemp0xd` verbatim, so no client-side patching of method names is required.
