import { useGameStore } from './store/useGameStore'
import LoginPage from './pages/LoginPage'
import CreateRoomPage from './pages/CreateRoomPage'
import LobbyPage from './pages/LobbyPage'
import WheelPage from './pages/WheelPage'
import HistoryPage from './pages/HistoryPage'

function App() {
  const screen = useGameStore((state) => state.screen)

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {screen === 'login' && <LoginPage />}
      {screen === 'create-room' && <CreateRoomPage />}
      {screen === 'lobby' && <LobbyPage />}
      {screen === 'wheel' && <WheelPage />}
      {screen === 'history' && <HistoryPage />}
    </div>
  )
}

export default App