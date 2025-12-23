'use client'

import { useState } from 'react'

type Stage = 'initial' | 'mathQuestion' | 'showTrampoline' | 'final'

export default function Home() {
  const [stage, setStage] = useState<Stage>('initial')
  const [code, setCode] = useState('')
  const [mathAnswer, setMathAnswer] = useState('')
  const [name1, setName1] = useState('')
  const [name2, setName2] = useState('')
  const [name3, setName3] = useState('')
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState<'success' | 'error'>('success')

  const showMessage = (text: string, type: 'success' | 'error') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => setMessage(''), 3000)
  }

  const checkInitialCode = () => {
    if (code === '427') {
      setStage('mathQuestion')
      setCode('')
    } else {
      showMessage('Incorrect code. Try again!', 'error')
    }
  }

  const checkMathAnswer = () => {
    if (mathAnswer === '97531') {
      showMessage('Correct: 97531', 'success')
      setTimeout(() => {
        setStage('showTrampoline')
        setMathAnswer('')
      }, 1500)
    } else {
      showMessage('Try again', 'error')
    }
  }

  const checkNames = () => {
    const validNames = ['gabi', 'gabriele', 'hilli', 'melanie', 'lisa']
    const n1 = name1.toLowerCase().trim()
    const n2 = name2.toLowerCase().trim()
    const n3 = name3.toLowerCase().trim()

    if (
      validNames.includes(n1) &&
      validNames.includes(n2) &&
      validNames.includes(n3) &&
      n1 !== n2 &&
      n2 !== n3 &&
      n1 !== n3
    ) {
      setStage('final')
      setName1('')
      setName2('')
      setName3('')
    } else {
      showMessage('Not quite right. Check the names!', 'error')
    }
  }

  return (
    <div className="container">
      {stage === 'initial' && (
        <div className="card">
          <h1>Christmas Code</h1>
          <div className="story-text">
            <p>
              Four days before Christmas, two presents were waiting in secret.
              Seven little elves worked quietly every night.
              They did not want anyone to guess too early.
              But they left one hint: numbers are important.
            </p>
          </div>
          <div className="input-group">
            <label htmlFor="code">What is the secret code?</label>
            <input
              id="code"
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkInitialCode()}
              placeholder="Enter the code"
            />
          </div>
          <button onClick={checkInitialCode}>Unlock</button>
          {message && <div className={`message ${messageType}`}>{message}</div>}
        </div>
      )}

      {stage === 'mathQuestion' && (
        <div className="card">
          <h2>Unlocked!</h2>
          <p>New Question:</p>
          <div className="input-group">
            <label htmlFor="math">
              Welche Zahl ist die größte fünfstellige Zahl, bei der jede Ziffer ungerade ist und nur einmal vorkommt?
            </label>
            <input
              id="math"
              type="text"
              value={mathAnswer}
              onChange={(e) => setMathAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkMathAnswer()}
              placeholder="Enter the number"
            />
          </div>
          <button onClick={checkMathAnswer}>Check</button>
          {message && <div className={`message ${messageType}`}>{message}</div>}
        </div>
      )}

      {stage === 'showTrampoline' && (
        <div className="card">
          <h2>Dein Geschenk: Das große Trampolin mit 427 cm Sprungfläche 40 % größer als zuvor</h2>
          <img
            src="https://www.trampoline-shop.de/media/mf_webp/jpg/media/catalog/product/cache/d8dfcd6da06febaf592246cb2288d724/m/a/magic_jump_fiber_grey_trampoline_427_cm_met_veiligheitsnet.webp"
            alt="Trampoline 427 cm"
            className="trampoline-image"
          />
          <p style={{ marginTop: '1.5rem' }}>
            Doch wo ist es? Ich sag es dir, wenn du errätst von wem es kommt (nur die Vornamen der Damen):
          </p>
          <div className="names-grid">
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              placeholder="Name 1"
            />
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              placeholder="Name 2"
            />
            <input
              type="text"
              value={name3}
              onChange={(e) => setName3(e.target.value)}
              placeholder="Name 3"
            />
          </div>
          <button onClick={checkNames}>Check Names</button>
          {message && <div className={`message ${messageType}`}>{message}</div>}
        </div>
      )}

      {stage === 'final' && (
        <div className="card">
          <h2>Frohe Weihnachten!</h2>
          <div className="final-message">
            <p style={{ fontSize: '1.1rem', marginBottom: '1.5rem' }}>
              Oma Gabi & Opa Manfred<br />
              Tante Lisa & Onkel Paul<br />
              Hilli & Miguel
            </p>
            <p style={{ fontSize: '1.2rem', marginTop: '2rem' }}>
              <strong>Where is it?</strong>
            </p>
            <p style={{ fontSize: '1.3rem', marginTop: '1rem' }}>
              It's in the <strong>stone shed</strong>!
            </p>
            <p style={{ marginTop: '2rem' }}>
              Viel Spaß beim Springen!<br />
              ❤️
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
