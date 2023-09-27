import { Inter } from 'next/font/google'
import { GamePage } from "@/game";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
      <div>
        <GamePage />
      </div>
  )
}
