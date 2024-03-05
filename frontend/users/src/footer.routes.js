// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/dark-logo.png";

const date = new Date().getFullYear();

export default {
  brand: {
    name: "Budget Suites",
    image: logoCT,
    route: "/",
  },
  aboutUs: [
    {
      name: "About Us",
      items: [
        { name: "Our Website is a commercial establishment that provides lodging, meals, and other services to guests, travelers, and tourists." },
      ],
    }
  ],
  quickLinks: [
    {
      name: "Quick Links",
      items: [
        { name: "Home", route: "/" },
        { name: "About Us", route: "/about-us" },
        { name: "Contact Us", route: "/contact-us" },
        { name: "Account", route: "/account" },
      ],
    },
  ],
  contactUs: [
    {
      name: "Contact Us",
      items: [
        { name: "terms & conditions", href: "https://www.creative-tim.com/terms" },
        { name: "privacy policy", href: "https://www.creative-tim.com/privacy" },
        { name: "licenses (EULA)", href: "https://www.creative-tim.com/license" },
      ],
    },
  ],

  copyright: (
    <MKTypography fontWeight="regular">
      All rights reserved. Copyright &copy; {date} Budget Suites{" "}
    </MKTypography>
  ),
};


