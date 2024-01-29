"use client";

import { useSelector } from "react-redux";
import { LineChart, Line, ResponsiveContainer, YAxis, Tooltip } from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-2">
        <p className="text-black/40 font-bold text-sm">1 ETH =</p>
        <p className="text-black/80 font-bold text-lg">
          {Number(payload[0].value).toFixed(3)}
        </p>
      </div>
    );
  }

  return null;
};

export default function Balance() {
  const balance = useSelector((state) => state.data.balance);
  const ethPrice = useSelector((state) => state.data.ethPrice);
  const marketData = useSelector((state) => state.data.marketData);

  return (
    <div className="h-full w-full bg-white rounded-3xl flex flex-col p-5 px-7">
      <div className="flex justify-between items-end">
        <p className="text-5xl font-bold text-black/50 mt-5">Balance</p>

        <div className="flex flex-col items-center">
          <p className="text-black/50 text-sm">Last 24h</p>
          <p className="text-black/80 text-sm ml-2">
            {marketData &&
            marketData.length > 0 &&
            marketData[0].closing_price > marketData[1].closing_price
              ? "+"
              : "-"}
            {Number(
              Math.abs(
                marketData &&
                  marketData.length > 0 &&
                  ((marketData[0].closing_price - marketData[1].closing_price) /
                    marketData[0].closing_price) *
                    100
              )
            ).toFixed(2)}{" "}
            %
          </p>
        </div>
      </div>

      <p className="text-6xl text-black/80 font-extrabold mt-5">
        {" "}
        ${balance === "-.--" ? balance : (balance * ethPrice).toFixed(3)}
      </p>

      <p className="mt-2 text-2xl font-bold text-black/60">
        {balance === "-.--" ? balance : Number(balance).toFixed(3)} ETH
      </p>

      {marketData && marketData.length > 0 && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={marketData}
            margin={{
              top: 5,
              right: 10,
              left: 10,
              bottom: 0,
            }}
          >
            <Line
              type="monotone"
              strokeWidth={2}
              dataKey="closing_price"
              activeDot={{
                r: 6,
                style: { fill: "#000000", opacity: 0.25 },
              }}
              style={{
                stroke: "#000000",
              }}
            />
            <YAxis domain={["dataMin + 0.1", "dataMax + 0.1"]} hide />
            <Tooltip content={<CustomTooltip />} />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
