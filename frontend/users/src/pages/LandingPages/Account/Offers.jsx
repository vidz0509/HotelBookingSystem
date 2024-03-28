import React from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Grid from "@mui/material/Grid";

export default function Offer() {
    return (
        <>
            <MKBox
                display="flex"
                flexDirection="column"
                justifyContent="center"
            >
                <MKBox>
                    <MKBox width="100%" component="form" method="post" autoComplete="off">
                        <MKTypography variant="h4" color="text" mb={4}>
                            My Offers
                        </MKTypography>

                        <Grid container item xs={12} lg={10} justifyContent="center" mx="auto" className="form-wrap">
                            <img src="/offers.png" className="customImage" width="100" height="100" />
                        </Grid>
                    </MKBox>
                </MKBox>
            </MKBox>
        </>
    );
}