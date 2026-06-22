import * as React from "react";
import { Spacer } from "@nextui-org/react";
import { MyCard } from "../MyCard";
import { IBalanceProps, formatNumber } from "./Address";

export function Balance({ balance, baseCurrency, usdRate }: IBalanceProps) {
  const balanceAmount = balance / 100000000;
  if (usdRate) {
    const base = (
      <MyCard header={baseCurrency} body={formatNumber(balanceAmount)}></MyCard>
    );
    const usd = (
      <MyCard
        header="USD"
        body={formatNumber(balanceAmount * usdRate)}
      ></MyCard>
    );
    const tutti = (
      <div>
        {base}
        <Spacer />
        {usd}
      </div>
    );

    return <MyCard header="Balance" body={tutti} />;
  }

  return <MyCard header="Balance" body={formatNumber(balanceAmount)}></MyCard>;
}
