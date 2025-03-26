import {API} from "vk-io";
import {Nullable} from "../../../types/Nullable";
import {Cash} from "../../../namespace/Cash";
import {NameCase} from "../enums/NameCase";
import {BaseNameCase} from "vk-io/lib/api/schemas/objects";

export class ClientAPI {

    public constructor(
        public api: API
    ) {}

    public async getUserByTag(id: string) : Nullable<number> {
        const cashResult = Cash.USER_TAGS.get(id)
        if (cashResult) return cashResult === 0 ? null : cashResult;
        const res = await this.api.users.get({
            user_ids: [id]
        })
        let returnResult : number;
        if (res.length < 1) returnResult = 0
        else returnResult = res[0].id ?? 0

        Cash.USER_TAGS.set(id, returnResult)
        return returnResult === 0 ? null : returnResult;
    }

    public async getUserName(userId: number, nameCase: NameCase) : Promise<string> {
        const res = await this.api.users.get({
            user_ids: [+userId],
            name_case: nameCase.tag as BaseNameCase
        }).catch(err => {return err})

        if (!res) return 'Не Найден'
        const user = res[0]
        return `${user.first_name} ${user.last_name}`
    }

}