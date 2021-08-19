import LocalizedStrings from 'react-localization';


const embedded = {
    pl: {
        "showdatabutton": "Pokaż dane"
    },
    en: {

    }
};

const strings = new LocalizedStrings({
    en: {
    },
    pl: {
    }
});

export function setStrings(s: any) {
    //    strings.setContent({ ...embedded, ...s });
    if (s == null) return;
    const o = { pl: { ...embedded.pl, ...s.pl }, en: { ...embedded.en, ...s.en } };
    strings.setContent(o);
}

const lstring = (id: string, ...args: string[]): string => {
    const s = strings.getString(id)
    const ss: string = strings.formatString(s, ...args).toString()
    return ss;
}

export default lstring;