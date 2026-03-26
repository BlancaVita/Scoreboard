import { TEAM_COLORS } from '../lib/seed';
import type { Station, Team, TeamTotal } from '../types';

interface Props {
  teams: Team[];
  stations: Station[];
  totals: TeamTotal[];
}

export const LeaderboardTable = ({ teams, stations, totals }: Props) => (
  <div className="rounded-xl border-4 border-emerald-900 bg-emerald-50 p-4 shadow-board">
    <h2 className="mb-3 text-xl font-bold text-emerald-950">Overall Leaderboard</h2>
    <div className="overflow-auto">
      <table className="w-full min-w-[900px] border-collapse text-sm">
        <thead>
          <tr className="bg-emerald-200 text-left">
            <th className="p-2">Rank</th>
            <th className="p-2">Team</th>
            {stations.map((station) => (
              <th key={station.id} className="p-2">S{station.number}</th>
            ))}
            <th className="p-2">Total</th>
          </tr>
        </thead>
        <tbody>
          {totals.map((total) => {
            const team = teams.find((x) => x.id === total.teamId)!;
            return (
              <tr key={team.id} className="border-b border-emerald-100">
                <td className="p-2 font-bold">#{total.rank}</td>
                <td className="p-2">
                  <span className={`mr-2 inline-block h-3 w-3 rounded-full ${TEAM_COLORS[team.color]}`} />
                  {team.name}
                </td>
                {stations.map((station) => (
                  <td key={`${team.id}-${station.id}`} className="p-2">
                    {total.byStation[station.id]}
                    {team.houseStationId === station.id ? ' 🏠' : ''}
                    {team.hotelStationId === station.id ? ' 🏨' : ''}
                  </td>
                ))}
                <td className="p-2 font-bold">{total.totalPoints}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
);
