import {
    AutoIncrementId,
    Column,
    DefaultColumn,
    Migration,
    MigrationType,
    ModelAdapter,
    Module,
    NamedTable,
    SelectQueryParams,
    Table
} from "modular-orm";
import {IAlias} from "../../../../interfaces/entity/IAlias";
import {VarcharUUID} from "../../../../annotations/database/columns/VarcharUUID";
import {Nothing} from "../../../../types/Nothing";
import {AliasObject} from "../objects/AliasObject";

@Table
@NamedTable('aliases')
export class AliasesModule extends Module implements IAlias {
    @AutoIncrementId
    public id : number = 0;

    @VarcharUUID
    public alias : string = "";

    @VarcharUUID
    public rule : string = "";

    @Column(DefaultColumn.BOOL_DEFAULT_FALSE)
    public moderated : boolean = false;

    public static create = async (values: { [key: string]: any }) : Nothing => await new ModelAdapter(AliasesModule).create(values);

    public static select = async (where: { [key: string] : any }, params?: Partial<SelectQueryParams>) : Promise<AliasObject[]> => await new ModelAdapter(AliasesModule).select(AliasObject, where, params)

    public static update = async (newValues: { [key: string] : any }, where?: { [key: string] : any }) : Nothing => await new ModelAdapter(AliasesModule).update(newValues, where);

    public static delete = async (where: { [key: string] : any }) : Nothing => await new ModelAdapter(AliasesModule).delete(where);

}