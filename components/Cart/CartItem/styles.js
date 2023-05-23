import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
 
  media: {
    height: 260,
    color:'white',
    backgroundColor:"black"
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
    color:'white',
    backgroundColor:"black"
  },
  cartActions: {
    justifyContent: 'space-between',
    color:'white',
    backgroundColor:"black"
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
