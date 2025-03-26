import {Time} from "./Time";

export class Logger {

    public static info(object: string) : void {
        console.log(`[${Time.currency.toString}] (INFO) ${object}`)
    }

}