import React, {useState} from "react";
import {Button, Grid} from "@mui/material";
import AddDialog from "./Dialogs/AddDialog";
import UpdateDialog from "./Dialogs/UpdateDialog";
import {useAppDispatch, useAppSelector} from "../app/hooks";
import {selectUser, setManage} from "./manageSlice";
import axios, {AxiosResponse} from "axios";
import {ManageMsg} from "../common";

function ManageBar() {
    const dispatch = useAppDispatch()
    const selectedUser = useAppSelector(selectUser)
    const [openAddDialog, setOpenAddDialog] = useState(false)
    const [openUpdateDialog, setOpenUpdateDialog] = useState(false)

    const handleResetPassword = () => {
        axios.post(
            // window.location.href + "/resetpw",
            "https://192.168.115.134:4443/user/TechAutomatic/manage/resetpw",
            {login: selectedUser?.login},
        ).then((response: AxiosResponse<ManageMsg>) => {
            console.log(response.data)
        }).catch((error) => {
            window.alert(error.message)
        })
    }

    const handleDeleteUser = () => {
        if (!window.confirm("Вы уверены? Аккаунт будет удалён безвозвратно.")) return
        axios.post(
            // window.location.href + "/delete",
            "https://192.168.115.134:4443/user/TechAutomatic/manage/delete",
            {login: selectedUser?.login},
        ).then((response: AxiosResponse<ManageMsg>) => {
            axios.post(
                // window.location.href,
                "https://192.168.115.134:4443/user/TechAutomatic/manage"
            ).then((response: AxiosResponse<ManageMsg>) => {
                dispatch(setManage(response.data))
            }).catch((error) => {
                window.alert(error.message)
            })
        }).catch((error) => {
            window.alert(error.message)
        })
    }

    const handleOpenEditControl = () => window.open(window.location.href + "/crossEditControl")
    const handleOpenStateTest = () => window.open(window.location.href + "/stateTest")


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
                    // if ((selectedUser?.role.name !== "Admin") || (window.location.href.includes("TechAutomatic"))) {
                    setOpenUpdateDialog(!openUpdateDialog)
                    // } else {
                    //     alert("fukc oyu")
                    // }
                }}>
                    Изменить
                </Button>
                <UpdateDialog open={openUpdateDialog} setOpen={setOpenUpdateDialog}/>
                <Button variant="outlined" onClick={handleResetPassword}>
                    Сбросить пароль
                </Button>
                <Button variant="outlined" onClick={handleDeleteUser}>
                    Удалить
                </Button>
            </Grid>
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