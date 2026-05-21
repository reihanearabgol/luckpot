interface PlayerBarProps {
  name: string
  coins: number
}

function PlayerBar({ name, coins }: PlayerBarProps) {
  return (
    <div className="flex justify-between items-center mb-4 px-1">
      <p className="text-gray-400 text-sm">
        👤 {name}
      </p>
      <p className="text-purple-400 text-sm font-semibold">
        ⬡ {coins.toLocaleString()} coins
      </p>
    </div>
  )
}

export default PlayerBar