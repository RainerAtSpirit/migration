import * as corejs from "@coras/corejs"
// tslint:disable-next-line:no-duplicate-imports
import { App, List } from "@coras/corejs"

const temp = ((window as any).corejs = corejs)
export const HELP_URL = "http://coras.help/coras/"
export const APP_ID = "cd57ab8b-e226-44fb-89d9-c7eb571ae864"
export const COREJS_ODATA = corejs.odata
// export const DATA_LIST_ID = "4b3df06c-7f9b-4a36-b7dd-2dd2ffc8534c"
// // LayoutsV2POC
// export const LAYOUTSV2_LIST_ID = "f28d478e-b64a-4d5a-915c-728e59f267cf"
// export const SNAPSHOTS_LIST_ID = "a8a1f1e1-e54d-4e4c-9e8d-ee501b6121b7"
// export const PORTFOLIO_LIST_ID = "c232a00e-77e4-4f3c-8705-48031f43b946"
// export const CUBE_DEFINITON_LIST_ID = "80e13f80-986d-4b15-84e4-d85efc3a21bc"
//
export const COREJS_APP = corejs.odata.apps.getById(APP_ID)
// export const COREJS_LAYOUTV2_LIST = COREJS_APP.lists.getById(LAYOUTSV2_LIST_ID)
// export const COREJS_SNAPSHOTS_LIST = COREJS_APP.lists.getById(SNAPSHOTS_LIST_ID)
// export const COREJS_DATA_LIST = COREJS_APP.lists.getById(DATA_LIST_ID)
// export const COREJS_PORTFOLIO_LIST = COREJS_APP.lists.getById(PORTFOLIO_LIST_ID)
// export const CUBE_DEFINITON_LIST = COREJS_APP.lists.getById(
//   CUBE_DEFINITON_LIST_ID
// )
