export interface FlightData {
  NOTE: string;
  altitudeKm: number;
  distanceEarthCenterKm: number;
  distanceTravelledKm: number;
  elapsedDays: number;
  elapsedHours: number;
  elapsedMinutes: number;
  elapsedSeconds: number;
  velocityKmSec: number;
}

export interface RelatedMedia {
  description: string;
  name: string;
  url: string;
}

export interface RelatedLink extends RelatedMedia {
  target: string;
}

export interface DeploymentState {
  approxDistanceFromEarthMiles: number;
  approxDuration: number;
  approxEndTimeRelToLaunch: string;
  approxSpeedMph: number;
  approxStartTimeRelToLaunch: string;
  details: string;
  eventId: string;
  moreDetails: string;
  nominalEventTime: string;
  relatedImages: RelatedMedia[];
  relatedLinks: RelatedLink[];
  relatedVideos: RelatedMedia[];
  stateImageUrl: string;
  stateImageUrlPrevious: string;
  status: string;
  subtitle: string;
  thumbnailUrl: string;
  title: string;
}

export interface WebbGlobals {
  data?: {
    flightData?: FlightData[];
  };
  deploymentStateArray?: DeploymentState[];
}
