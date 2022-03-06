import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    carDetails: {
        border: '2px solid  #f5f5f0',
        borderRadius: '5px',
        boxShadow: '4px 6px #f5f5f0',
        marginTop: '4px',
        textAlign: 'left !important',
        padding: '10px 10px 10px 10px',
        cursor: 'pointer'
    }
  }));

function CarData(props) {
    const { carEntry } = props;
    const classes = useStyles();

    return (
        <Grid>
            <div className={classes.carDetails}>
                <img src={carEntry.Vehicle.PictureURL} alt="car"/><br/>
                <strong>Car Details:</strong><br/><br/>
                <strong>Make and Model:</strong> {carEntry.Vehicle.VehMakeModel['@Name']} <br/>
                <strong>Availability:</strong> {carEntry['@Status']} <br/>
                <strong>Air Conditioning:</strong> {carEntry.Vehicle['@AirConditionInd']} <br/>
                <strong>Transmission Type:</strong> {carEntry.Vehicle['@TransmissionType']} <br/>
                <strong>Fuel Type:</strong> {carEntry.Vehicle['@FuelType']} <br/>
                <strong>Drive Type:</strong> {carEntry.Vehicle['@DriveType']} <br/>
                <strong>Passenger Quantity:</strong> {carEntry.Vehicle['@PassengerQuantity']} <br/>
                <strong>Baggage Quantity:</strong> {carEntry.Vehicle['@BaggageQuantity']} <br/>
                <strong>Code:</strong> {carEntry.Vehicle['@Code']} <br/>
                <strong>Code Context:</strong> {carEntry.Vehicle['@CodeContext']} <br/>
                <strong>Door Count:</strong> {carEntry.Vehicle['@DoorCount']} <br/><br/>
                <strong>Car Pricing:</strong><br/><br/>
                <strong>Total Charge:</strong> {carEntry.TotalCharge['@RateTotalAmount']} <br/>
                <strong>Estimated Total Amount:</strong> {carEntry.TotalCharge['@EstimatedTotalAmount']} <br/>
                <strong>Currency Code:</strong> {carEntry.TotalCharge['@CurrencyCode']} <br/>
            </div>
        </Grid>
    );
}

export default CarData;
