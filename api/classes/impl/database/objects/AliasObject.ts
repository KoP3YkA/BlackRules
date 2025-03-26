import {IsBoolean, IsNumber, IsSafeString, QueryResult, Result, Validate} from "modular-orm";
import {IAlias} from "../../../../interfaces/entity/IAlias";

export class AliasObject extends QueryResult implements IAlias, Validate {
    @Result()
    @IsNumber
    public id : number = 0;

    @Result()
    @IsSafeString
    public alias : string = "";

    @Result()
    @IsSafeString
    public rule : string = "";

    @Result()
    @IsBoolean
    public moderated : boolean = false;

    public validateErrors: Set<string> = new Set();
}