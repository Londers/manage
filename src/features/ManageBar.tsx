import React, {useState} from "react";
import {Button} from "@mui/material";
import AddDialog from "./Dialogs/AddDialog";
import UpdateDialog from "./Dialogs/UpdateDialog";
import {useAppSelector} from "../app/hooks";
import {selectUser} from "./manageSlice";

function ManageBar() {
    const selectedUser = useAppSelector(selectUser)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

    return (
        <div>
            <Button variant="outlined" onClick={() => {
                setOpenAddDialog(!openAddDialog)
            }}>
                Добавить
            </Button>
            <AddDialog open={openAddDialog} setOpen={setOpenAddDialog} />
            <Button variant="outlined" onClick={() => {
                if (selectedUser?.role.name !== "Admin") {
                    setOpenUpdateDialog(!openUpdateDialog)
                } else {
                    alert("fukc oyu")
                }
            }}>
                Изменить
            </Button>
            <UpdateDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog}/>
            <Button variant="outlined">
                Сбросить пароль
            </Button>
            <Button variant="outlined">
                Удалить
            </Button>
            <Button variant="outlined">
                Список редактируемых ДК
            </Button>
            <Button variant="outlined">
                Проверка БД
            </Button>
        </div>
    )
}

export default ManageBar;