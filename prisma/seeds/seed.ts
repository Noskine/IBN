import { prisma } from "../../lib/prisma";
import { hash } from "bcryptjs";

async function main() {
  const user = await prisma.user.findUnique({
    where: {email: "sonay021@ibn.org"}
  })

  if (!user) {
     prisma.user.create({
    data: {
        name: "Enikson Sonay",
        email: "sonay021@ibn.org",
        pass: await hash("Enikson@1", 10),
        isAdm: "Yes",
        urlImage: "https://avatars.githubusercontent.com/u/112139254",
      },
    }).finally(() => console.log("Banco de dados criado! 👍✅"))
  }

  
 return console.log("Banco de dados já criado! 🏦🎲")
}

main();