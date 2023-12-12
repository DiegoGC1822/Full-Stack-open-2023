import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({buttons}) => (
  <>
    <button onClick={buttons.handleClick}>
      {buttons.name}
    </button>
  </>
)

const Comments = ({buttons}) => (
  <>
    <Button buttons = {buttons[0]}></Button>
    <Button buttons = {buttons[1]}></Button>
    <Button buttons = {buttons[2]}></Button>
  </>
)

const StatisticLine = ({text,value}) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({good,neutral,bad}) => {

  if (good + neutral + bad === 0) {
    return(
      <p>No feedback given</p>
    )
  }

  return(
    <>
      <table>
        <tbody>
          <StatisticLine text ="good" value={good}></StatisticLine>
          <StatisticLine text ="neutral" value={neutral}></StatisticLine>
          <StatisticLine text ="bad" value={bad}></StatisticLine>
          <StatisticLine text ="all" value={good + neutral + bad}></StatisticLine> 
          <StatisticLine text ="average" value={(good*1 + neutral*0 + bad*-1)/(good + neutral + bad)}></StatisticLine> 
          <StatisticLine text ="positive" value={`${(good * 100) / (good + neutral + bad)}%` }></StatisticLine> 
        </tbody>
      </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const buttons = [
    {
      name: "good",
      handleClick: () => {
        setGood(good+1)
      }
    },
    {
      name: "neutral",
      handleClick: () => {
        setNeutral(neutral+1)
      }
    },
    {
      name: "bad",
      handleClick: () => {
        setBad(bad+1)
      }
    }
  ]

  return (
    <div>
      <h1>give feeback</h1>
      <Comments buttons={buttons}></Comments>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)