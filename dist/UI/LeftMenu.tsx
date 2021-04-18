import React, { FunctionComponent } from 'react';

import Button from '@material-ui/core/Button'

type TLeftButton = {
    text: string,
    clicked: Function
}


const LeftButton: FunctionComponent<TLeftButton> = ({ text, clicked }) => (
    <Button onClick={() => clicked()} variant="contained" style={{ float: 'left', marginTop: "15px", marginLeft: "5px" }}> {text}
    </Button>
)

export default LeftButton;