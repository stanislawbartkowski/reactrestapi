import React from 'react';

import Portal from '@material-ui/core/Portal';

import CompGridSlot1 from './panel/panelcomp/restcomp/CompGridSlot1'
import CompGridSlot2 from './panel/panelcomp/restcomp/CompGridSlot2'
import CompGridSlot3 from './panel/panelcomp/restcomp/CompGridSlot3'

const PopUps: React.FC = () =>
    <Portal>
        <CompGridSlot1 />
        <CompGridSlot2 />
        <CompGridSlot3 />
    </Portal>

export default PopUps;
