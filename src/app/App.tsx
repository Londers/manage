import React, {useEffect,} from 'react';
import './App.css';
import ManageBar from "../features/ManageBar";
import UserTable from "../features/UserTable";
import axios, {AxiosResponse} from "axios";
import {ManageMsg} from "../common";
import {useAppDispatch} from "./hooks";
import {setManage} from "../features/manageSlice";

function App() {
    const dispatch = useAppDispatch()

    useEffect(() => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/manage"
        } else {
            href = window.location.href
        }
        axios.post(
            href,
        ).then((response: AxiosResponse<ManageMsg>) => {
            dispatch(setManage(response.data))
        }).catch((error) => {
            window.alert(error.message)
        })
    }, [dispatch])

    return (
            <div className="App">
                <ManageBar/>
                <UserTable/>
            </div>
    );
}

export default App;
