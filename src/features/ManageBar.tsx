import React, {useState} from "react";
import {Button, Grid} from "@mui/material";
import AddDialog from "./Dialogs/AddDialog";
import UpdateDialog from "./Dialogs/UpdateDialog";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectUser, setManage} from "./manageSlice";
import axios, {AxiosResponse} from "axios";
import {ManageMsg, PassRequest} from "../common";
import PasswordDialog from "./Dialogs/PasswordDialog";

function ManageBar() {
    const dispatch = useAppDispatch()
    const selectedUser = useAppSelector(selectUser)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)
    const [openPass, setOpenPass] = useState<boolean>(false)
    const [login, setLogin] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [error, setError] = useState<boolean>(false)

    const handleOpenEditControl = () => window.open(window.location.href + "/crossEditControl")
    const handleOpenStateTest = () => window.open(window.location.href + "/stateTest")
    const handleResetPassword = () => {
        axios.post(
            window.location.href + "/resetpw",
            {login: selectedUser?.login},
        ).then((response: AxiosResponse<PassRequest>) => {
            setLogin(response.data.login)
            setPassword(response.data.pass)
            setOpenPass(true)
        }).catch((error) => {
            window.alert(error.message)
        })
    }

    const handleDeleteUser = () => {
        if (!window.confirm("Вы уверены? Аккаунт будет удалён безвозвратно.")) return
        axios.post(
            window.location.href + "/delete",
            {login: selectedUser?.login},
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

    return (
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="center"
                style={{margin: "7px 0"}}
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="space-evenly"
                    alignItems="center"
                    style={{width: "40%"}}
                >
                    <Button variant="outlined" onClick={() => {
                        setOpenAddDialog(!openAddDialog)
                    }}>
                        Добавить
                    </Button>
                    <AddDialog open={openAddDialog} setOpen={setOpenAddDialog}/>
                    <Button variant="outlined" onClick={() => {
                        if ((selectedUser?.role.name !== "Admin") || (window.location.href.includes("TechAutomatic"))) {
                            setOpenUpdateDialog(!openUpdateDialog)
                            setError(false)
                        } else {
                            setError(true)
                        }
                    }}>
                        Изменить
                    </Button>
                    <UpdateDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog}/>
                    <Button variant="outlined" onClick={handleResetPassword}>
                        Сбросить пароль
                    </Button>
                    <PasswordDialog open={openPass} setOpen={setOpenPass} login={login} password={password}/>
                    <Button variant="outlined" onClick={handleDeleteUser}>
                        Удалить
                    </Button>
                </Grid>
                <div>{error && <div style={{color: "red"}}>Нельзя изменить администратора</div>}</div>
                <Button variant="outlined" onClick={handleOpenEditControl}>
                    Список редактируемых ДК
                </Button>
                <Button variant="outlined" onClick={handleOpenStateTest}>
                    Проверка БД
                </Button>
            </Grid>
    )
}

export default ManageBar;