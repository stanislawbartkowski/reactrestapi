export enum STRINGTYPE {
    STRINGEMPTY = 1000, MENUACTIONNAME, LISTACTIONID, LISTACTIONSPECID, FORCEMENU, DBNAME
}

export interface IPushString {
    type : STRINGTYPE,
    vals : string|null
}


export const pushstring = (type : STRINGTYPE, vals: string) : IPushString => {
    return {
        type: type,
        vals: vals
    }
}

