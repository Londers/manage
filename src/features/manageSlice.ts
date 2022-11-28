import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AccInfo, ManageMsg, ManageSlice} from "../common";
import {RootState} from "../app/store";

const initialState: ManageSlice = {
    info: {
        accInfo: [],
        areaInfo: {},
        message: "",
        permInfo: {},
        regionInfo: {},
        roles: []
    },
    selectedLogin: ""
}

function sortByLogin(a: AccInfo, b: AccInfo) {
    let aName = a.login.toLowerCase();
    let bName = b.login.toLowerCase();
    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

export const manageSlice = createSlice({
    name: "manage",
    initialState,
    reducers: {
        setManage: (state, action: PayloadAction<ManageMsg>) => {
            if (action.payload) {
                action.payload.accInfo.sort(sortByLogin)
                Object.assign(state.info, action.payload)
            }
        },
        setSelectedLogin: (state, action: PayloadAction<string>) => {
            if (action.payload) state.selectedLogin = action.payload
        }
    },
})

export const {setManage, setSelectedLogin} = manageSlice.actions

export const selectManageInfo = (state: RootState) => state.manage.info
export const selectUser = (state: RootState): AccInfo | undefined => state.manage.info.accInfo.find(acc => acc.login === state.manage.selectedLogin)

export default manageSlice.reducer