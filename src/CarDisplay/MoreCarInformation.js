import React, { useEffect, useCallback, useState } from "react";
import CarData from './CarData'
import carApiClient from "./carApiClient";
import { Grid } from "@material-ui/core";

function MoreCarInformation() {
    const [loading, setLoading] = useState(true);
    const [currentlySelectedCar, setCurrentlySelectedCar] = useState({});

    const fetchCurrentlySelectedCarData = useCallback(async () => {
        setLoading(true);
        try {
            const results = await carApiClient().get("/cars.json", {});
            const selectedVendorAndCarId = getVendorAndCarIds();
            const foundVendor = results.data[0].VehAvailRSCore.VehVendorAvails.find(vendorAndCars => vendorAndCars.Vendor['@Code'] === selectedVendorAndCarId[0]);
            const foundCar = foundVendor.VehAvails[selectedVendorAndCarId[1]]
            setCurrentlySelectedCar(foundCar);
        } catch (e) {
            console.log(e);
        }
        setLoading(false);
    }, [setCurrentlySelectedCar]);

    const getVendorAndCarIds = () => {
        const currentPath = window.location.pathname;
        const currentPathSplit = currentPath.split("/");
        const currentlySelectedVendor = currentPathSplit[3];
        const currentlySelectedCar = currentPathSplit[4];

        return [currentlySelectedVendor, currentlySelectedCar]
    }

    useEffect(() => {
        fetchCurrentlySelectedCarData()
    }, [fetchCurrentlySelectedCarData]);

    if(!loading){
        return (
            <CarData carEntry={currentlySelectedCar}/>
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

export default MoreCarInformation;
