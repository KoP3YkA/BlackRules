import {Human} from "../../base/entity/Human";
import {Nothing} from "../../../types/Nothing";
import {UserObject} from "../database/objects/UserObject";
import {UsersModule} from "../database/modules/UsersModule";
import {IUser} from "../../../interfaces/entity/IUser";
import {DatabaseAPI} from "modular-orm";
import {System} from "../../../namespace/System";
import {Main} from "../../../../Main";

export class User extends Human implements IUser {

    public userId: number;
    public isAdmin: boolean;
    public isBot: boolean;

    public id!: number;
    public isExists!: boolean;
    public findCount!: number;
    public correctCount!: number;

    public constructor(userId: number) {
        super();
        this.userId = userId;
        this.isAdmin = System.ADMINS.has(this.userId);
        this.isBot = userId < 1
    }

    public async initAll() : Nothing {
        const results : UserObject[] = await UsersModule.select({userId: this.userId});
        if (results.length < 1) {
            this.isExists = false;
            return
        } else this.isExists = true;
        const user : UserObject = results[0];
        Object.assign(this, user);
    }

    public async addFindCount() : Nothing {
        await new DatabaseAPI().databaseSetQuery({
            sql: `UPDATE users SET findCount = findCount + 1 WHERE userId = ?`,
            params: [this.userId]
        })
    }

    public async addCorrectCount() : Nothing {
        await new DatabaseAPI().databaseSetQuery({
            sql: `UPDATE users SET correctCount = correctCount + 1 WHERE userId = ?`,
            params: [this.userId]
        })
    }

    public async register() : Nothing {
        await UsersModule.create({
            userId: this.userId
        })
    }

    public static async instance(userId: number | string) : Promise<User> {
        if (typeof userId === 'string') {
            const userIdFromTag :number | null = await Main.getClientApi().getUserByTag(userId);
            if (!userIdFromTag) userId = 0;
            else userId = userIdFromTag;
        }

        const user : User = new User(userId);
        await user.initAll();
        return user;

    }

}