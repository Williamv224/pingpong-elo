import './App.css'

type Player = {
  id: number
  name: string
  elo: number
  wins: number
  losses: number
}

const startingElo = 1200

// Fiktive resultater for å vise hvordan topplisten kan se ut.
const players: Player[] = [
  { id: 1, name: 'Jonas Lund', elo: 1192, wins: 10, losses: 10 },
  { id: 2, name: 'Sofie Berg', elo: 1348, wins: 14, losses: 6 },
  { id: 3, name: 'Marius Dahl', elo: 1048, wins: 6, losses: 14 },
  { id: 4, name: 'Emil Hauge', elo: 1276, wins: 12, losses: 8 },
  { id: 5, name: 'Nora Vik', elo: 1136, wins: 8, losses: 12 },
]

// Sorter en kopi, slik at den opprinnelige spillerlisten beholdes.
const rankedPlayers = [...players].sort((a, b) => b.elo - a.elo)
const matchesPlayed = players.reduce((total, player) => total + player.wins, 0)

function App() {
  return (
    <div className="app">
      <header className="site-header">
        <div className="page-width header-content">
          <div className="brand">
            <span className="brand-icon" aria-hidden="true">🏓</span>
            <span>PingPong <span className="brand-accent">Elo</span></span>
          </div>
          <span className="league-label">
            <span className="status-dot" aria-hidden="true" />
            Venneligaen
          </span>
        </div>
      </header>

      <main className="page-width">
        <section className="intro" aria-labelledby="leaderboard-title">
          <div>
            <p className="eyebrow">Ett bord. Mange rivaler.</p>
            <h1 id="leaderboard-title">Topplisten</h1>
            <p className="intro-description">
              Vennskap utenfor bordet. Konkurranse på det.
            </p>
          </div>
          <span className="demo-label">Fiktive resultater</span>
        </section>

        <section className="leaderboard" aria-labelledby="ranking-title">
          <div className="leaderboard-heading">
            <div>
              <h2 id="ranking-title">Vår venneliga</h2>
              <p>{players.length} spillere <span aria-hidden="true">·</span> {matchesPlayed} kamper spilt</p>
            </div>
            <span className="sort-label">Høyest Elo først <span aria-hidden="true">↓</span></span>
          </div>

          <table>
            <caption className="visually-hidden">
              Toppliste med fiktive spillere, sortert fra høyest til lavest Elo.
            </caption>
            <thead>
              <tr>
                <th scope="col" className="rank-column">Plass</th>
                <th scope="col" className="player-column">Spiller</th>
                <th scope="col" className="number-column elo-column" aria-sort="descending">
                  Elo <span aria-hidden="true">↓</span>
                </th>
                <th scope="col" className="number-column results-column">Seire</th>
                <th scope="col" className="number-column results-column">Tap</th>
              </tr>
            </thead>
            <tbody>
              {rankedPlayers.map((player, index) => (
                <tr key={player.id} className={index === 0 ? 'leading-player' : undefined}>
                  <td className="rank-column">
                    <span className="rank">{index + 1}</span>
                  </td>
                  <th scope="row" className="player-column">
                    <div className="player">
                      <span className="avatar" aria-hidden="true">
                        {player.name.split(' ').map((name) => name[0]).join('')}
                      </span>
                      <span className="player-name">{player.name}</span>
                      {index === 0 && <span className="leader-label">På topp</span>}
                    </div>
                  </th>
                  <td className="number-column elo-rating">{player.elo}</td>
                  <td className="number-column wins">{player.wins}</td>
                  <td className="number-column losses">{player.losses}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="leaderboard-footer">
            <span className="status-dot" aria-hidden="true" />
            Hver kamp teller. Neste kamp kan snu topplisten.
          </div>
        </section>

        <aside className="elo-explanation" aria-labelledby="elo-title">
          <span className="starting-elo">{startingElo}<span>Start-Elo</span></span>
          <div>
            <h2 id="elo-title">Samme utgangspunkt. Din vei til toppen.</h2>
            <p>
              Alle starter med {startingElo} Elo. Seire gir poeng, tap trekker poeng.
              Hvor mye avhenger av motstanderens rating.
            </p>
          </div>
        </aside>
      </main>

      <footer className="page-width site-footer">
        <span>For gjengen. For spillet.</span>
        <span>Demovisning med fiktive spillere og resultater.</span>
      </footer>
    </div>
  )
}

export default App
