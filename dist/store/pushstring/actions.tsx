export enum STRINGTYPE {
    STRINGEMPTY = 1000, MENUACTIONNAME, LISTACTIONID, LISTSLOT1ID, LISTSLOT2ID, FORCEMENU, DBNAME
}

export interface IPushString {
    type : STRINGTYPE,
    vals : string|null
}


export const pushstring = (type : STRINGTYPE, vals: string|null) : IPushString => {
    return {
        type: type,
        vals: vals
    }
}

