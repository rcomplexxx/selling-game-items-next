import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '5%',
    color:"white"
  },
  emptyButton: {
    backgroundColor:"transparent",
    color:"white",
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    }
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
  },
  cardDetails: {
    
    display: 'flex',
    marginTop: '15vh',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom:'5vh'
  },
  emptyCartText:{
    color:"white",
     marginBottom:'5vh'
  }
}));
