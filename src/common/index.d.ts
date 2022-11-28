export interface ManageMsg {
    accInfo: AccInfo[];
    areaInfo: AreaInfo;
    message: string;
    permInfo: PermInfo;
    regionInfo: RegionInfo;
    roles: string[];
}

export interface Role {
    name: string;
    permissions: number[];
}

export interface Region {
    num: string;
    nameRegion?: string;
}

export interface Area {
    num: string;
    nameArea?: string;
}

export interface AccInfo {
    login: string;
    workTime: number;
    description: string;
    password?: string;
    role: Role;
    region: Region;
    area: Area[];
}

export interface Areas {
    [index: string]: string
}

export interface AreaInfo {
    [index: string]: Areas
}

export interface RegionInfo {
    [index: string]: string
}

export interface Permission {
    id: number;
    description: string;
}

export interface PermInfo {
    [index: string]: Permission
}

export interface SendCreateMsg {
    login: string
    workTime: number
    role: {
        name: string
        permissions: number[]
    }
    region: {
        num: string
    }
    area: {
        num: string
    }[]
    description: string
}

export interface ManageSlice {
    info: ManageMsg
    selectedLogin: string
}