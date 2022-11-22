import React from "react";
import {Button} from "@mui/material";

function ManageBar() {
    return (
        <div>
            <Button variant="outlined">
                Добавить
            </Button>
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