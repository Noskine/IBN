import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Fazer login na sua conta</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Digite seu e-mail abaixo para fazer login na sua conta
        </p>
      </div>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label className=" text-emerald-800 dark:text-emerald-500 font-bold" htmlFor="email">Email</Label>
          <Input className="rounded-xl bg-zinc-300 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0 shadow-black/20 shadow-md" id="email" type="email" name="email" placeholder="exemplo@ibn.org" required />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password" className="text-emerald-800 dark:text-emerald-500 font-bold">
              Password
            </Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Esqueceu sua senha?
            </a>
          </div>
          <Input id="password" className="rounded-xl bg-zinc-300 border-zinc-300 focus:ring-emerald-500 focus:ring-2 focus:ring-offset-0 dark:bg-zinc-800 dark:border-zinc-700 dark:focus:ring-emerald-400 dark:focus:ring-offset-0 shadow-black/20 shadow-md" type="password" name="password" required />
        </div>
        <Button type="submit" className="w-full bg-emerald-700 dark:bg-emerald-500 hover:bg-emerald-700 focus:bg-emerald-800 cursor-pointer">
          Entrar
        </Button>
        
      </div>
    </form>
  )
}
