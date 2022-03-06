import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import CarData from './CarData'
import { Grid } from "@material-ui/core";

function CarDetails(props) {
    const [sortedCarData, setSortedCarData] = useState([]);
    const { selectedVendorCarData, selectedVendorCode, allVendorsAndCarData } = props;
    const navigate = useNavigate();

    useEffect(() => {
        /*Make a copy in first line before sorting otherwise we will be manipulating the original data
        We dont want this because when we select a car it should route us to
        another page and it should dynamically load the choosen car, like so:
        
        -Get the current vendor and index of selected car (done inside the showMore function below)
        we need the original list for this hence why we are making a copy, otherwise we will 
        be trying to find index in an already sorted list.
        
        -Then in dynamic page that shows the car we can use selected vendor and index to find the 
        car we want to display

        -In production you may only want to request this list every so often and keep it stored
        locally using something like Redux or XState, depends how often the data is updated.

        Lots of interesting things to chat about :) 
        */
        const selectedVendorCarDataCopy = [...selectedVendorCarData]
        const sortedCars = selectedVendorCarDataCopy.sort(sortCarsByPrice);
        setSortedCarData(sortedCars);
    }, [selectedVendorCarData]);

    const sortCarsByPrice = (car1, car2) => {
        return parseFloat(car1.TotalCharge['@RateTotalAmount']) - parseFloat(car2.TotalCharge['@RateTotalAmount']);
    }

    //this function could be shared
    const findSelectedVendor = (vendorAndCarData) => {
        return vendorAndCarData.find(vendorAndCars => vendorAndCars.Vendor['@Code'] === selectedVendorCode);
    }

    const showMore = (selectedCar) => () => {
        //Get correct vendor
        const foundVendor = findSelectedVendor(allVendorsAndCarData);
        const vendorId = foundVendor.Vendor['@Code']
        /*Now check vendor and find index of selected car from original data (source of truth) 
        also another option for the check below would be to use isEqual from lodash library*/
        const foundIndex = foundVendor.VehAvails.findIndex(car => JSON.stringify(car) === JSON.stringify(selectedCar));
        
        navigate(`/CarDisplay/MoreCarInformation/${vendorId}/${foundIndex}`)
    };

    return (
        <Grid>
            {sortedCarData.map((carEntry, index) => (
                <div onClick={showMore(carEntry)} key={index}>
                    <CarData carEntry={carEntry}/>
                </div>
            ))}
        </Grid>
    );
}

export default CarDetails;
