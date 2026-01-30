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
    url: "/devices",
    icon: "/icons/devices.svg",
    children: [
      {
        title: "Device List",
        url: "/devices/list",
      },
      {
        title: "Zones",
        url: "/devices/zones",
      },
    ],
  },
  {
    title: "Firewall",
    url: "/firewall",
    icon: "/icons/firewall.svg",
    children: [
      {
        title: "Feed",
        url: "/firewall/feed",
      },
      {
        title: "IP Management",
        url: "/firewall/ip-management",
      },
      {
        title: "Pending IPs",
        url: "/firewall/ip-management/pending",
      },
      {
        title: "Log IPs",
        url: "firewall/ip-management/execute",
      },
    ],
  },
  // { title: "Retrofit", url: "/retrofit", icon: "/icons/retrofit.svg" },
];
