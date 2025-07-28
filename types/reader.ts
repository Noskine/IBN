export type ReaderType = {
  id: string
  name: string
  status: 'DICENTE' | 'DOCENTE' | string // adicione mais se necessário
  course: {
    name: 'CPI' | 'CPO' | string         // adicione mais se necessário
    year: string                         // exemplo: "2025/2026"
  }
  loans: Loan[]
}

type Loan = {
  book: Book
  loanDate: string     // formato ISO: "2025-07-14T17:11:41.494Z"
  dueDate: string
  returnDate: string | null
  status: 'ACTIVE' | 'LATE' | 'RETURNED' | string
}

type Book = {
  title: string
  author: string
  publisher: string
  barcode: string
}
