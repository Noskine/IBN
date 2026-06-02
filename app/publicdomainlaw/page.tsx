export default function DominioPublicoPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-16">
      <div className="mx-auto max-w-4xl px-6">
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <h1 className="mb-6 text-4xl font-bold text-slate-900">
            Por que nossos livros são de domínio público?
          </h1>

          <p className="mb-6 text-lg leading-relaxed text-slate-700">
            A Biblioteca Pública do Instituto Bíblico do Norte (IBN) tem o
            compromisso de disponibilizar obras clássicas para estudo,
            pesquisa e edificação cristã, respeitando integralmente a
            legislação de direitos autorais vigente.
          </p>

          <div className="space-y-6">
            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-800">
                O que é domínio público?
              </h2>

              <p className="leading-relaxed text-slate-600">
                Uma obra entra em domínio público quando os direitos
                patrimoniais de autor expiraram. No Brasil, em regra, isso
                ocorre 70 anos após a morte do autor, contados a partir de
                1º de janeiro do ano seguinte ao seu falecimento. Após esse
                período, a obra pode ser reproduzida, distribuída e estudada
                livremente, desde que sejam preservados os direitos morais do
                autor, como o reconhecimento de sua autoria.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-800">
                Nossa política de seleção
              </h2>

              <p className="leading-relaxed text-slate-600">
                Todos os livros disponibilizados em nosso acervo digital
                passam por uma análise prévia para verificar sua situação
                jurídica. Priorizamos obras que estejam comprovadamente em
                domínio público ou cuja disponibilização seja autorizada por
                seus respectivos detentores de direitos autorais.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-800">
                Obras clássicas da tradição cristã
              </h2>

              <p className="leading-relaxed text-slate-600">
                Muitas das obras presentes em nossa biblioteca foram
                publicadas há séculos e possuem grande relevância histórica,
                teológica e acadêmica. Textos de autores como João Calvino,
                Martinho Lutero, João Knox, Jonathan Edwards e diversos
                outros reformadores já pertencem ao domínio público em suas
                versões originais, permitindo sua preservação e difusão para
                as novas gerações.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-800">
                Compromisso com a legalidade
              </h2>

              <p className="leading-relaxed text-slate-600">
                O IBN não incentiva nem promove a distribuição ilegal de
                obras protegidas por direitos autorais. Caso algum material
                disponibilizado apresente qualquer questionamento jurídico,
                nossa equipe realizará a análise necessária e adotará as
                medidas cabíveis para garantir o cumprimento da legislação.
              </p>
            </section>

            <section>
              <h2 className="mb-3 text-2xl font-semibold text-slate-800">
                Preservando o conhecimento
              </h2>

              <p className="leading-relaxed text-slate-600">
                A disponibilização de obras em domínio público contribui para
                a preservação do patrimônio intelectual cristão e amplia o
                acesso ao conhecimento. Nosso objetivo é oferecer recursos
                confiáveis para estudantes, pesquisadores, pastores e todos
                aqueles que desejam aprofundar seus estudos bíblicos e
                teológicos.
              </p>
            </section>
          </div>

          <div className="mt-10 rounded-xl border border-emerald-200 bg-emerald-50 p-6">
            <h3 className="mb-2 text-lg font-semibold text-emerald-800">
              Importante
            </h3>

            <p className="text-emerald-700">
              A presença de uma obra em nosso acervo digital não significa
              automaticamente que qualquer edição moderna dela esteja em
              domínio público. Traduções, comentários, notas editoriais e
              revisões recentes podem possuir proteção autoral própria,
              mesmo quando o texto original já pertence ao domínio público.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}