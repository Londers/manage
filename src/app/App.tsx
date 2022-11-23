import React, {createContext, useEffect, useState} from 'react';
import './App.css';
import ManageBar from "../features/ManageBar";
import UserTable from "../features/UserTable";
import axios, {AxiosResponse} from "axios";
import {ManageMsg} from "../common";

export const ManageContext = createContext<ManageMsg | undefined>(undefined)

function App() {
    const [manageInfo, setManageInfo] = useState<ManageMsg>()

    useEffect(() => {
        let href = ""
        if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
            href = "https://192.168.115.134:4443/user/Admin/manage"
            // href = "https://192.168.0.101:4443/user/Admin/manage"
        } else {
            href = window.location.href
        }
        axios.post(
            href,
            // action.payload,
        ).then((response: AxiosResponse<ManageMsg>) => {
            // window.alert("Пароль успешно изменён. Пожалуйста, войдите в аккаунт снова.")
            console.log("success", response)
            setManageInfo(response.data)
        }).catch((error) => {
            window.alert(error.message)
        })
    }, [])

    return (
        <ManageContext.Provider value={manageInfo}>
            <div className="App">
                <ManageBar/>
                <UserTable manageInfo={manageInfo}/>
            </div>
        </ManageContext.Provider>
    );
}

export default App;
