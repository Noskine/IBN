export type TypeBooks = {
  id: string;
  title: string;
  author: string;
  publisher: string;
  totalCopies: number;
  availableCopies: number;
  category: {
    name: string;
    id: string;
  }
  barcode: string;
};