export type ScoringMode = 'score_desc' | 'time_asc';

export type TeamColor =
  | 'brown'
  | 'lightBlue'
  | 'pink'
  | 'orange'
  | 'red'
  | 'yellow'
  | 'green'
  | 'blue';

export interface Team {
  id: string;
  name: string;
  color: TeamColor;
  houseStationId: string;
  hotelStationId: string;
}

export interface Station {
  id: string;
  number: number;
  name: string;
  location: string;
  color: TeamColor;
  scoringMode: ScoringMode;
  valueLabel: string;
}

export interface Result {
  teamId: string;
  stationId: string;
  rawValue: number | null;
}

export interface StationRankingEntry {
  teamId: string;
  rawValue: number | null;
  rank: number | null;
  basePoints: number;
  multiplier: number;
  totalPoints: number;
}

export interface StationComputed {
  stationId: string;
  entries: StationRankingEntry[];
  enteredCount: number;
  isComplete: boolean;
  missingTeamIds: string[];
}

export interface TeamTotal {
  teamId: string;
  totalPoints: number;
  byStation: Record<string, number>;
  rank: number;
}
