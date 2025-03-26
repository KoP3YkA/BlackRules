import {AutoIncrementId, ModelAdapter, Module, NamedTable, SelectQueryParams, Table} from "modular-orm";
import {IUser} from "../../../../interfaces/entity/IUser";
import {VarcharUUID} from "../../../../annotations/database/columns/VarcharUUID";
import {IntegerColumn} from "../../../../annotations/database/columns/IntegerColumn";
import {Nothing} from "../../../../types/Nothing";
import {UserObject} from "../objects/UserObject";

@Table
@NamedTable('users')
export class UsersModule extends Module implements IUser {
    @AutoIncrementId
    public id : number = 1;

    @VarcharUUID
    public userId : string = "";

    @IntegerColumn
    public findCount : number = 0;

    @IntegerColumn
    public correctCount : number = 0;

    public static create = async (values: { [key: string]: any }) : Nothing => await new ModelAdapter(UsersModule).create(values);

    public static select = async (where: { [key: string] : any }, params?: Partial<SelectQueryParams>) : Promise<UserObject[]> => await new ModelAdapter(UsersModule).select(UserObject, where, params)

    public static update = async (newValues: { [key: string] : any }, where?: { [key: string] : any }) : Nothing => await new ModelAdapter(UsersModule).update(newValues, where);

    public static delete = async (where: { [key: string] : any }) : Nothing => await new ModelAdapter(UsersModule).delete(where);

}