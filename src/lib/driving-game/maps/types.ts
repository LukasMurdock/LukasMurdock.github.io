export type RoadSegmentDefinition = {
  x: number;
  z: number;
  width: number;
  depth: number;
  rotation?: number;
  markings?: boolean | "taxiway";
  surfaceColor?: number;
};

export type ParkingLotDefinition = {
  x: number;
  z: number;
  width: number;
  depth: number;
};

export type BuildingDefinition = {
  x: number;
  z: number;
  width: number;
  depth: number;
  height: number;
  color: number;
  style?: "standard" | "hangar" | "tower";
};

export type PropDefinition = {
  x: number;
  z: number;
};

export type CircuitPhrase = {
  kind: "acceleration" | "sweeper" | "tightening" | "transition" | "cooldown" | "hairpin";
  span: number;
  radius: number;
  width: number;
};

export type MapSpawn =
  | { source: "circuit"; sampleIndex?: number }
  | { source: "position"; x: number; z: number; heading: number };

export type GameMapDefinition = {
  id: string;
  title: string;
  description: string;
  worldLimit: number;
  groundSize: number;
  environment: {
    background: number;
    grass: number;
    road: number;
    fogNear: number;
    fogFar: number;
    cameraFar: number;
    sideCameraFar: number;
    shadowExtent: number;
    shadowFar: number;
  };
  roads: readonly RoadSegmentDefinition[];
  parkingLots: readonly ParkingLotDefinition[];
  buildings: readonly BuildingDefinition[];
  trees: readonly PropDefinition[];
  streetlights: readonly PropDefinition[];
  barriers: readonly PropDefinition[];
  circuit?: readonly CircuitPhrase[];
  spawn: MapSpawn;
};
