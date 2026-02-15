import { Header } from '../components/Header';
import { Board } from '../components/Board';

export function BoardPage() {
  return (
    <div className="app-layout">
      <Header />
      <main className="app-main">
        <Board />
      </main>
    </div>
  );
}
