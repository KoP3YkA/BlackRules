import {PrivateMessageEvent} from "./PrivateMessageEvent";
import {MessageContext} from "vk-io";
import {RoutingMaps} from "../../../namespace/RoutingMaps";
import {BaseExecutor} from "../../base/executor/BaseExecutor";
import {Nullable} from "../../../types/Nullable";
import {User} from "../entity/User";
import {Regex} from "../enums/Regex";

export class PrivateCommandEvent extends PrivateMessageEvent {

    public isCommand : boolean = false;
    public command!: string;
    public args!: string[];
    private fullArgs!: string[];
    public executor!: BaseExecutor;

    public constructor(event: MessageContext) {
        super(event);
        if (this.text.trim() === "") return;
        this.fullArgs = this.text.split(' ');
        this.args = this.fullArgs.slice(1);
        if (['!', '/', '+', '$', '.'].includes(this.fullArgs[0][0])) this.command = this.fullArgs[0].slice(1);
        else this.command = this.fullArgs[0];
        const executor = RoutingMaps.PRIVATE_COMMAND_EXECUTORS.get(this.command);
        if (!executor) return;
        this.executor = new (executor as { new(): BaseExecutor })();
        this.isCommand = true;
    }

    public async getIdFromArgument(arg: number = 0) : Nullable<User> {
        const allowGroups : boolean = false;
        const argsList : Array<string> = this.args;
        if (argsList.length < arg+1) return null;
        const currencyText : string = argsList[arg];

        let userId: number | string;
        if (!isNaN(+currencyText)) {
            userId = +currencyText;
            if ((userId < 0 && !allowGroups) || userId === 0) return null;
            return await User.instance(+currencyText);
        }

        let match : RegExpMatchArray | null;
        if ((match = currencyText.match(Regex.USER_OR_GROUP_MENTION))) {
            userId = currencyText.startsWith('[club') ? ~+match[2] + 1 : +match[2];
            return (userId < 0 && !allowGroups) ? null : await User.instance(userId);
        }

        if ((match = currencyText.match(Regex.URL_GET))) {
            userId = match[1];
            if (isNaN(+userId)) {
                const user : User = await User.instance(userId);
                return user.userId && (user.userId > 0 || allowGroups) ? await User.instance(user.userId) : null;
            }
            userId = +userId;
            return (userId && (userId > 0 || allowGroups)) ? await User.instance(userId): null;
        }

        const user = await User.instance(currencyText);
        return user.userId && (user.userId > 0 || allowGroups) ? await User.instance(user.userId) : null;

    }

}