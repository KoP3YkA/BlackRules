import {BaseEvent} from "../../base/event/BaseEvent";
import {MessageContext} from "vk-io";
import {User} from "../entity/User";
import {MessagesSendParams} from "vk-io/lib/api/schemas/params";
import {Localization} from "../application/Localization";

export class PrivateMessageEvent extends BaseEvent {

    public apiEvent: MessageContext;
    public sender: User;
    public text: string;

    public constructor(event: MessageContext, user?: User) {
        super();
        this.apiEvent = event;
        this.sender = user ?? new User(event.senderId);
        this.text = event.text ?? "";
    }

    public async reply(message: string | MessagesSendParams) : Promise<MessageContext> {
        return await this.apiEvent.reply(message);
    }

    public async send(message: string | MessagesSendParams) : Promise<MessageContext> {
        return await this.apiEvent.send(message);
    }

    public async replyLocalizedText(path: string, rename: Record<string, any> = {}) : Promise<MessageContext> {
        return await this.reply(Localization.getLocalizedText(path, rename));
    }

    public async sendLocalizedText(path: string, rename: Record<string, any> = {}) : Promise<MessageContext> {
        return await this.send(Localization.getLocalizedText(path, rename));
    }

}