/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// react-router-dom components
import { Link } from "react-router-dom";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";

function DefaultFooter({ content }) {
  const { brand, aboutUs, quickLinks, contactUs, copyright } = content;

  return (
    <MKBox component="footer">
      <Container>
        <Grid container spacing={3}>
          <Grid item md={3} sx={{ ml: "auto", mb: 3 }}>
            <MKBox>
              <Link to={brand.route}>
                <MKBox component="img" src={brand.image} alt={brand.name} mb={2} sx={{ maxWidth: "180px" }} />
              </Link>
            </MKBox>
          </Grid>
          {aboutUs.map(({ name: name, items }) => (
            <Grid key={name} item md={3} sx={{ mb: 3 }}>
              <div className="footer-title">
                <MKTypography display="block" fontWeight="bold" textTransform="capitalize" mb={1}>
                  {name}
                </MKTypography>
              </div>
              <MKBox component="ul" p={0} m={0} sx={{ listStyle: "none", }}>
                {items.map(({ name }) => (
                  <MKBox key={name} component="li" p={0} m={0} lineHeight={1.25}>
                    <div className="footer-content">
                      <MKTypography
                        component="p"
                        fontWeight="regular"
                        textTransform="capitalize"
                      >
                        {name}
                      </MKTypography>
                    </div>
                  </MKBox>
                ))}
              </MKBox>
            </Grid>
          ))}
          <Grid key={"test"} item md={1} sx={{ mb: 3 }}>
          </Grid>
          {quickLinks.map(({ name: name, items }) => (
            <Grid key={name} item md={2} sx={{ mb: 3 }}>
              <div className="footer-title">
                <MKTypography display="block" fontWeight="bold" textTransform="capitalize" mb={1}>
                  {name}
                </MKTypography>
              </div>
              <MKBox component="ul" p={0} m={0} sx={{ listStyle: "none", }}>
                {items.map(({ name, route }) => (
                  <MKBox key={name} component="li" p={0} m={0} lineHeight={1.25}>
                    <div className="footer-content">
                      {route && (
                        <MKTypography
                          component={Link}
                          to={route}
                          variant="button"
                          fontWeight="regular"
                          textTransform="capitalize"
                        >
                          {name}
                        </MKTypography>
                      )}
                    </div>
                  </MKBox>
                ))}
              </MKBox>
            </Grid>
          ))}
          {contactUs.map(({ name: name, items }) => (
            <Grid key={name} item md={3} sx={{ mb: 3 }}>
              <div className="footer-title">
                <MKTypography display="block" fontWeight="bold" textTransform="capitalize" mb={1}>
                  {name}
                </MKTypography>
              </div>
              <MKBox component="ul" p={0} m={0} sx={{ listStyle: "none", }}>
                {items.map(({ name,href }) => (
                  <MKBox key={name} component="li" p={0} m={0} lineHeight={1.25}>
                    <div className="footer-content">
                    {href && (
                        <MKTypography
                          component="a"
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          variant="button"
                          fontWeight="regular"
                          textTransform="capitalize"
                        >
                          {name}
                        </MKTypography>
                      )}
                      < MKTypography
                        component="p"
                        fontWeight="regular"
                        textTransform="capitalize"
                      >
                        {/* {name} */}
                      </MKTypography>
                    </div>
                  </MKBox>
                ))}
              </MKBox>
            </Grid>
          ))}
          <Grid item xs={12} sx={{ textAlign: "center", my: 3 }}>
            <div className="footer-content">
              {copyright}
            </div>
          </Grid>
        </Grid>
      </Container>
    </MKBox >
  );
}

// Typechecking props for the DefaultFooter
DefaultFooter.propTypes = {
  content: PropTypes.objectOf(PropTypes.oneOfType([PropTypes.object, PropTypes.array])).isRequired,
};

export default DefaultFooter;
