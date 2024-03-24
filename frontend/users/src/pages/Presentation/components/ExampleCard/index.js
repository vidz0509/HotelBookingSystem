// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Tooltip from "@mui/material/Tooltip";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import Link from "assets/theme/components/link";

function ExampleCard({ image, name,url, address, count, pro, hideName, ...rest }) {
  const imageTemplate = (
    <MKBox
      bgColor="white"
      borderRadius="xl"
      shadow="lg"
      minHeight="8rem"
      sx={{
        overflow: "hidden",
        transform: "perspective(999px) rotateX(0deg) translate3d(0, 0, 0)",
        transformOrigin: "50% 0",
        backfaceVisibility: "hidden",
        willChange: "transform, box-shadow",
        transition: "transform 200ms ease-out",

        "&:hover": {
          transform: "perspective(999px) rotateX(7deg) translate3d(0px, -4px, 5px)",
        },
      }}
      {...rest}
    >
      <a href={url}>
      <MKBox
        component="img"
        src={image}
        alt={name}
        width="100%"
        my="auto"
        opacity={pro ? 0.6 : 1}
      />
      </a>
    </MKBox>
  );
  return (
    <MKBox position="relative">
      {pro ? (
        <Tooltip title="Pro Element" placement="top">
          {imageTemplate}
        </Tooltip>
      ) : (
        hideName ? <>
          {imageTemplate}
        </> : <>{imageTemplate}</>

      )}
      {!hideName &&
        <>
          {name || count > 0 ? (
            <MKBox mt={1} ml={1} lineHeight={1}>
              {name && (
                <>
                <a href={url}>
                  <MKTypography variant="h6" fontWeight="bold">
                    {name}
                  </MKTypography>
                  <MKTypography variant="h6" fontWeight="bold">
                    {address}
                  </MKTypography>
                  </a>
                </>
              )}
              {count > 0 && (
                <MKTypography variant="button" fontWeight="regular" color="secondary">
                  {count} {count === 1 ? "Example" : "Examples"}
                </MKTypography>
              )}
            </MKBox>
          ) : null}
        </>
      }
    </MKBox>
  );
}

// Setting default props for the ExampleCard
ExampleCard.defaultProps = {
  name: "",
  count: 0,
  pro: false,
};

// Typechecking props for the ExampleCard
ExampleCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string,
  url: PropTypes.string,
  count: PropTypes.number,
  pro: PropTypes.bool,
  hideName: PropTypes.bool,
};

export default ExampleCard;
