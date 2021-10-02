export enum STRINGTYPE {
    STRINGEMPTY = 1000, MENUACTIONNAME, COMPACTIONID, COMPSLOT1ID, COMPSLOT2ID, COMPSLOT3ID, FORCEMENU, DBNAME, BUSYINDICATOR
}

export const BUSYSTART = "start";
export const BUSYSTOP = "stop";

export interface IPushString {
    type: STRINGTYPE,
    vals?: string
}


export const pushstring = (type: STRINGTYPE, vals?: string): IPushString => {
    return {
        type: type,
        vals: vals
    }
}

