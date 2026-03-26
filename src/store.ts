import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Result, ScoringMode, Station, Team } from './types';
import { stationSeed, teamSeed } from './lib/seed';

interface ScoreboardState {
  teams: Team[];
  stations: Station[];
  results: Result[];
  adminUnlocked: boolean;
  pin: string;
  unlockAdmin: (pinInput: string) => boolean;
  lockAdmin: () => void;
  setTeamName: (teamId: string, name: string) => void;
  setTeamAssignment: (teamId: string, type: 'houseStationId' | 'hotelStationId', stationId: string) => void;
  setStationMeta: (stationId: string, updates: Partial<Pick<Station, 'name' | 'location' | 'scoringMode'>>) => void;
  setResult: (teamId: string, stationId: string, rawValue: number | null) => void;
  resetDemo: () => void;
}

const replaceResult = (results: Result[], incoming: Result): Result[] => {
  const idx = results.findIndex((r) => r.teamId === incoming.teamId && r.stationId === incoming.stationId);
  if (idx >= 0) {
    const next = [...results];
    next[idx] = incoming;
    return next;
  }
  return [...results, incoming];
};

const isStationIdValid = (stations: Station[], stationId: string): boolean => stations.some((s) => s.id === stationId);

export const useScoreboardStore = create<ScoreboardState>()(
  persist(
    (set, get) => ({
      teams: teamSeed,
      stations: stationSeed,
      results: [],
      adminUnlocked: false,
      pin: 'MOnopolyKA2026',
      unlockAdmin: (pinInput) => {
        const ok = pinInput === get().pin;
        if (ok) {
          set({ adminUnlocked: true });
        }
        return ok;
      },
      lockAdmin: () => set({ adminUnlocked: false }),
      setTeamName: (teamId, name) =>
        set((state) => ({
          teams: state.teams.map((team) => (team.id === teamId ? { ...team, name } : team))
        })),
      setTeamAssignment: (teamId, type, stationId) =>
        set((state) => {
          if (!isStationIdValid(state.stations, stationId)) {
            return state;
          }
          return {
            teams: state.teams.map((team) => (team.id === teamId ? { ...team, [type]: stationId } : team))
          };
        }),
      setStationMeta: (stationId, updates) =>
        set((state) => ({
          stations: state.stations.map((station) => {
            if (station.id !== stationId) {
              return station;
            }
            const safeMode: ScoringMode | undefined = updates.scoringMode;
            return {
              ...station,
              ...updates,
              scoringMode: safeMode ?? station.scoringMode
            };
          })
        })),
      setResult: (teamId, stationId, rawValue) =>
        set((state) => ({
          results: replaceResult(state.results, { teamId, stationId, rawValue })
        })),
      resetDemo: () => set({ teams: teamSeed, stations: stationSeed, results: [], adminUnlocked: false })
    }),
    {
      name: 'scoreboard-state-v1',
      storage: createJSONStorage(() => localStorage)
    }
  )
);
