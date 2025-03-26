import {UsersModule} from "../database/modules/UsersModule";
import {BotStatsCommand} from "../../../../core/commands/BotStatsCommand";
import {AliasesModule} from "../database/modules/AliasesModule";

export class InitClass {

    public static initAll() : void {
        this.initDatabase();
        this.initExecutors();
    }

    private static initDatabase() : void {
        new UsersModule();
        new AliasesModule();
    }

    private static initExecutors() : void {
        new BotStatsCommand();
    }

}