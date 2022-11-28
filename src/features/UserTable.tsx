import React, {useState} from "react";
import {AccInfo, ManageMsg} from "../common";
import {DataGrid, GridColumns, ruRU} from "@mui/x-data-grid";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectManageInfo, setSelectedLogin} from "./manageSlice";

const defaultColumnOptions = {
    editable: false,
    sortable: false,
    flex: 1,
    cellClassName: "table-cell-wrap",
}

const columns: GridColumns = [
    {
        field: "id",
        headerName: "Логин",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "privileges",
        headerName: "Права",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "region",
        headerName: "Регион",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "area",
        headerName: "Район",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "desc",
        headerName: "Название АРМа",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    }, {
        field: "workTime",
        headerName: "Время рабочего саенса, ч",
        ...defaultColumnOptions,
        headerAlign: "center",
        align: "center",
    },
]

function UserTable() {
    const manageInfo = useAppSelector(selectManageInfo)

    const dispatch = useAppDispatch()

    const convertRows = () => {
        return manageInfo.accInfo.map((acc, index) => {
            return {
                // id: index,
                id: acc.login,
                privileges: acc.role.name,
                region: acc.region.nameRegion,
                area: acc.area.map(area => area.nameArea).join(", "),
                desc: acc.description,
                workTime: acc.workTime / 60,
            }
        })
    }

    const rows = convertRows()

    // const getUserByLogin = (login: string) => {
    //     return manageInfo.accInfo.find(acc => acc.login === login)
    // }

    return (
        <div style={{height: "92.2vh", width: "95%", marginLeft: "2.5%", marginRight: "2.5%"}}>
            {rows && <DataGrid
                localeText={ruRU.components.MuiDataGrid.defaultProps.localeText}
                columns={columns}
                rows={rows}
                experimentalFeatures={{newEditingApi: true}}
                disableColumnMenu
                hideFooter
                checkboxSelection={false}
                onSelectionModelChange={(newSelectionModel) => {
                    console.log(newSelectionModel)
                    if (typeof newSelectionModel[0] === "string") {
                        dispatch(setSelectedLogin(newSelectionModel[0]))
                        // props.setSelectedUser(getUserByLogin(newSelectionModel[0]))
                        // console.log(getUserByLogin(newSelectionModel[0]))
                    }
                }}
                density="comfortable"
                // disableColumnSelector={true}
                // disableColumnFilter={true}
                // disableDensitySelector={true}
                // componentsProps={{
                //     toolbar: {
                //         showQuickFilter: true,
                //         quickFilterProps: {debounceMs: 500},
                //     },
                // }}
            />}
        </div>
    )
}

export default UserTable;