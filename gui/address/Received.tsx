import * as React from "react";
import { Spacer } from "@nextui-org/react";
import { MyCard } from "../MyCard";
import { IReceivedProps, formatNumber } from "./Address";

export function Received({
  baseCurrency,
  received,
  usdRate,
}: IReceivedProps) {
  const receivedAmount = Math.abs(received / 100000000);

  let usdDisplay = <div></div>;
  if (usdRate) {
    usdDisplay = (
      <MyCard header={"USD"} body={formatNumber(receivedAmount * usdRate)} />
    );
  }

  return (
    <MyCard
      header="Total received"
      body={
        <div>
          <MyCard header={baseCurrency} body={formatNumber(receivedAmount)} />
          <Spacer />
          {usdDisplay}
        </div>
      }
    />
  );
}
