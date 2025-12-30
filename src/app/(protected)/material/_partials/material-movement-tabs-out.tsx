"use client";

import { FormWrapper } from "#/components/form-wrapper";
import { Button } from "#/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { Label } from "#/components/ui/label";
import { TabsContent } from "#/components/ui/tabs";
import {
  BoltIcon,
  HashIcon,
  MapPinIcon,
  MinusIcon,
  PlusIcon,
  StickyNoteIcon,
} from "lucide-react";
import { useState } from "react";
import { materialOut } from "./action";

export default function MaterialMovementTabsOut({
  materialId,
}: {
  materialId: string;
}) {
  const [qty, setQty] = useState(0);

  const increment = () => {
    setQty((v) => v + 1);
  };

  const decrement = () => {
    setQty((v) => Math.max(0, v - 1));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setQty(Number.isNaN(value) ? 0 : Math.max(0, value));
  };

  return (
    <TabsContent value="out">
      <FormWrapper action={materialOut}>
        <input type="hidden" name="materialId" value={materialId} />
        <div className="p-4 bg-muted rounded-sm border">
          <h1 className="text-xl font-bold">Keterangan</h1>
          <div className="space-y-2 mt-4">
            <Label>Pekerjaan</Label>
            <InputGroup className="bg-background">
              <InputGroupAddon>
                <BoltIcon />
              </InputGroupAddon>
              <InputGroupInput name="job" required />
            </InputGroup>
          </div>
          <div className="space-y-2 mt-4">
            <Label>Lokasi Pekerjaan</Label>
            <InputGroup className="bg-background">
              <InputGroupAddon>
                <MapPinIcon />
              </InputGroupAddon>
              <InputGroupInput name="location" required />
            </InputGroup>
          </div>
          <div className="space-y-2 mt-4">
            <Label>Catatan (opsional)</Label>
            <InputGroup className="bg-background">
              <InputGroupAddon>
                <StickyNoteIcon />
              </InputGroupAddon>
              <InputGroupInput name="note" />
            </InputGroup>
          </div>
        </div>
        <div className="p-4 border bg-muted mt-2 rounded-sm flex gap-2">
          <Button onClick={decrement} disabled={qty === 0}>
            <MinusIcon />
          </Button>
          <InputGroup className="bg-background">
            <InputGroupAddon>
              <HashIcon />
            </InputGroupAddon>
            <InputGroupInput
              name="quantity"
              type="number"
              min={0}
              value={qty}
              onChange={onChange}
            />
          </InputGroup>
          <Button onClick={increment}>
            <PlusIcon />
          </Button>
        </div>
        <Button type="submit" className="w-full mt-2">
          Catat
        </Button>
      </FormWrapper>
    </TabsContent>
  );
}
