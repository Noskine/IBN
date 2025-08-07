"use client";

import * as React from "react";
import { DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

type IsBarcodeProps = {
  id: string;
};

export function IsBarcode({ id }: IsBarcodeProps) {
  const [code, setCode] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/book?id=${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code }),
      });

      if (res.ok) {
        toast.success("Código de Barras registrado! 👍");
        setTimeout(() => window.location.reload(), 1000);
      } else {
        toast.error("Algo de errado aconteceu! ❌");
      }
    } catch (error) {
      console.error(error);
      toast.error("Erro de rede! ❌");
    }
  };

  return (
    <DialogContent>
      <DialogHeader className="border-b">
        <DialogTitle className="font-bold text-2xl">
          Atualizar o código de barras
        </DialogTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-4">
        <div className="space-y-1">
          <Label htmlFor="code">Código de barras</Label>
          <Input
            id="code"
            name="barcode"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
        </div>

        <DialogFooter>
          <Button type="submit">Atualizar</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
