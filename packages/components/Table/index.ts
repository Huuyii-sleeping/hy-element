import Table from "./Table.vue";
//@ts-ignore
import TableColumn from "./TableColumn.vue";
import { withInstall } from "@hy-element/utils";

export const hyTable = withInstall(Table)
export const hyTableColumn = withInstall(TableColumn)

export * from './types'