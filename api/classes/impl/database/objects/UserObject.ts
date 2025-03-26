import {IsNumber, QueryResult, Result, Validate} from "modular-orm";
import {IUser} from "../../../../interfaces/entity/IUser";
import {ToNumber} from "../../../../annotations/database/transforms/ToNumber";

export class UserObject extends QueryResult implements IUser, Validate {
    @Result()
    @IsNumber
    public id : number = 0;

    @Result()
    @ToNumber
    @IsNumber
    public userId : number = 0;

    @Result()
    @IsNumber
    public findCount : number = 0;

    @Result()
    @IsNumber
    public correctCount : number = 0;


    public validateErrors: Set<string> = new Set();
}

export class UserFindCountSumObject extends QueryResult {
    @Result()
    public findCountSum : number = 0;
}