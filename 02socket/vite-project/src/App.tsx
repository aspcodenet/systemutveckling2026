import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { io, Socket } from 'socket.io-client'

const socket: Socket = io('ws://localhost:3000')

function App() {
  const [bid, setBid] = useState(0)
  const [txt, setTxt] = useState("")
  const [bidResponse, setBidResponse] = useState("")
  socket.on('newBidWasPlaced', (msg) => {
    console.log('Received update from server:', msg);
    setBid(msg.newBid);
  });
  socket.on('bidResponse', (response) => {
    setBidResponse(response.message);
    setBid(response.newBid);
    console.log('Received bid response:', response);
  });
  socket.on('connect', () => {
    console.log('Connected to server with socket ID:', socket.id);
    // Optionally, join a specific room after connecting
    socket.emit('join', 'mq3z5s5ovyna3d82v5biuw');
  });

  return (
    <>
    <div>HÖGSTA:{bid}</div>
    <input type="text" value={txt} onChange={(e) => setTxt(e.target.value)} />
    <button onClick={() => socket.emit('userPlacedABid', { bid: `${txt}` })}>Place Bid</button> 
    <div>{bidResponse}</div>
    </>
  )
}

export default App
