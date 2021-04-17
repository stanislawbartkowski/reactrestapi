import LocalizedStrings from 'react-localization';


let strings = new LocalizedStrings({
    en:{
    },
    pl: {
    }
   });

export function setStrings(s : any) {
    strings.setContent(s);
}

const lstring = (id : string, ...args : string[]) : string => {
    const s = strings.getString(id)
    const ss : string  = strings.formatString(s,...args).toString()
    return ss;
}

export default lstring;