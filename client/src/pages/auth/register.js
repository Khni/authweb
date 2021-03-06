import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { Grid } from '@material-ui/core';
import Button from '@material-ui/core/Button';

import Paper from '@material-ui/core/Paper'


const useStyles = makeStyles((theme) => ({


  form: {

    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
     
      '& fieldset': {
        borderColor: 'gray',
      },
      '&:hover fieldset': {
        //borderColor: 'yellow',
      },



    },


  },

  formTitle :{
    margin: '0 auto'
  },
  Paper: {
    padding: '40px'
  }

  

}));



const Register = (props) => {

   const handleSubmit =(event) =>{
     event.preventDefault()
   console.log("event" +event);
   }


  const classes = useStyles();
  return (
    <Grid
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justify="center"

    >

<Paper elevation={3} className={classes.Paper}>
      <form onSubmit={handleSubmit} className={classes.form}>

        <h3 className={classes.formTitle}>Register</h3>
        <TextField id="outlined-basic"
          label="Email"
          variant="outlined" />
        <TextField id="outlined-basic"
          label="Email"
          variant="outlined" />
        <TextField id="outlined-basic"
          label="Email"
          variant="outlined" />


        <Button type="submit" variant="contained" color="primary">
          Register
          </Button>


      </form>
</Paper>

    </Grid>






  )
}

export default Register