import React from 'react';

import Portal from '@material-ui/core/Portal';

import ListGridSlot1 from './panel/panelcomp/listcomp/ListGridSlot2'
import ListGridSlot2 from './panel/panelcomp/listcomp/ListGridSlot1'

const PopUps: React.FC = () =>
    <Portal>
        <ListGridSlot1 />
        <ListGridSlot2 />
    </Portal>

export default PopUps;
