import { FunctionComponent } from 'react';
import { getDefaultLibFilePath } from 'typescript';

type TRouterElem = {
    path: string,
    comp: FunctionComponent,
    id: string | null
}

export const routermenu: TRouterElem[] = [];

export function addRouter(e: TRouterElem) {
    routermenu.push(e);
}

export function getPath(id: string) : string {

    const res: TRouterElem | undefined = routermenu.find(e => e.id == id);

    if (res != undefined) return res.path;

    const defa: TRouterElem | undefined = routermenu.find(e => e.id == null) as TRouterElem;
    return defa.path;
}
