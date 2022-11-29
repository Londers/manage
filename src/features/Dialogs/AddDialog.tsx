import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
} from "@mui/material";
import React, {useEffect, useState} from "react";
import AccountContent from "./AccountContent";
import {AccInfo, ManageMsg} from "../../common";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {selectManageInfo, setManage} from "../manageSlice";
import axios, {AxiosResponse} from "axios";

function AddDialog(props: { open: boolean, setOpen: Function }) {
    const dispatch = useAppDispatch()
    const manageInfo = useAppSelector(selectManageInfo)

    const handleClose = () => {
        console.log(createMsg)
        props.setOpen(false)

        // if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
        //     return
        // }
        axios.post(
            // window.location.href + "add",
            "https://192.168.115.134:4443/user/Admin/manage/add",
            createMsg
        ).then((response: AxiosResponse<ManageMsg>) => {
            // window.alert("Пароль успешно изменён. Пожалуйста, войдите в аккаунт снова.")
            // dispatch(setManage(response.data))
            // setManageInfo(response.data)

            axios.post(
                // window.location.href,
                "https://192.168.115.134:4443/user/Admin/manage"
                // action.payload,
            ).then((response: AxiosResponse<ManageMsg>) => {
                // window.alert("Пароль успешно изменён. Пожалуйста, войдите в аккаунт снова.")
                dispatch(setManage(response.data))
                // setManageInfo(response.data)
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
    }, [manageInfo])

    return (
        <Dialog open={props.open}>
            <DialogTitle>Создание пользователя</DialogTitle>
            <DialogContent style={{margin: "0 19.5px 0 19.5px"}}>
                <AccountContent open={props.open} createMsg={createMsg} setCreateMsg={setCreateMsg} />
            </DialogContent>
            <DialogActions>
                <Button type="submit" onClick={handleClose}>Подтвердить</Button>
                <Button onClick={() => props.setOpen(false)}>Отмена</Button>
            </DialogActions>
        </Dialog>
    )
}

export default AddDialog;