'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./globals.css"
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const options = [5, 10, 15, 25, 50];
  const [billValue, setBillValue] = useState(0.0);
  const [peopleCount, setPeopleCount] = useState(0);

  const [tip, setTip] = useState(0.0);
  const [cost, setCost] = useState(0.0);

  const handleBillChange = (e: { target: { value: any; }; }) => {
    const inputValue = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setBillValue(inputValue);
    }
  }

  const handlePeopleChange = (e: { target: { value: any; }; }) => {
    const inputValue = e.target.value;
    // Allow only numbers
    if (/^\d*$/.test(inputValue)) {
      setPeopleCount(Number(inputValue));
    }
  }

  const computeTip = () => {
    if(!peopleCount) return 0.0;
    return (billValue * tip) / peopleCount;
  }

  const computeTotal = () => {
    if(!peopleCount) return 0.0;
    return (billValue / peopleCount) + computeTip();
  }

  return (
    <div className="bg-amber-50 grid h-60 grid-cols-2 p-5 place-content-center m-30">
      {/* 1st Half */}
      <div>
        <div>
          <div>
            <Label>Bill</Label>
            <Input 
              id="billInput" 
              type="email" 
              placeholder="0" 
              value={billValue === 0 ? '' : billValue}
              onChange={handleBillChange}
              />
          </div>
        </div>

        <div>
          <Label>Select Tip</Label>
        </div>

        <div className="grid h-25 grid-cols-3">
          {options.map(v => {
            return <Button 
              key={v} 
              variant="default" 
              size="default"
              onClick={() => setTip(v / 100)}
              >{
                v}%
              </Button>
          })}
          <Button variant="secondary" size="default">Custom</Button>
        </div>
        
        <div>
          <Label>Number of People</Label>
          <Input 
            id="peopleInput" 
            type="email" 
            placeholder="0"
            value={peopleCount === 0 ? '' : peopleCount}
            onChange={handlePeopleChange}
            />
        </div>
      </div>

      {/* 2nd Half */}
      <div className="bg-emerald-700 p-5">
        <div className="grid h-30 grid-cols-2">
          <div>
            <div>
              <Label>Tip Amount</Label>
              <p>/ person</p>
            </div>

            <div>
              <Label>Total</Label>
              <p>/ person</p>
            </div>
          </div>

          <div>
            <div>
              <h1>${computeTip().toFixed(2)}</h1>
            </div>

            <div>
              <h1>${computeTotal().toFixed(2)}</h1>
            </div>
          </div>
        </div>

        <div>
          <Button variant="secondary" size="default">Reset</Button>
        </div>

      </div>
    </div>
  );
}
