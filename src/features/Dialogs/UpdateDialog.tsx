import React from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import AccountContent from "./AccountContent";

function UpdateDialog(props: { open: boolean, setOpen: Function}) {
    const handleClose = () => {
        props.setOpen(false)
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Изменение пользователя</DialogTitle>
            <DialogContent style={{margin: "0 19.5px 0 19.5px"}}>
                <AccountContent open={props.open} edit={true}/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleClose}>Подтвердить</Button>
                <Button onClick={() => props.setOpen(false)}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDialog;