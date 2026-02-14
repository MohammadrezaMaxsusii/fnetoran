export const newScantItems = [
  {
    title: "Basic Network Scan",
    description: "A simple scan to discover live hosts and open ports.",
    image: "/images/world.png",
  },
  {
    title: "Advanced Scan",
    description: "A simple scan to discover live hosts and open ports.",
    image: "/images/barcodeOne.png",
  },
  {
    title: "Advanced Dynamic Scan",
    description: "A simple scan to discover live hosts and open ports.",
    image: "/images/barcodeTwo.png",
  },
];

export const accordionItems = [
  {
    title: "Basic",
    children: [
      {
        title: "General",
        url: "/devices/new-scan/basic",
      },
    ],
  },
  // This is mock until API is ready.
  {
    title: "Discovery",
    children: [
      {
        title: "Test",
        url: "/devices/new-scan/test",
      },
    ],
  },
];