import {DatabaseParams} from "modular-orm";

export namespace System {

    export const DATABASE_CONNECTION_DATA : DatabaseParams = {
        host: process.env['MYSQL_HOST'] ?? 'localhost',
        database: process.env['MYSQL_DATABASE'] ?? 'default',
        user: process.env['MYSQL_USER'] ?? 'root',
        password: process.env['MYSQL_PASSWORD']?.replace('null', '').trim() ?? '',
        port: +(process.env['MYSQL_PORT'] ?? 3306),
    }

    export const VK_BOT_TOKEN : string = process.env['BOT_TOKEN'] ?? 'null';

    export const ADMINS : Set<number> = new Set([580255992])

}