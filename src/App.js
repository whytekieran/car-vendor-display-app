import React, { useEffect, useCallback, useState } from "react";
import carApiClient from "./CarDisplay/carApiClient";
import Legend from "./CarDisplay/Legend"
import CarList from "./CarDisplay/CarList"
import moment from "moment"
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  app: {
    textAlign: 'center'
  },
}));

function App() {
  const [loading, setLoading] = useState(true);
  const [pickAndReturnData, setPickAndReturnData] = useState({});
  const [vendorAndCarData, setVendorAndCarData] = useState([]);
  const classes = useStyles();

  const fetchCarData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await carApiClient().get("/cars.json", {});
      organizePickAndReturnData(results.data[0].VehAvailRSCore.VehRentalCore);
      setVendorAndCarData(results.data[0].VehAvailRSCore.VehVendorAvails);
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCarData();
  }, [fetchCarData]);

  const organizePickAndReturnData = (pickAndReturnData) => {
    const pickupLocation = pickAndReturnData.PickUpLocation['@Name'];
    const returnLocation = pickAndReturnData.ReturnLocation['@Name'];
    const pickupDateTime = moment.utc(pickAndReturnData['@PickUpDateTime']).format('MMMM Do YYYY, h:mm a');
    const returnDateTime = moment.utc(pickAndReturnData['@ReturnDateTime']).format('MMMM Do YYYY, h:mm a')

    const formattedPickAndReturnData = {
      pickupLocation,
      returnLocation,
      pickupDateTime,
      returnDateTime
    }

    setPickAndReturnData(formattedPickAndReturnData);
  };

  return (
    <Grid className={classes.app} container direction="row">
      <Grid item xs={3} />
      <Grid item xs={6}>
        <Grid direction="column" container>
          <Legend
            loading={loading}
            pickAndReturnData={pickAndReturnData}/>
          <CarList
            loading={loading}
            vendorAndCarData={vendorAndCarData}/>
        </Grid>
      </Grid>
      <Grid item xs={3} />
    </Grid>
  );
}

export default App;
