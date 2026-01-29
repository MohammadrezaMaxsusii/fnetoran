export const sidebarItems = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: "/icons/dashboard.svg",
  },
  { title: "Users", url: "/users", icon: "/icons/users.svg" },
  { title: "Roles", url: "/roles", icon: "/icons/roles.svg" },
  {
    title: "Permissions",
    url: "/permissions",
    icon: "/icons/permission.svg",
  },
  {
    title: "Devices",
    icon: "/icons/devices.svg",
    children: [
      {
        title: "Device List",
        url: "/devices",
      },
      {
        title: "Zones",
        url: "/zones",
      },
    ],
  },
  {
    title: "Firewall",
    icon: "/icons/firewall.svg",
    children: [
      {
        title: "Feed",
        url: "/feed",
      },
      {
        title: "IP Management",
        url: "/ip-management",
      },
      {
        title: "Pending IPs",
        url: "/ip-management/pending",
      },
      {
        title: "Log IPs",
        url: "/ip-management/execute",
      },
    ],
  },
  // { title: "Retrofit", url: "/retrofit", icon: "/icons/retrofit.svg" },
];
