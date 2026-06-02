import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const adminEmail = "sonay021@ibn.org";
  const admin = await prisma.user.findUnique({ where: { email: adminEmail } });

  if (!admin) {
    await prisma.user.create({
      data: {
        name: "Enikson Sonay",
        firstName: "Enikson",
        lastName: "Sonay",
        email: adminEmail,
        pass: await hash("Enikson@1", 10),
        className: "Biblioteca",
        year: "2026",
        role: "ADMIN",
        isAdm: "Yes",
        urlImage: "https://avatars.githubusercontent.com/u/112139254",
      },
    });
    console.log("Conta do bibliotecário criada! 👍✅");
  }

  const students = [
    {
      name: "Maria Souza",
      firstName: "Maria",
      lastName: "Souza",
      email: "maria.souza@ibn.org",
      pass: "Aluno@123",
      className: "Turma A",
      year: "2026",
      role: "STUDENT",
      urlImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      name: "João Pereira",
      firstName: "João",
      lastName: "Pereira",
      email: "joao.pereira@ibn.org",
      pass: "Aluno@123",
      className: "Turma B",
      year: "2025",
      role: "STUDENT",
      urlImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
    {
      name: "Ana Lima",
      firstName: "Ana",
      lastName: "Lima",
      email: "ana.lima@ibn.org",
      pass: "Aluno@123",
      className: "Turma A",
      year: "2025",
      role: "STUDENT",
      urlImage: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
    },
  ];

  for (const student of students) {
    const existing = await prisma.student.findUnique({ where: { email: student.email } });
    if (!existing) {
      await prisma.student.create({
        data: {
          name: student.name,
          firstName: student.firstName,
          lastName: student.lastName,
          email: student.email,
          pass: await hash(student.pass, 10),
          className: student.className,
          year: student.year,
          urlImage: student.urlImage,
        },
      });
      console.log(`Conta de aluno criada: ${student.email}`);
    }
  }

  console.log("Seed concluído! 🏫📚");
}

main();
