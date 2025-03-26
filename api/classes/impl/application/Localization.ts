import * as fs from 'fs'
import * as yaml from 'js-yaml';
import {Main} from "../../../../Main";

export class Localization {

    public static get getLocalization() : any {
        const fileContents = fs.readFileSync('./localization.yml', 'utf8')
        return yaml.load(fileContents);
    }

    private static getMessage(localization: any, field: string, rename: Record<string, any> = {}) : string {
        const keys : string[] = field.split('.')
        let message : string;
        if (keys.length === 1) message = localization[field]
        else {
            message = localization
            for (const key of keys) {
                message = (message as unknown as Record<string, any>)[key];
            }
        }

        if (!message) return `No translation (${field})`

        let localizedMessage : string = message;

        localizedMessage = localizedMessage.replace(/<</g, "«");
        localizedMessage = localizedMessage.replace(/>>/g, "»");
        localizedMessage = localizedMessage.replace(/--/g, '—');

        for (const [key, value] of Object.entries(rename)) {
            localizedMessage = localizedMessage.replace(new RegExp(`\\$\\(${key}\\)`, 'g'), value);
        }

        return localizedMessage;
    }

    public static getLocalizedText(field: string, rename: Record<string, any> = {}) : string {
        return this.getMessage(Main.getInstance().hashedLocalization, field, rename);
    }

    public static getForceLocalizedText(field: string, rename: Record<string, any> = {}) : string {
        return this.getMessage(this.getLocalization, field, rename);
    }

    public static getSafeMessage(field: string, rename: Record<string, any> = {}) : string | null {
        const text = this.getMessage(Main.getInstance().hashedLocalization, field, rename);
        if (text == `No translation (${field})`) return null;
        return text;
    }

}