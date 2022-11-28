import React, {ChangeEvent, useEffect, useState} from "react";
import {
    Box,
    Checkbox, Chip,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select, SelectChangeEvent,
    TextField
} from "@mui/material";
import {AccInfo, Permission} from "../../common";
import produce from "immer";
import {useAppSelector} from "../../app/hooks";
import {selectManageInfo, selectUser} from "../manageSlice";

function AccountContent(props: { open: boolean, edit: boolean }) {
    const manageInfo = useAppSelector(selectManageInfo)
    const selectedUser = useAppSelector(selectUser) ?? {
        area: [],
        description: "",
        login: "",
        password: "",
        region: {nameRegion: "", num: ""},
        role: {name: "Viewer", permissions: []},
        workTime: 12 * 60
    }
    const [selectedAreas, setSelectedAreas] = useState<string[]>([])

    const [createMsg, setCreateMsg] = useState<AccInfo>(selectedUser)

    useEffect(() => {
        if (props.edit) {
            setCreateMsg(selectedUser)
        } else {
            setCreateMsg({
                area: [],
                description: "",
                login: "",
                password: "",
                region: {nameRegion: "", num: ""},
                role: {name: "Viewer", permissions: []},
                workTime: 12 * 60
            })
        }
    }, [props.edit, selectedUser])

    // useEffect(() => {
    //     if (!manageInfo) return
    // console.log(createMsg)
    // if ()
    // setCreateMsg({
    //     area: [],
    //     description: "",
    //     login: "",
    //     region: {num: Object.entries(manageInfo?.regionInfo)[0][0]},
    //     role: {name: "Viewer", permissions: []},
    //     workTime: 12 * 60
    // })
    // setSelectedAreas([])
    // }, [props.open, manageInfo])

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCreateMsg({...createMsg, login: event.target.value})
    }

    const handleRoleChange = (event: SelectChangeEvent) => {
        setCreateMsg({...createMsg, role: {name: event.target.value, permissions: createMsg.role.permissions}})
    }

    const handlePermissionChange = (permission: Permission) => {
        const permId = createMsg.role.permissions.findIndex(perm => perm === permission.id)
        setCreateMsg(produce(createMsg, draft => {
            if (permId === -1) {
                draft.role.permissions.push(permission.id)
            } else {
                draft.role.permissions.splice(permId, 1)
            }
            draft.role.permissions = draft.role.permissions.sort((a, b) => a - b)
            return draft
        }))
    }

    const handleRegionChange = (event: SelectChangeEvent) => {
        setCreateMsg({...createMsg, region: {num: event.target.value}, area: []})
        setSelectedAreas([])
    }

    const handleAreasChange = (event: SelectChangeEvent<typeof selectedAreas>) => {
        const value = event.target.value
        setSelectedAreas(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(",") : value,
        )
        const strArr = (typeof value === "string") ? value.split(",") : value

        const gerAreaNumFromDesc = (name: string): string => {
            let retValue = ""
            if (!manageInfo) return retValue
            Object.entries(manageInfo.areaInfo[manageInfo.regionInfo[createMsg.region.num]]).forEach(([num, desc]) => {
                if (desc === name) retValue = num
            })
            return retValue
        }

        setCreateMsg({
            ...createMsg, area: strArr.map(str => {
                return {num: gerAreaNumFromDesc(str)}
            })
        })
    }

    const handleWorkTimeChange = (event: SelectChangeEvent) => {
        setCreateMsg({...createMsg, workTime: Number(event.target.value) * 60})
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCreateMsg({...createMsg, description: event.target.value})
    }

    return (
        <>
            <TextField
                style={{margin: "5px"}}
                label="Логин"
                // fullWidth
                required={true}
                value={createMsg.login}
                onChange={handleLoginChange}
            />
            <FormControl sx={{width: "fit-content", minWidth: "145px", margin: "5px"}}>
                <InputLabel id="demo-simple-select-label">Права пользователя</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={createMsg.role.name}
                    label="Права пользователя"
                    onChange={handleRoleChange}
                >
                    {manageInfo?.roles.map((role, index) =>
                        <MenuItem value={role} key={index}>{role}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {Object.values(manageInfo?.permInfo ?? {}).map((perm, index) =>
                <div key={index}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={createMsg.role.permissions.find(permission => permission === perm.id) !== undefined}
                                onChange={() => handlePermissionChange(perm)}/>
                        }
                        label={perm.description}
                        labelPlacement="start"
                    />
                    <br/>
                </div>)
            }
            {manageInfo && <>
                <FormControl sx={{marginTop: "2vh", marginRight: "1vw", width: "250px"}}>
                    <InputLabel id="demo-simple-select-label">Регион</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={createMsg.region.num}
                        label="Регион"
                        disabled={Object.entries(manageInfo?.regionInfo ?? {}).length === 1}
                        onChange={handleRegionChange}
                    >
                        {
                            Object.entries(manageInfo?.regionInfo ?? {}).map(([regionNum, regionName]) =>
                                <MenuItem value={regionNum} key={regionNum}>{regionName}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
                <FormControl sx={{marginTop: "2vh", width: "250px"}}>
                    <InputLabel id="demo-multiple-chip-label">Район</InputLabel>
                    <Select
                        labelId="demo-multiple-chip-label"
                        id="demo-multiple-chip-select"
                        required={true}
                        multiple
                        value={selectedAreas}
                        onChange={handleAreasChange}
                        input={<OutlinedInput label="Район"/>}
                        renderValue={(selected) => (
                            <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 0.5}}>
                                {selected.map((value) => (
                                    <Chip key={value} label={value}/>
                                ))}
                            </Box>
                        )}
                    >
                        {createMsg.region.num !== "" &&
                            Object.entries(manageInfo?.areaInfo[manageInfo.regionInfo[Number(createMsg.region.num)]]).map(([name, value]) =>
                                <MenuItem key={name} value={value}>{value}</MenuItem>
                            )
                        }
                    </Select>
                </FormControl>
            </>}
            <FormControl sx={{width: "fit-content", minWidth: "165px", margin: "10px 10px 0 0"}}>
                <InputLabel id="demo-simple-select-label">Время рабочего сеанса</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={(createMsg.workTime / 60).toString()}
                    label="Время рабочего сеанса"
                    onChange={handleWorkTimeChange}
                >
                    <MenuItem value={12} key={12}>{12}</MenuItem>
                    <MenuItem value={24} key={24}>{24}</MenuItem>
                </Select>
            </FormControl>
            <TextField
                style={{marginTop: "10px", maxWidth: "512px"}}
                label="Название АРМа"
                fullWidth
                // style={{width: "700px"}}
                value={createMsg.description}
                onChange={handleDescriptionChange}
            />
        </>
    )
}

export default AccountContent;