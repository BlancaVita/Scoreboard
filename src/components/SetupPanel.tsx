import type { Station, Team } from '../types';

interface Props {
  teams: Team[];
  stations: Station[];
  onTeamName: (teamId: string, name: string) => void;
  onAssign: (teamId: string, type: 'houseStationId' | 'hotelStationId', stationId: string) => void;
}

export const SetupPanel = ({ teams, stations, onTeamName, onAssign }: Props) => (
  <section className="rounded-xl border-4 border-emerald-900 bg-amber-50 p-4 shadow-board">
    <h2 className="mb-3 text-xl font-bold text-emerald-950">Setup Configuration</h2>
    <div className="space-y-2">
      {teams.map((team) => (
        <div key={team.id} className="grid grid-cols-1 gap-2 md:grid-cols-[1fr,130px,130px]">
          <input
            value={team.name}
            onChange={(e) => onTeamName(team.id, e.target.value)}
            className="rounded border border-emerald-300 px-3 py-1"
          />
          <select
            value={team.houseStationId}
            onChange={(e) => onAssign(team.id, 'houseStationId', e.target.value)}
            className="rounded border border-emerald-300 px-2 py-1"
          >
            {stations.map((station) => <option key={`${team.id}-house-${station.id}`} value={station.id}>House S{station.number}</option>)}
          </select>
          <select
            value={team.hotelStationId}
            onChange={(e) => onAssign(team.id, 'hotelStationId', e.target.value)}
            className="rounded border border-emerald-300 px-2 py-1"
          >
            {stations.map((station) => <option key={`${team.id}-hotel-${station.id}`} value={station.id}>Hotel S{station.number}</option>)}
          </select>
        </div>
      ))}
    </div>
  </section>
);
