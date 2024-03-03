import React from "react";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

export default function Booking() {
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
                            My Bookings
                        </MKTypography>
                    </MKBox>
                </MKBox>
            </MKBox>
        </>
    );
}