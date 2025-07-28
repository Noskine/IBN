import bcrypt from "bcryptjs";

function main() {
  console.log(bcrypt.hashSync("Enikson@1", 10))
}

main();