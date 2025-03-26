import {PrivateCommandBaseExecutor} from "../../api/classes/impl/executors/PrivateCommandBaseExecutor";
import {PrivateCommandEvent} from "../../api/classes/impl/events/PrivateCommandEvent";
import {Some} from "../../api/types/Some";
import {NamedPrivateCommand} from "../../api/annotations/routing/NamedPrivateCommand";
import {UserFindCountSumObject, UserObject} from "../../api/classes/impl/database/objects/UserObject";
import {UsersModule} from "../../api/classes/impl/database/modules/UsersModule";
import {AliasObject} from "../../api/classes/impl/database/objects/AliasObject";
import {AliasesModule} from "../../api/classes/impl/database/modules/AliasesModule";
import {QueryBuilder, QueryType, SelectBuilder} from "modular-orm";

@NamedPrivateCommand('botstats')
@NamedPrivateCommand('bstats')
@NamedPrivateCommand('ботстата')
export class BotStatsCommand extends PrivateCommandBaseExecutor {

    public override async execute(message: PrivateCommandEvent): Some {
        const registeredMembers : UserObject[] = await UsersModule.select({});
        const aliases : AliasObject[] = await AliasesModule.select({moderated: true});
        const count : UserFindCountSumObject[] = await new QueryBuilder().setType(QueryType.SELECT)
            .setTable(UsersModule)
            .setSelect(new SelectBuilder().addSum('findCount', 'findCountSum'))
            .build().get(UserFindCountSumObject)

        await message.replyLocalizedText(`command_private_botstats`, {
            users: registeredMembers.length,
            aliases: aliases.length,
            found_rules: count[0].findCountSum
        })
    }

}