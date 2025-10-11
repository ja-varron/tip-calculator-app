"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./globals.css";
import { Label } from "@/components/ui/label";
import { useMemo, useState } from "react";

export default function Home() {
  // Tip options in percent
  const options = [5, 10, 15, 25, 50];

  // Form state (strings so inputs are fully controlled)
  const [bill, setBill] = useState<string>("");
  const [people, setPeople] = useState<string>("");
  const [selectedTip, setSelectedTip] = useState<number | null>(null); // percent
  const [customTip, setCustomTip] = useState<string>("");

  // Derived numbers
  const billNum = useMemo(() => parseFloat(bill) || 0, [bill]);
  const peopleNum = useMemo(() => parseInt(people) || 0, [people]);
  const tipRate = useMemo(() => {
    const pct = selectedTip ?? (parseFloat(customTip) || 0);
    return pct / 100;
  }, [selectedTip, customTip]);

  const tipAmountPerPerson = useMemo(() => {
    if (!peopleNum) return 0;
    return (billNum * tipRate) / peopleNum;
  }, [billNum, tipRate, peopleNum]);

  const totalPerPerson = useMemo(() => {
    if (!peopleNum) return 0;
    return billNum / peopleNum + tipAmountPerPerson;
  }, [billNum, tipAmountPerPerson, peopleNum]);

  const resetDisabled = billNum === 0 && peopleNum === 0 && tipRate === 0;
  const peopleIsZero = people !== "" && peopleNum === 0; // show error only if user touched input

  return (
    <div className="w-full max-w-4xl px-4 md:px-0">
      {/* Title */}
      <div className="mb-8 md:mb-12 text-center text-[#5e7a7d] tracking-[0.6em] font-extrabold">
        <span className="block text-2xl md:text-3xl leading-none">SPLI</span>
        <span className="block text-2xl md:text-3xl leading-none">TTER</span>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.25)] p-6 md:p-8 grid gap-6 md:gap-8 md:grid-cols-2">
        {/* Left: Form */}
        <div className="space-y-6">
          {/* Bill */}
          <div>
            <Label className="text-[#5e7a7d] text-sm mb-2 inline-block">Bill</Label>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7f9c9f] font-bold text-lg">$</span>
              <Input
                id="billInput"
                inputMode="decimal"
                placeholder="0"
                value={bill}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*(?:\.\d{0,2})?$/.test(value)) setBill(value);
                }}
                className="h-12 md:h-14 bg-[#f3f8fb] text-right pr-4 pl-9 text-2xl md:text-3xl font-extrabold text-[#00474B] placeholder:text-[#a9c1c3] focus-visible:ring-2 focus-visible:ring-[#26C2AE]"
              />
            </div>
          </div>

          {/* Select Tip % */}
          <div>
            <Label className="text-[#5e7a7d] text-sm mb-2 inline-block">Select Tip %</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {options.map((v) => {
                const selected = selectedTip === v;
                return (
                  <Button
                    key={v}
                    type="button"
                    onClick={() => {
                      setSelectedTip(v);
                      setCustomTip("");
                    }}
                    className={[
                      "h-12 md:h-14 rounded-lg font-extrabold text-lg md:text-xl",
                      selected
                        ? "bg-[#26C2AE] text-[#00474B] hover:bg-[#26C2AE]"
                        : "bg-[#00474B] text-white hover:bg-[#9FE8DF] hover:text-[#00474B]",
                    ].join(" ")}
                  >
                    {v}%
                  </Button>
                );
              })}

              {/* Custom tip input */}
              <Input
                id="customTip"
                placeholder="Custom"
                inputMode="numeric"
                value={customTip}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d{0,3}$/.test(value)) {
                    setCustomTip(value);
                    setSelectedTip(null);
                  }
                }}
                className="h-12 md:h-14 rounded-lg bg-[#f3f8fb] text-center font-extrabold text-lg md:text-xl text-[#00474B] placeholder:text-[#547878] focus-visible:ring-2 focus-visible:ring-[#26C2AE]"
              />
            </div>
          </div>

          {/* Number of People */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <Label className="text-[#5e7a7d] text-sm">Number of People</Label>
              {peopleIsZero && (
                <span className="text-[#E17457] text-sm font-semibold">Can't be zero</span>
              )}
            </div>
            <div className="relative">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#7f9c9f] font-bold">👤</span>
              <Input
                id="peopleInput"
                inputMode="numeric"
                placeholder="0"
                value={people}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) setPeople(value);
                }}
                className={[
                  "h-12 md:h-14 bg-[#f3f8fb] text-right pr-4 pl-10 text-2xl md:text-3xl font-extrabold text-[#00474B] placeholder:text-[#a9c1c3] focus-visible:ring-2 focus-visible:ring-[#26C2AE]",
                  peopleIsZero ? "ring-2 ring-[#E17457]" : "",
                ].join(" ")}
              />
            </div>
          </div>
        </div>

        {/* Right: Results */}
        <div className="bg-[#00474B] rounded-xl p-6 md:p-8 flex flex-col gap-6 md:gap-8 justify-between">
          <div className="space-y-6 md:space-y-8">
            {/* Tip Amount */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold leading-tight">Tip Amount</p>
                <p className="text-[#7f9c9f] text-sm">/ person</p>
              </div>
              <div className="text-[#26C2AE] text-4xl md:text-5xl font-extrabold">
                ${tipAmountPerPerson.toFixed(2)}
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-semibold leading-tight">Total</p>
                <p className="text-[#7f9c9f] text-sm">/ person</p>
              </div>
              <div className="text-[#26C2AE] text-4xl md:text-5xl font-extrabold">
                ${totalPerPerson.toFixed(2)}
              </div>
            </div>
          </div>

          <Button
            type="button"
            disabled={resetDisabled}
            onClick={() => {
              setBill("");
              setPeople("");
              setSelectedTip(null);
              setCustomTip("");
            }}
            className="mt-2 h-12 md:h-14 rounded-lg font-extrabold bg-[#26C2AE] text-[#00474B] hover:bg-[#9FE8DF] disabled:opacity-30 disabled:hover:bg-[#26C2AE]"
          >
            RESET
          </Button>
        </div>
      </div>
    </div>
  );
}
