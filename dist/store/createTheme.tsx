import { createTheme } from '@material-ui/core/styles';
import { plPL } from '@material-ui/core/locale';

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