import { TEAM_COLORS } from '../lib/seed';
import type { Station, StationComputed, Team } from '../types';

interface Props {
  station: Station;
  computed: StationComputed;
  teams: Team[];
  editable: boolean;
  onChange: (teamId: string, stationId: string, value: number | null) => void;
}

export const StationCard = ({ station, computed, teams, editable, onChange }: Props) => (
  <section className="rounded-xl border-4 border-emerald-900 bg-white/90 p-3 shadow-board">
    <header className="mb-2 flex items-center justify-between">
      <div>
        <h3 className="text-lg font-bold text-emerald-900">#{station.number} {station.name}</h3>
        <p className="text-xs text-slate-600">{station.location} · {station.scoringMode === 'score_desc' ? 'Higher is better' : 'Lower is better'}</p>
      </div>
      <span className={`rounded px-2 py-1 text-xs font-bold text-white ${TEAM_COLORS[station.color]}`}>{computed.enteredCount}/8</span>
    </header>

    <div className="space-y-2">
      {computed.entries.map((entry) => {
        const team = teams.find((x) => x.id === entry.teamId)!;
        return (
          <div key={team.id} className="grid grid-cols-[1fr,90px,60px,80px] items-center gap-2 rounded bg-emerald-50 p-2 text-sm">
            <div className="truncate">
              <span className={`mr-2 inline-block h-3 w-3 rounded-full ${TEAM_COLORS[team.color]}`} />
              {team.name}
            </div>
            <input
              type="number"
              step="0.01"
              disabled={!editable}
              value={entry.rawValue ?? ''}
              onChange={(e) => onChange(team.id, station.id, e.target.value === '' ? null : Number(e.target.value))}
              className="w-full rounded border border-emerald-300 px-2 py-1 disabled:bg-slate-100"
              placeholder={station.valueLabel}
            />
            <div className="font-semibold">{entry.rank ? `#${entry.rank}` : '-'}</div>
            <div className="font-semibold">{entry.totalPoints} pt</div>
          </div>
        );
      })}
    </div>

    <p className="mt-2 text-xs text-slate-600">
      {computed.isComplete ? 'Final ranking complete.' : `Provisional ranking · missing ${computed.missingTeamIds.length} team(s).`}
    </p>
  </section>
);
