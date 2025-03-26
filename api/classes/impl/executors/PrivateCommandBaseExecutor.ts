import {PrivateMessageBaseExecutor} from "./PrivateMessageBaseExecutor";
import {Some} from "../../../types/Some";
import {PrivateCommandEvent} from "../events/PrivateCommandEvent";

export class PrivateCommandBaseExecutor extends PrivateMessageBaseExecutor {

    public override async execute(message: PrivateCommandEvent): Some {

    }

}