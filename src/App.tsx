import { useMemo, useState } from 'react';
import { LeaderboardTable } from './components/LeaderboardTable';
import { SetupPanel } from './components/SetupPanel';
import { StationCard } from './components/StationCard';
import { computeAll } from './lib/scoring';
import { useScoreboardStore } from './store';

const AdminGate = () => {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const unlock = useScoreboardStore((s) => s.unlockAdmin);

  return (
    <div className="mx-auto mt-20 max-w-md rounded-xl border-4 border-emerald-900 bg-amber-100 p-6 text-center shadow-board">
      <h1 className="text-2xl font-bold text-emerald-950">Admin Dashboard Lock</h1>
      <p className="mt-2 text-sm text-slate-700">Enter PIN to edit data.</p>
      <input
        type="password"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="mt-4 w-full rounded border border-emerald-300 px-3 py-2"
      />
      <button
        onClick={() => {
          if (!unlock(input)) {
            setError('Invalid PIN');
          }
        }}
        className="mt-3 rounded bg-emerald-700 px-4 py-2 font-semibold text-white"
      >
        Unlock
      </button>
      {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
    </div>
  );
};

function App() {
  const [view, setView] = useState<'admin' | 'public'>('public');
  const { teams, stations, results, adminUnlocked, setTeamName, setTeamAssignment, setResult, lockAdmin, resetDemo } = useScoreboardStore();

  const computed = useMemo(() => computeAll(stations, teams, results), [stations, teams, results]);

  const completedStations = computed.stations.filter((s) => s.isComplete).length;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-900 via-emerald-800 to-emerald-950 p-4 text-slate-900">
      <div className="mx-auto max-w-7xl space-y-4">
        <header className="rounded-xl border-4 border-yellow-300 bg-emerald-100 p-4 shadow-board">
          <h1 className="text-3xl font-extrabold text-emerald-950">Live Event Scoreboard</h1>
          <p className="text-sm text-emerald-900">Board-game inspired dashboard · 8 teams · 8 stations · live rankings</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button onClick={() => setView('public')} className="rounded bg-emerald-700 px-3 py-1 text-white">Public view</button>
            <button onClick={() => setView('admin')} className="rounded bg-amber-700 px-3 py-1 text-white">Admin view</button>
            <button onClick={resetDemo} className="rounded bg-slate-700 px-3 py-1 text-white">Reset demo</button>
            {adminUnlocked ? <button onClick={lockAdmin} className="rounded bg-red-700 px-3 py-1 text-white">Lock admin</button> : null}
          </div>
          <p className="mt-2 text-sm font-semibold text-emerald-900">Progress: {completedStations}/8 stations complete</p>
        </header>

        {view === 'admin' && !adminUnlocked ? <AdminGate /> : null}

        {view === 'admin' && adminUnlocked ? (
          <>
            <SetupPanel teams={teams} stations={stations} onTeamName={setTeamName} onAssign={setTeamAssignment} />
            <div className="grid gap-3 md:grid-cols-2">
              {stations.map((station) => {
                const c = computed.stations.find((x) => x.stationId === station.id)!;
                return <StationCard key={station.id} station={station} computed={c} teams={teams} editable onChange={setResult} />;
              })}
            </div>
          </>
        ) : null}

        {view === 'public' ? (
          <>
            <LeaderboardTable teams={teams} stations={stations} totals={computed.totals} />
            <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {stations.map((station) => {
                const c = computed.stations.find((x) => x.stationId === station.id)!;
                return (
                  <div key={station.id} className="rounded-lg border-2 border-emerald-900 bg-emerald-50 p-3">
                    <h3 className="font-bold">S{station.number}: {station.name}</h3>
                    <p className="text-xs text-slate-700">{c.enteredCount}/8 entered · {c.isComplete ? 'Complete' : 'Live'}</p>
                    <p className="mt-1 text-xs text-slate-600">Missing: {c.missingTeamIds.map((id) => teams.find((t) => t.id === id)?.name).join(', ') || 'none'}</p>
                  </div>
                );
              })}
            </section>
          </>
        ) : null}
      </div>
    </main>
  );
}

export default App;
