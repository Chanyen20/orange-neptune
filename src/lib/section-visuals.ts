/*
 * Shared mapping of content keys to lucide icons and case-study imagery, so the
 * home page and the inner pages render the same icon for the same item.
 */
import type { LucideIcon } from "lucide-react";
import {
  BarChart3,
  Building2,
  Compass,
  Database,
  Factory,
  Filter,
  Mail,
  Megaphone,
  MousePointer,
  MousePointerClick,
  RefreshCw,
  Search,
  Share2,
  Store,
  Target,
  TrendingUp,
  Truck,
  Users,
  UsersRound,
} from "lucide-react";

export const capabilityIcons: Record<string, LucideIcon> = {
  consumerPositioning: Target,
  amazonAdvertising: Megaphone,
  walmartAdvertising: Store,
  influencerSocialCommerce: Share2,
  googleMetaAds: MousePointerClick,
  fulfillmentEfficiency: Truck,
};

export const trafficIcons: Record<string, LucideIcon> = {
  "01": Search,
  "02": MousePointer,
  "03": Filter,
  "04": BarChart3,
};

export const resultIcons: Record<string, LucideIcon> = {
  roas: TrendingUp,
  reposition: RefreshCw,
  oem: Factory,
  creator: Users,
  data: Database,
};

export const resultImages: Record<string, string> = {
  roas: "/images/case-roas.jpg",
  reposition: "/images/case-reposition.jpg",
  oem: "/images/case-oem.jpg",
  creator: "/images/case-creator.jpg",
  data: "/images/case-data.jpg",
};

export const companyIcons: Record<string, LucideIcon> = {
  about: Building2,
  team: UsersRound,
  principles: Compass,
  contact: Mail,
};
