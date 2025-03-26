import {ColumnAnnotationFabric, ColumnType} from "modular-orm";

export const IntegerColumn = ColumnAnnotationFabric.create({
    type: ColumnType.INTEGER,
    notNull: true,
    defaultValue: 0
})