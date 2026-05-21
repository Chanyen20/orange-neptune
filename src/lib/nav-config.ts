export type NavItemId = "capabilities" | "traffic" | "results" | "insights" | "company";

export type NavSubItemId =
  | "consumerPositioning"
  | "amazonAdvertising"
  | "walmartAdvertising"
  | "influencerSocialCommerce"
  | "googleMetaAds"
  | "fulfillmentEfficiency"
  | "demandMapping"
  | "channelOrchestration"
  | "marketplaceConversion"
  | "compoundingLoops"
  | "roasPrograms"
  | "localization"
  | "categoryLeadership"
  | "operationalScale"
  | "newMarketEntry"
  | "marketplaceReports"
  | "playbooks"
  | "briefings"
  | "frameworks"
  | "about"
  | "team"
  | "principles"
  | "contact";

export type NavSubItem = { id: NavSubItemId; to: string };
export type NavItemConfig = { id: NavItemId; to: string; items: NavSubItem[] };

export const NAV_ITEMS: NavItemConfig[] = [
  {
    id: "capabilities",
    to: "/capabilities",
    items: [
      { id: "consumerPositioning", to: "/capabilities" },
      { id: "amazonAdvertising", to: "/capabilities" },
      { id: "walmartAdvertising", to: "/capabilities" },
      { id: "influencerSocialCommerce", to: "/capabilities" },
      { id: "googleMetaAds", to: "/capabilities" },
      { id: "fulfillmentEfficiency", to: "/capabilities" },
    ],
  },
  {
    id: "traffic",
    to: "/traffic",
    items: [
      { id: "demandMapping", to: "/traffic" },
      { id: "channelOrchestration", to: "/traffic" },
      { id: "marketplaceConversion", to: "/traffic" },
      { id: "compoundingLoops", to: "/traffic" },
    ],
  },
  {
    id: "results",
    to: "/results",
    items: [
      { id: "roasPrograms", to: "/results" },
      { id: "localization", to: "/results" },
      { id: "categoryLeadership", to: "/results" },
      { id: "operationalScale", to: "/results" },
      { id: "newMarketEntry", to: "/results" },
    ],
  },
  {
    id: "insights",
    to: "/insights",
    items: [
      { id: "marketplaceReports", to: "/insights" },
      { id: "playbooks", to: "/insights" },
      { id: "briefings", to: "/insights" },
      { id: "frameworks", to: "/insights" },
    ],
  },
  {
    id: "company",
    to: "/company",
    items: [
      { id: "about", to: "/company" },
      { id: "team", to: "/company" },
      { id: "principles", to: "/company" },
      { id: "contact", to: "/company" },
    ],
  },
];
