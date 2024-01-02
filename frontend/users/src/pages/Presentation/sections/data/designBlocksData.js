const importAll = (context) => context.keys().map(context);
const images = Array.from(new Set(importAll(require.context('assets/images/Home-page/', false, /\.(jpg)$/))));
console.log(images);
export default [
  {
    title: "Design Blocks",
    description: "A selection of 45 page sections that fit perfectly in any combination",
    items: [
      {
        image: `${images[0]}`,
        name: "Ice Land",
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${images[1]}`,
        name: "Las Vegas",
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${images[2]}`,
        name: "London",
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${images[3]}`,
        name: "Paris",
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${images[4]}`,
        name: "Spain",
        route: "/sections/page-sections/page-headers",
      },
      {
        image: `${images[5]}`,
        name: "Switzerland",
        route: "/sections/page-sections/page-headers",
      },
    ],
  },
];
