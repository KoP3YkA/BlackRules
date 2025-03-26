import * as dotenv from 'dotenv'
dotenv.config({override: true})
import {Nothing} from "./api/types/Nothing";
import {Logger} from "./api/classes/impl/utils/Logger";
import {InitClass} from "./api/classes/impl/application/InitClass";
import {ModularORM} from "modular-orm";
import {System} from "./api/namespace/System";
import {Client} from "./api/classes/impl/application/Client";
import {Localization} from "./api/classes/impl/application/Localization";
import {Cash} from "./api/namespace/Cash";
import {Time} from "./api/classes/impl/utils/Time";
import {API} from "vk-io";
import {ClientAPI} from "./api/classes/impl/application/ClientAPI";

export class Main {
    private static _instance : Main;
    public hashedLocalization : any;
    public beginStartTime!: Time;
    protected api!: API;

    public async start() : Nothing {
        this.beginStartTime = Time.currency;
        // Registering all classes
        try {
            InitClass.initAll();
            Logger.info('All classes were registered!')
        } catch (e) {process.exit(1)}

        // Connecting to the database and creating tables
        const modularOrm : ModularORM = ModularORM.getInstance;
        await modularOrm.start(System.DATABASE_CONNECTION_DATA).then(() => Logger.info(`Successful connected to the database!`));

        // Synchronizing cash
        await Cash.synchronize().then(() => Logger.info(`Cash successful synchronized!`));

        // Hashing localization from localization.yml
        try {
            this.hashedLocalization = Localization.getLocalization;
            Logger.info(`Localization successful hashed!`)
        } catch (e) {process.exit(2)}

        // Starting a VK client
        const client : Client = new Client();
        await client.start(System.VK_BOT_TOKEN);
        this.api = client.getApi();
    }

    public static getClientApi = () => new ClientAPI(this._instance.api);

    public static getInstance() : Main {
        if (!this._instance) this._instance = new Main();
        return this._instance;
    }

}

new Promise(async (resolve) => {
    const mainInstance : Main = Main.getInstance();
    await mainInstance.start().then(() => {
        const elapsed : string = Time.currency.timeElapsed(mainInstance.beginStartTime.time);
        Logger.info(`Application successful started in ${elapsed}`)
    });
})

