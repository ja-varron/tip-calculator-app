'use client';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import "./globals.css"
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function Home() {
  const options = [5, 10, 15, 25, 50];
  const [value, setValue] = useState('');

  const handleChange = (e: { target: { value: any; }; }) => {
    const inputValue = e.target.value;
    // Allow only numbers and decimal point
    if (/^\d*\.?\d*$/.test(inputValue)) {
      setValue(inputValue);
    }
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
              value={value}
              onChange={handleChange}
              />
          </div>
        </div>

        <div>
          <Label>Select Tip</Label>
        </div>

        <div className="grid h-25 grid-cols-3">
          {options.map(v => {
            return <Button key={v} variant="default" size="default">{v}%</Button>
          })}
          <Button variant="secondary" size="default">Custom</Button>
        </div>
        
        <div>
          <Label>Number of People</Label>
          <Input type="email" placeholder="0" />
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
              <h1>$0.00</h1>
            </div>

            <div>
              <h1>$0.00</h1>
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
