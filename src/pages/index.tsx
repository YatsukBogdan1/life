import { Inter } from 'next/font/google'
import { GamePage } from "@/pages/game-page";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <div>
        <GamePage />
      </div>
  )
}
