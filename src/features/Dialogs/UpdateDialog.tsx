import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import AccountContent from "./AccountContent";
import {AccInfo} from "../../common";
import {useAppSelector} from "../../app/hooks";
import {selectUser} from "../manageSlice";

function UpdateDialog(props: { open: boolean, setOpen: Function}) {
    const handleClose = () => {
        console.log(createMsg)
        props.setOpen(false)
    }

    const selectedUser = useAppSelector(selectUser)
    const [createMsg, setCreateMsg] = useState<AccInfo>(selectedUser ?? {
        area: [{nameArea: "", num: ""}],
        description: "",
        login: "",
        password: "",
        region: {nameRegion: "", num: ""},
        role: {name: "Viewer", permissions: []},
        workTime: 12 * 60
    })

    useEffect(() => {
        setCreateMsg(selectedUser ?? {
            area: [{nameArea: "", num: ""}],
            description: "",
            login: "",
            password: "",
            region: {nameRegion: "", num: ""},
            role: {name: "Viewer", permissions: []},
            workTime: 12 * 60
        })
    }, [selectedUser])

    return (
        <Dialog open={props.open}>
            <DialogTitle>Изменение пользователя</DialogTitle>
            <DialogContent style={{margin: "0 19.5px 0 19.5px"}}>
                <AccountContent open={props.open} createMsg={createMsg} setCreateMsg={setCreateMsg}/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleClose}>Подтвердить</Button>
                <Button onClick={() => props.setOpen(false)}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDialog;