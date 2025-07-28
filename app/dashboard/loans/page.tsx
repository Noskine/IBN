"use client";

import { LoanTable } from "@/components/data-table-loans";
import React from "react";



export default function NewUserPage() {
  const [loans, setLoans] = React.useState([]);

  React.useEffect(() => {
    fetch("/api/loan").then((res) =>
      res.json().then((data) => {
        console.log(data);
        setLoans(data);
      })
    );
  }, []);
  return (
    <div className="px-6 mt-6 lg:px-4">
      <LoanTable data={loans!} />
    </div>
  );
}
