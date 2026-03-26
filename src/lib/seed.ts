import type { Station, Team } from '../types';

export const TEAM_COLORS = {
  brown: 'bg-amber-800',
  lightBlue: 'bg-sky-300 text-slate-900',
  pink: 'bg-pink-400',
  orange: 'bg-orange-500',
  red: 'bg-red-600',
  yellow: 'bg-yellow-300 text-slate-900',
  green: 'bg-green-600',
  blue: 'bg-blue-700'
} as const;

export const stationSeed: Station[] = [
  { id: 's1', number: 1, name: 'Lieder raten', location: 'Opernplatz', color: 'brown', scoringMode: 'score_desc', valueLabel: 'Punkte' },
  { id: 's2', number: 2, name: '1, 2, oder 3', location: 'Medienzentrum', color: 'lightBlue', scoringMode: 'score_desc', valueLabel: 'Punkte' },
  { id: 's3', number: 3, name: 'Ballonbumsen', location: 'Brunnenstraße', color: 'pink', scoringMode: 'time_asc', valueLabel: 'Zeit (Sek.)' },
  { id: 's4', number: 4, name: 'Pantomime', location: 'Theaterstraße', color: 'orange', scoringMode: 'score_desc', valueLabel: 'Punkte' },
  { id: 's5', number: 5, name: 'Bierstaffel', location: 'Bermuda-Dreieck', color: 'red', scoringMode: 'time_asc', valueLabel: 'Zeit (Sek.)' },
  { id: 's6', number: 6, name: 'Bobbycar-Rennen', location: 'Gefängnis', color: 'yellow', scoringMode: 'time_asc', valueLabel: 'Zeit (Sek.)' },
  { id: 's7', number: 7, name: 'Fleischpeitsche', location: 'Handelshof', color: 'green', scoringMode: 'time_asc', valueLabel: 'Zeit (Sek.)' },
  { id: 's8', number: 8, name: 'Geldturm bauen', location: 'Schlossallee', color: 'blue', scoringMode: 'score_desc', valueLabel: 'Höhe/Punkte' }
];

export const teamSeed: Team[] = [
  { id: 't1', name: 'Team Braun', color: 'brown', houseStationId: 's1', hotelStationId: 's8' },
  { id: 't2', name: 'Team Hellblau', color: 'lightBlue', houseStationId: 's2', hotelStationId: 's7' },
  { id: 't3', name: 'Team Pink', color: 'pink', houseStationId: 's3', hotelStationId: 's6' },
  { id: 't4', name: 'Team Orange', color: 'orange', houseStationId: 's4', hotelStationId: 's5' },
  { id: 't5', name: 'Team Rot', color: 'red', houseStationId: 's5', hotelStationId: 's4' },
  { id: 't6', name: 'Team Gelb', color: 'yellow', houseStationId: 's6', hotelStationId: 's3' },
  { id: 't7', name: 'Team Grün', color: 'green', houseStationId: 's7', hotelStationId: 's2' },
  { id: 't8', name: 'Team Blau', color: 'blue', houseStationId: 's8', hotelStationId: 's1' }
];

export const pointsByRank = [7, 6, 5, 4, 3, 2, 1, 0];
