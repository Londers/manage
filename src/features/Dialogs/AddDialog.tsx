import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import AccountContent from "./AccountContent";
import {AccInfo, ManageMsg, PassRequest} from "../../common";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectManageInfo, setManage} from "../manageSlice";
import axios, {AxiosResponse} from "axios";
import PasswordDialog from "./PasswordDialog";

function AddDialog(props: { open: boolean, setOpen: Function }) {
    const dispatch = useAppDispatch()
    const manageInfo = useAppSelector(selectManageInfo)

    const [openPass, setOpenPass] = useState<boolean>(false)
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const handleConfirm = () => {
        console.log(createMsg)
        if (createMsg.login === "" || createMsg.area.length === 0 || createMsg.description === "") return
        props.setOpen(false)

        axios.post(
            window.location.href + "/add",
            createMsg
        ).then((response: AxiosResponse<PassRequest>) => {
            setLogin(response.data.login)
            setPassword(response.data.pass)
            setOpenPass(true)
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

    const [createMsg, setCreateMsg] = useState<AccInfo>({
        area: [],
        description: "",
        login: "",
        password: "",
        region: {num: Object.keys(manageInfo.regionInfo)[0] ?? ""},
        role: {name: "Viewer", permissions: []},
        workTime: 12 * 60
    })

    useEffect(() => {
        setCreateMsg({
            area: [],
            description: "",
            login: "",
            password: "",
            region: {num: Object.keys(manageInfo.regionInfo)[0] ?? ""},
            role: {name: "Viewer", permissions: []},
            workTime: 12 * 60
        })
    }, [manageInfo, props.open])

    return (
        <div>
            <Dialog open={props.open}>
                <DialogTitle>Создание пользователя</DialogTitle>
                <DialogContent style={{margin: "0 19.5px 0 19.5px"}}>
                    <AccountContent open={props.open} createMsg={createMsg} setCreateMsg={setCreateMsg}/>
                </DialogContent>
                <DialogActions>
                    <Button type="submit" onClick={handleConfirm}>Подтвердить</Button>
                    <Button onClick={() => props.setOpen(false)}>Отмена</Button>
                </DialogActions>
            </Dialog>
            <PasswordDialog open={openPass} setOpen={setOpenPass} login={login} password={password} />
        </div>
    )
}

export default AddDialog;