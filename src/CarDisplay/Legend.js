import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  legend: {
    marginTop: '5px !important',
    paddingTop: '5px',
    paddingBottom: '5px',
    border: '2px solid #f5f5f0',
    borderRadius: '5px'
  },
}));

function Legend(props) {
    const { loading, pickAndReturnData } = props;
    const classes = useStyles();

    if(!loading){
        return (
            <Grid className={classes.legend} container direction="row">
                <Grid item xs={6}>
                    <p><strong>PickUp Location:</strong> {pickAndReturnData.pickupLocation}</p>
                    <p><strong>PickUp Time:</strong> {pickAndReturnData.pickupDateTime}</p>
                </Grid>
                <Grid item xs={6}>
                    <p><strong>Return Location:</strong> {pickAndReturnData.returnLocation}</p>
                    <p><strong>Return Time:</strong> {pickAndReturnData.returnDateTime}</p>
                </Grid>
            </Grid>
        );
    } else {
        return (
            /** 
             * You could make this much fancier, maybe make a nice spinner component or maybe not include
             * at all, potential nice feature
            */
            <Grid>.......loading</Grid>
        );
    }
}

export default Legend;
