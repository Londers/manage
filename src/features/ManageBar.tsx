import React, {useState} from "react";
import {Button} from "@mui/material";
import AddDialog from "./Dialogs/AddDialog";

function ManageBar() {
    const [openAddDialog, setOpenAddDialog] = useState(false)



    return (
        <div>
            <Button variant="outlined" onClick={() => setOpenAddDialog(!openAddDialog)}>
                Добавить
            </Button>
            <AddDialog open={openAddDialog} setOpen={setOpenAddDialog} />
            <Button variant="outlined">
                Изменить
            </Button>
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