import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { TypeBooks } from "@/types/books";
import { BookMarkedIcon, SignatureIcon } from "lucide-react";

export function SectionCards({ data }: { data: TypeBooks[] }) {
  const DataCards = filtrarLivrosMaisVendidos(data, 10, 4);

  return (
    <div className='*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4'>
      {DataCards.map((e, k) => {
        return (
          <Card className='@container/card' key={k}>
            <CardHeader>
              <CardDescription>Quantidade total</CardDescription>
              <CardTitle className='text-xl font-bold text-emerald-700 dark:text-emerald-500 tabular-nums @[250px]/card:text-3xl'>
                {limitarTexto(e.title)}
              </CardTitle>
              <CardAction>
                <Badge variant='outline'>
                  <BookMarkedIcon/>
                  {e.totalCopies}
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className='flex-col items-start gap-1.5 text-sm'>
              <div className='line-clamp-1 flex items-center gap-2 font-medium'>
                {e.author} <SignatureIcon className='size-4' />
              </div>
              <div className='text-muted-foreground'>
                {e.publisher}
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}

function filtrarLivrosMaisVendidos(livros: TypeBooks[], minimo: number, limite: number): TypeBooks[] {
  return livros.filter(book => book.totalCopies > minimo)
    .sort((a, b) => b.totalCopies - a.totalCopies)
    .slice(0, limite);
}

function limitarTexto(texto: string, limite = 50): string {
  return texto.length > limite ? texto.slice(0, limite) + "..." : texto;
}