import React from 'react';

import Portal from '@material-ui/core/Portal';

import ListGridSpec from './panel/panelcomp/ListGridSpec'

const PopUps: React.FC = () =>
    <Portal>
        <ListGridSpec />
    </Portal>

export default PopUps;
