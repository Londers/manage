import React, {useEffect, useState} from "react";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import AccountContent from "./AccountContent";
import {AccInfo, ManageMsg} from "../../common";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectUser, setManage} from "../manageSlice";
import axios, {AxiosResponse} from "axios";

function UpdateDialog(props: { open: boolean, setOpen: Function}) {
    const dispatch = useAppDispatch()

    const handleConfirm = () => {
        console.log(createMsg)
        if (createMsg.login === "" || createMsg.area.length === 0 || createMsg.description === "") return
        props.setOpen(false)
        axios.post(
            window.location.href + "/update",
            createMsg
        ).then((response: AxiosResponse<ManageMsg>) => {
            axios.post(
                window.location.href,
            ).then((response: AxiosResponse<ManageMsg>) => {
                dispatch(setManage(response.data))
            }).catch((error) => {
                window.alert(error.message)
            })

        }).catch((error) => {
            window.alert(error.message)
        })
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
    }, [selectedUser, props.open])

    return (
        <Dialog open={props.open}>
            <DialogTitle>Изменение пользователя</DialogTitle>
            <DialogContent style={{margin: "0 19.5px 0 19.5px"}}>
                <AccountContent open={props.open} createMsg={createMsg} setCreateMsg={setCreateMsg}/>
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleConfirm}>Подтвердить</Button>
                <Button onClick={() => props.setOpen(false)}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default UpdateDialog;