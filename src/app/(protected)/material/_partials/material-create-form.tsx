"use client";

import { FormWrapper } from "#/components/form-wrapper";
import { MaterialTypeSelect } from "#/app/(protected)/material/_partials/material-type-select";
import { Button } from "#/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "#/components/ui/input-group";
import { Label } from "#/components/ui/label";
import {
  AlertTriangle,
  BarcodeIcon,
  PackageIcon,
  RulerIcon,
  StickyNoteIcon,
} from "lucide-react";
import { useState } from "react";
import { createMaterial } from "./action";

interface MaterialCreateFormProps {
  materialTypes: { id: string; name: string }[];
}

export default function MaterialCreateForm({
  materialTypes,
}: MaterialCreateFormProps) {
  const [selectedType, setSelectedType] = useState<
    | {
        typeId?: string;
        typeName: string;
      }
    | undefined
  >();

  return (
    <FormWrapper action={createMaterial}>
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Nama Material</Label>
          <InputGroup>
            <InputGroupAddon>
              <PackageIcon />
            </InputGroupAddon>
            <InputGroupInput
              name="name"
              placeholder='Contoh: Pipa 4"'
              required
            />
          </InputGroup>
        </div>
        <div className="space-y-2">
          <Label>Jenis Material</Label>
          <MaterialTypeSelect
            value={selectedType}
            onChange={setSelectedType}
            materialTypes={materialTypes}
          />
          <input
            type="hidden"
            name="materialTypeName"
            value={selectedType?.typeName ?? ""}
          />
        </div>
        <div className="space-y-2">
          <Label>Kode Material (opsional)</Label>
          <InputGroup>
            <InputGroupAddon>
              <BarcodeIcon />
            </InputGroupAddon>
            <InputGroupInput name="code" placeholder="Contoh: FJW9040" />
          </InputGroup>
        </div>
        <div className="flex gap-2">
          <div className="space-y-2 flex-1">
            <Label>Stock Minimal</Label>
            <InputGroup>
              <InputGroupAddon>
                <AlertTriangle />
              </InputGroupAddon>
              <InputGroupInput
                name="stockMin"
                placeholder="Contoh: 120"
                type="number"
                required
              />
            </InputGroup>
          </div>
          <div className="space-y-2 flex-1">
            <Label>Satuan Material</Label>
            <InputGroup>
              <InputGroupAddon>
                <RulerIcon />
              </InputGroupAddon>
              <InputGroupInput name="uom" placeholder="Contoh: pcs" required />
            </InputGroup>
          </div>
        </div>
        <div className="space-y-2">
          <Label>Catatan Material (opsional)</Label>
          <InputGroup>
            <InputGroupAddon>
              <StickyNoteIcon />
            </InputGroupAddon>
            <InputGroupInput
              name="note"
              placeholder="Tambahkan keterangan singkat mengenai fungsi atau spesifikasi material"
            />
          </InputGroup>
        </div>
        <Button type="submit" className="w-full">
          Tambah
        </Button>
      </div>
    </FormWrapper>
  );
}
