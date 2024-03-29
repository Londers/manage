import React, {ChangeEvent, useState} from "react";
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
import {selectManageInfo} from "../manageSlice";

function AccountContent(props: { open: boolean, createMsg: AccInfo, setCreateMsg: Function }) {
    const manageInfo = useAppSelector(selectManageInfo)
    const [selectedAreas, setSelectedAreas] = useState<string[]>((props.createMsg.area.length === 0) ? [] : Object.values(props.createMsg.area).map(q => q.nameArea ?? ""))

    const handleLoginChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCreateMsg({...props.createMsg, login: event.target.value})
    }

    const handleRoleChange = (event: SelectChangeEvent) => {
        if (props.createMsg.region.num === "*") {
            props.setCreateMsg(
                {...props.createMsg,
                    region: {num: Object.keys(manageInfo.regionInfo)[0]},
                    area: [],
                    role: {name: event.target.value, permissions: props.createMsg.role.permissions}
                }
            )
            setSelectedAreas([])
        } else {
            props.setCreateMsg({
                ...props.createMsg,
                role: {name: event.target.value, permissions: props.createMsg.role.permissions}
            })
        }
    }

    const handlePermissionChange = (permission: Permission) => {
        const permId = props.createMsg.role.permissions.findIndex(perm => perm === permission.id)
        props.setCreateMsg(produce(props.createMsg, draft => {
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
        props.setCreateMsg({...props.createMsg, region: {num: event.target.value}, area: []})
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
            Object.entries(manageInfo.areaInfo[manageInfo.regionInfo[props.createMsg.region.num]]).forEach(([num, desc]) => {
                if (desc === name) retValue = num
            })
            return retValue
        }

        props.setCreateMsg({
            ...props.createMsg, area: strArr.map(str => {
                return {num: gerAreaNumFromDesc(str)}
            })
        })
    }

    const handleWorkTimeChange = (event: SelectChangeEvent) => {
        props.setCreateMsg({...props.createMsg, workTime: Number(event.target.value) * 60})
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        props.setCreateMsg({...props.createMsg, description: event.target.value})
    }

    const [loginError, setLoginError] = useState<boolean>(false)
    const [areaError, setAreaError] = useState<boolean>(false)
    const [descError, setDescError] = useState<boolean>(false)

    return (
        <>
            <TextField
                style={{margin: "5px"}}
                label="Логин"
                required={true}
                value={props.createMsg.login}
                onChange={handleLoginChange}
                onBlur={() => setLoginError(props.createMsg.login === "")}
                error={loginError}
            />
            <FormControl sx={{width: "fit-content", minWidth: "145px", margin: "5px"}}>
                <InputLabel id="demo-simple-select-label">Права пользователя</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={props.createMsg.role.name}
                    label="Права пользователя"
                    onChange={handleRoleChange}
                >
                    {manageInfo?.roles.map((role, index) =>
                        <MenuItem value={role} key={index}>{role}</MenuItem>
                    )}
                </Select>
            </FormControl>
            {
                props.createMsg.role.name !== "Admin" &&
                Object.values(manageInfo?.permInfo ?? {}).map((perm, index) =>
                <div key={index}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={props.createMsg.role.permissions.find(permission => permission === perm.id) !== undefined}
                                onChange={() => handlePermissionChange(perm)}/>
                        }
                        label={perm.description}
                        labelPlacement="start"
                    />
                    <br/>
                </div>)
            }
            {manageInfo &&
                <>
                    <FormControl sx={{marginTop: "2vh", marginRight: "1vw", width: "246.5px"}}>
                        <InputLabel id="demo-simple-select-label">Регион</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={props.createMsg.region.num}
                            label="Регион"
                            disabled={Object.entries(manageInfo?.regionInfo ?? {}).length === 1}
                            onChange={handleRegionChange}
                        >
                            {
                                props.createMsg.region.num !== "" &&
                                Object.entries(manageInfo?.regionInfo ?? {}).map(([regionNum, regionName]) =>
                                    <MenuItem value={regionNum} key={regionNum}
                                              style={{display: (props.createMsg.role.name !== "Admin") && (regionNum === "*") ? "none" : ""}}>{regionName}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                    <FormControl sx={{marginTop: "2vh", width: "246.5px"}}>
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
                            onBlur={() => setAreaError(props.createMsg.area.length === 0)}
                            error={areaError}
                        >
                            {
                                props.createMsg.area[0]?.num !== "" &&
                                Object.entries(manageInfo?.areaInfo[manageInfo.regionInfo[props.createMsg.region.num]] ?? {}).map(([name, value]) =>
                                    <MenuItem value={value} key={name}>{value}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </>
            }
            <FormControl sx={{width: "fit-content", minWidth: "165px", margin: "15px 10px 0 0"}}>
                <InputLabel id="demo-simple-select-label">Время рабочего сеанса</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    value={(props.createMsg.workTime / 60).toString()}
                    label="Время рабочего сеанса"
                    onChange={handleWorkTimeChange}
                >
                    <MenuItem value={12} key={12}>{12}</MenuItem>
                    <MenuItem value={24} key={24}>{24}</MenuItem>
                </Select>
            </FormControl>
            <TextField
                style={{marginTop: "10px", maxWidth: "calc(493px + 1vw)"}}
                label="Название АРМа"
                fullWidth
                value={props.createMsg.description}
                onChange={handleDescriptionChange}
                onBlur={() => setDescError(props.createMsg.description === "")}
                error={descError}
            />
        </>
    )
}

export default AccountContent;