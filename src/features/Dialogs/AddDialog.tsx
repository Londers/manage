import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import React from "react";
import AccountContent from "./AccountContent";

function AddDialog(props: { open: boolean, setOpen: Function }) {
    const handleClose = () => {
        props.setOpen(false)
    }

    return (
        <Dialog open={props.open}>
            <DialogTitle>Создание пользователя</DialogTitle>
            <DialogContent style={{margin: "0 19.5px 0 19.5px"}}>
                <AccountContent open={props.open} edit={false}/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleClose}>Подтвердить</Button>
                <Button onClick={() => props.setOpen(false)}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDialog;