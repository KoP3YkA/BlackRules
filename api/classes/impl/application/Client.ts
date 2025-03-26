import {Nothing} from "../../../types/Nothing";
import {API, MessageContext, MessageEventContext, Updates, Upload} from "vk-io";
import {Logger} from "../utils/Logger";
import {Some} from "../../../types/Some";
import {PrivateMessageEvent} from "../events/PrivateMessageEvent";
import {User} from "../entity/User";
import {PrivateMessageEventExecutor} from "../../../../core/PrivateMessageEventExecutor";

export class Client {

    protected api!: API;
    protected static LAST_MESSAGE : MessageContext;

    public async start(token: string) : Nothing {
        const api = new API({token})

        const upload = new Upload({api});

        const bot = new Updates({api, upload});

        this.api = api;

        bot.on('message_new', async (message) => {
            if (message.isOutbox || !message.isInbox) return;
            if (Client.LAST_MESSAGE && Client.LAST_MESSAGE.chatId && message.chatId) {
                if (Client.LAST_MESSAGE.chatId === message.chatId && Client.LAST_MESSAGE.senderId === message.senderId && Client.LAST_MESSAGE.conversationMessageId === message.conversationMessageId) return;
            } else if (Client.LAST_MESSAGE) {
                if (Client.LAST_MESSAGE.senderId === message.senderId && Client.LAST_MESSAGE.conversationMessageId === message.conversationMessageId) return;
            }
            Client.LAST_MESSAGE = message;
            if (!message.chatId) await this.privateMessage(message);
        })

        bot.on('message_event', async (message) => {
            await this.buttonEvent(message);
        })

        await bot.start().then(() => Logger.info('Client started!'));
    }

    protected async privateMessage(message: MessageContext) : Some {
        const sender : User = await User.instance(message.senderId);
        const event : PrivateMessageEvent = new PrivateMessageEvent(message, sender);
        await new PrivateMessageEventExecutor().execute(event);
    }

    protected async buttonEvent(message: MessageEventContext) : Some {

    }

    public getApi = () : API => this.api;

}