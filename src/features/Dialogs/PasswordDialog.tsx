import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip} from "@mui/material";

function PasswordDialog(props: { open: boolean, setOpen: Function, login: string, password: string }) {
    const [copy, setCopy] = useState<boolean>(false)

    const handleCopy = () => {
        navigator.clipboard.writeText(props.password)
        setCopy(true)
    }

    useEffect(() => setCopy(false) ,[props.open])

    return (
        <Dialog open={props.open}>
            <DialogTitle>Создание пользователя</DialogTitle>
            <DialogContent style={{margin: "0 19.5px 0 19.5px"}}>
                <p>Логин: {props.login}</p>
                <Tooltip title={copy ? "Пароль скопирован" : ""}>
                    <p onClick={handleCopy} onBlur={() => setCopy(false)}>Пароль: {props.password}</p>
                </Tooltip>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => props.setOpen(false)}>Закрыть</Button>
            </DialogActions>
        </Dialog>
    )
}

export default PasswordDialog;