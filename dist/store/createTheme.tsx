import { createTheme } from '@mui/material/styles';
import { plPL } from '@mui/material/locale';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
  },
}, plPL);


//  const theme = createMuiTheme({
//    palette: {
//      primary: {
//        main: purple[500],
//      },
//      secondary: {
//        main: green[500],
//      },
//    },
//  });

export default theme;