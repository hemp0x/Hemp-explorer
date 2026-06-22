# Hemp0x Explorer

The official block explorer for the [hemp0x](https://hemp0x.com) blockchain. Talks directly to a local `hemp0xd` node over JSON-RPC, no separate indexer required.

Forked from [ravenrebels/rebel-explorer](https://github.com/ravenrebels/rebel-explorer) and rewired for hemp0x. Live at [explorer.hemp0x.com](https://explorer.hemp0x.com).

## About hemp0x

Hemp0x is a fair-launch proof-of-work blockchain forked from Ravencoin. Genesis was December 18 2025. No premine, no dev tax. The chain inherits the full Ravencoin asset layer at block 1 (root assets, sub-assets, unique NFTs, restricted assets, qualifiers, message channels) plus IPFS metadata for NFT artwork.

Chain parameters worth knowing:

- 5-second block target
- 10 HEMP block reward, halving every 25,000,000 blocks
- 420,000,000 HEMP supply cap
- Mainnet P2PKH prefix `60` (addresses start with H)
- SLIP-44 coin type `420`
- Mainnet p2p port `42069`, RPC port `8766`
- Testnet p2p port `42068`, RPC port `18766`
- Difficulty: Dark Gravity Wave from block 1
- PoW: launched on X16R, transitions to KAWPOW once the trailing 180-block window flips past the activation gate (unix ts `1766126932`, Dec 26 2025)

Burn addresses keep the Ravencoin `RX` prefix on purpose for asset-issuance compatibility.

## Community

- Main site: [hemp0x.com](https://hemp0x.com)
- Social (Nostr-based): [hemp0x.social](https://hemp0x.social)
- Discord: [discord.com/invite/Eu4UsYPMGS](https://discord.com/invite/Eu4UsYPMGS)
- Node software: [hemp0x/hemp0x-core](https://github.com/hemp0x/hemp0x-core)
- Wallet (Commander): [hemp0x/hemp0x-commander](https://github.com/hemp0x/hemp0x-commander)

## Run your own instance

### Requirements

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

### Install

```
git clone https://github.com/hemp0x/Hemp-explorer.git
cd Hemp-explorer
npm install
npm run build
```

### Configure

Copy the sample config and fill in your RPC credentials:

```
cp config.example.json config.json
```

Defaults assume mainnet (`http://127.0.0.1:8766`) and base currency `HEMP`. If `config.json` is missing on first start, one is auto-created from the defaults in `getConfig.js`.

### USD price ticker

`usd_ticker_url` is empty by default. The explorer treats USD price as opt-in: when blank, the GUI hides every USD price card and just shows native HEMP amounts. Once HEMP has a public price feed, set the field to a URL returning `{ "price": "<number>" }` (Binance-compatible shape) and the USD cards turn back on automatically. Until then, no third-party price call ever fires from the client.

### Start

```
npm start
```

Then open `http://localhost:<httpPort>`.

### Docker

```
docker build -t hemp0x-explorer .
docker run --rm -p 8080:8080 \
  -v $(pwd)/config.json:/app/config.json:ro \
  hemp0x-explorer
```

The image listens on `8080` by default (override via `PORT` env or `httpPort` in `config.json`). Mount your `config.json` read-only.

### GUI development

```
npm run dev
```

Parcel watches the `gui/` folder and rebuilds on save.

## Differences from upstream `rebel-explorer`

This fork only touches what hemp0x needs:

- Default RPC URL, port, and base currency target hemp0x mainnet (not Ravencoin testnet)
- USD price widget is gated behind `usd_ticker_url` instead of hardcoding Binance `RVNUSDT`
- Address history view threads `baseCurrency` through to `@ravenrebels/ravencoin-history-list` so HEMP base-currency deltas categorize correctly
- Footer link points at hemp0x.com (upstream credit preserved)
- Dockerfile + `config.example.json` for prod deploy

The underlying RPC method names (`getblock`, `getaddressbalance`, `listassets`, etc.) are stock Ravencoin/Bitcoin RPC and exist on `hemp0xd` verbatim, so no client-side patching of method names is required.

## License

MIT, inherited from upstream.
