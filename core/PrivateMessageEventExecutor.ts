import {PrivateMessageBaseExecutor} from "../api/classes/impl/executors/PrivateMessageBaseExecutor";
import {PrivateMessageEvent} from "../api/classes/impl/events/PrivateMessageEvent";
import {Some} from "../api/types/Some";
import {User} from "../api/classes/impl/entity/User";
import {PrivateCommandEvent} from "../api/classes/impl/events/PrivateCommandEvent";

export class PrivateMessageEventExecutor extends PrivateMessageBaseExecutor {

    public override async execute(message: PrivateMessageEvent): Some {
        const sender : User = message.sender;
        if (!sender.isExists) {
            await sender.register();
            return await message.sendLocalizedText(`first_user_message`)
        }

        if (sender.isAdmin) {
            const command : PrivateCommandEvent = new PrivateCommandEvent(message.apiEvent);
            if (!command.isCommand) return;
            return await command.executor.execute(command);
        }

    }

}