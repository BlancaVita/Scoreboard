import { pointsByRank } from './seed';
import type { Result, Station, StationComputed, Team, TeamTotal } from '../types';

const sortForMode = (mode: Station['scoringMode'], a: number, b: number): number => {
  if (mode === 'score_desc') {
    return b - a;
  }
  return a - b;
};

export const computeStation = (station: Station, teams: Team[], results: Result[]): StationComputed => {
  const stationResults = teams.map((team) => {
    const found = results.find((r) => r.stationId === station.id && r.teamId === team.id);
    return {
      teamId: team.id,
      rawValue: found?.rawValue ?? null
    };
  });

  const entered = stationResults.filter((entry) => entry.rawValue !== null) as Array<{ teamId: string; rawValue: number }>;
  const sorted = [...entered].sort((a, b) => sortForMode(station.scoringMode, a.rawValue, b.rawValue));

  const rankMap = new Map<string, number>();
  let currentRank = 1;
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i - 1].rawValue !== sorted[i].rawValue) {
      currentRank = i + 1;
    }
    rankMap.set(sorted[i].teamId, currentRank);
  }

  const entries = stationResults.map((entry) => {
    const rank = rankMap.get(entry.teamId) ?? null;
    const basePoints = rank ? pointsByRank[rank - 1] ?? 0 : 0;
    const team = teams.find((x) => x.id === entry.teamId)!;
    const multiplier = team.hotelStationId === station.id ? 3 : team.houseStationId === station.id ? 2 : 1;

    return {
      teamId: entry.teamId,
      rawValue: entry.rawValue,
      rank,
      basePoints,
      multiplier,
      totalPoints: basePoints * multiplier
    };
  });

  return {
    stationId: station.id,
    entries,
    enteredCount: entered.length,
    isComplete: entered.length === teams.length,
    missingTeamIds: stationResults.filter((x) => x.rawValue === null).map((x) => x.teamId)
  };
};

export const computeAll = (stations: Station[], teams: Team[], results: Result[]): { stations: StationComputed[]; totals: TeamTotal[] } => {
  const stationComputed = stations.map((s) => computeStation(s, teams, results));
  const totals = teams.map((team) => {
    const byStation: Record<string, number> = {};
    let totalPoints = 0;

    for (const station of stationComputed) {
      const entry = station.entries.find((e) => e.teamId === team.id);
      const points = entry?.totalPoints ?? 0;
      byStation[station.stationId] = points;
      totalPoints += points;
    }

    return {
      teamId: team.id,
      totalPoints,
      byStation,
      rank: 0
    };
  });

  const sorted = [...totals].sort((a, b) => b.totalPoints - a.totalPoints);
  let currentRank = 1;
  for (let i = 0; i < sorted.length; i += 1) {
    if (i > 0 && sorted[i - 1].totalPoints !== sorted[i].totalPoints) {
      currentRank = i + 1;
    }
    sorted[i].rank = currentRank;
  }

  return {
    stations: stationComputed,
    totals: sorted
  };
};
