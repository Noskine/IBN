import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const password = await hash("Admin123!", 10);
  await prisma.user.upsert({
    where: { email: "admin@ibn.local" },
    update: { name: "Admin de Teste", pass: password, isAdm: "Yes" },
    create: {
      name: "Admin de Teste",
      email: "admin@ibn.local",
      pass: password,
      isAdm: "Yes",
    },
  });

  const categoryData = ["Teologia", "História", "Literatura"];
  const categories = await Promise.all(
    categoryData.map((name) =>
      prisma.category.upsert({
        where: { name },
        update: {},
        create: { name },
      }),
    ),
  );

  const bookData = [
    { title: "Introdução à Teologia", author: "Marcos Silva", barcode: "TEST-BOOK-001", categoryId: categories[0].id },
    { title: "História da Igreja", author: "Ana Costa", barcode: "TEST-BOOK-002", categoryId: categories[1].id },
    { title: "Caminhos da Fé", author: "Lucas Almeida", barcode: "TEST-BOOK-003", categoryId: categories[2].id },
  ];
  const books = await Promise.all(
    bookData.map(({ barcode, ...data }) =>
      prisma.book.upsert({
        where: { barcode },
        update: { ...data, totalCopies: 3, availableCopies: 2 },
        create: { ...data, barcode, totalCopies: 3, availableCopies: 2 },
      }),
    ),
  );

  const peopleData = [
    { name: "João de Teste", email: "joao@ibn.local", status: "DICENTE" as const, course: "Teologia" },
    { name: "Maria de Teste", email: "maria@ibn.local", status: "DICENTE" as const, course: "História" },
    { name: "Professor de Teste", email: "professor@ibn.local", status: "DOCENTE" as const, course: "Teologia" },
  ];
  const people = await Promise.all(
    peopleData.map((data) =>
      prisma.people.upsert({
        where: { email: data.email },
        update: data,
        create: data,
      }),
    ),
  );

  const loanDate = new Date();
  const dueDate = new Date(loanDate);
  dueDate.setDate(dueDate.getDate() + 14);

  await prisma.loan.upsert({
    where: { id: "seed-loan-001" },
    update: { peopleId: people[0].id, bookId: books[0].id, loanDate, dueDate, status: "ACTIVE" },
    create: {
      id: "seed-loan-001",
      peopleId: people[0].id,
      bookId: books[0].id,
      loanDate,
      dueDate,
      status: "ACTIVE",
    },
  });

  await prisma.attendance.upsert({
    where: { id: "seed-attendance-001" },
    update: { peopleId: people[0].id, entryAt: loanDate, observation: "Registro de teste" },
    create: {
      id: "seed-attendance-001",
      peopleId: people[0].id,
      entryAt: loanDate,
      observation: "Registro de teste",
    },
  });

  console.log("Dados de teste criados/atualizados.");
  console.log("Login: admin@ibn.local | Senha: Admin123!");
}

main()
  .catch((error) => {
    console.error("Falha ao criar dados de teste:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });