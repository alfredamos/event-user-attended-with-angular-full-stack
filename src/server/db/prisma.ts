import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import dotenv from "dotenv";
import {PrismaClient} from "../../generated/prisma/client";


dotenv.config({override: true,quiet: true});

function adapterParameters(){
    return {
        user: process.env['USER'],
        password: process.env['PASSWORD'],
        host: process.env['HOST'],
        port: process.env['MYSQL_PORT'],
        database: process.env['DATABASE'],
        connectionLimit: parseInt(process.env['CONNECTION_LIMIT'] as string),
        connectTimeout: parseInt(process.env['CONNECT_TIMEOUT'] as string),

    }
}

const parameters = adapterParameters();


const mysqlPool = {
    host: parameters.host,
    user: parameters.user,
    password: parameters.password,
    database: parameters.database,
    connectionLimit: parameters.connectionLimit,
    bigIntAsNumber: true,
    trace: true

}

const adapter = new PrismaMariaDb(mysqlPool);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
    globalForPrisma.prisma ||
    new PrismaClient({
        adapter,
        // log: ['query']
    });


if (process.env['NODE_ENV'] !== "production") globalForPrisma.prisma = prisma;




