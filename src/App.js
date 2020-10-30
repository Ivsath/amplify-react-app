import { API } from 'aws-amplify'
import { useState, useEffect } from 'react'

import './App.css'

function App() {
  const [coins, updateCoins] = useState([])
  const [input, updateInput] = useState({ limit: 5, start: 0 })

  useEffect(() => {
    fetchCoins()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCoins = async () => {
    const { limit, start } = input
    console.log('api call')
    const data = await API.get(
      'cryptoapi',
      `/coins?limit=${limit}&start=${start}`,
    )
    updateCoins(data.coins)
  }

  function updateInputValues(type, value) {
    updateInput({ ...input, [type]: value })
  }

  return (
    <div className="App">
      <input
        placeholder="limit"
        onChange={(e) => updateInputValues('limit', e.target.value)}
      />
      <input
        placeholder="start"
        onChange={(e) => updateInputValues('start', e.target.value)}
      />
      <button onClick={fetchCoins}>Fetch Coins</button>
      {coins.map((coin, index) => (
        <div key={index}>
          <h2>
            {coin.name} - {coin.symbol}
          </h2>
          <h5>${coin.price_usd}</h5>
        </div>
      ))}
    </div>
  )
}

export default App
