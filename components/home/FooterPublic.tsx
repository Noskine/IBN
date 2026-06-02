import Link from "next/link";

const FooterPublic = () => {
  return (
    <footer className="border-t bg-green-800 border-green-800/60 dark:bg-green-950 ">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 sm:flex-row sm:items-center sm:justify-between lg:px-[5%]">
        <div className="space-y-1">
          <p className="text-sm font-semibold text-white dark:text-white">Instituto Bíblico do Norte</p>
          <p className="text-xs text-shadow-yellow-500">
            © {new Date().getFullYear()} Instituto Bíblico do Norte. Todos os direitos reservados.
          </p>
        </div>

        <nav>
          <ul className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:gap-6">
            <li>
              <Link href="/privacy" className="text-zinc-700 hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400">
                  Política de Privacidade
              </Link>
            </li>
            <li>
              <Link href="/cookies" className="text-zinc-700 hover:text-emerald-700 dark:text-zinc-300 dark:hover:text-emerald-400">
                Termos de Serviço
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default FooterPublic;