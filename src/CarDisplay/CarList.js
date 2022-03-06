import React from "react";
import CarDetails from "./CarDetails";
import { Grid, Accordion, AccordionSummary, Typography, AccordionDetails } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    carDisplay: {
      marginTop: '5px'
    }
}));

function CarList(props) {
    const { loading, vendorAndCarData } = props;
    const classes = useStyles();

    if(!loading){
        return (
            <Grid className={classes.carDisplay} item>
                {vendorAndCarData.map((dataEntry, index) => (
                    <Accordion key={index}>
                        <AccordionSummary
                        id={index}>
                        <Typography>
                            {dataEntry.Vendor['@Name']}
                        </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CarDetails 
                                allVendorsAndCarData={vendorAndCarData}
                                selectedVendorCode={dataEntry.Vendor['@Code']}
                                selectedVendorCarData={dataEntry.VehAvails}/>
                        </AccordionDetails>
                    </Accordion>
                ))}
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

export default CarList;
