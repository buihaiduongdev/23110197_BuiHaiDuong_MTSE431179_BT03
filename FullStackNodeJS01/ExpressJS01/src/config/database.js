require("dotenv").config();
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const connection = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to MySQL database via Prisma 6");
  } catch (error) {
    console.log(">>> Error connect to DB: ", error);
  }
};

module.exports = { connection, prisma };
