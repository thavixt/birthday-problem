import { LineChart, XAxis, YAxis, Tooltip, Line, ReferenceLine } from 'recharts'
import { useEffect, useState } from 'react';
import { birthdayProblem } from './logic/utils';

const ROUNDIG = 1000000;
const percent = (n = 0) => `${Math.round(n * 100 * ROUNDIG) / ROUNDIG}%`;

type ChartValue = { Probabilty: number; Count: number; name: string };
type ChartData = ChartValue[];

function App() {
  const [data, setData] = useState<ChartData>([]);
  const [numberOfPeople, setNumberOfPeople] = useState<number>(Math.round(Math.random() * 100) + 24);

  useEffect(() => {
    const newData = Array.from({ length: numberOfPeople }, (_, i) => ({ Probabilty: birthdayProblem(i), Count: i, name: "name" }));
    setData(newData)
  }, [numberOfPeople]);

  return (
    <div className="center p-8">

      <header className="center">
        <h1>The birthday problem</h1>
        <a href="https://en.wikipedia.org/wiki/Birthday_problem">Birthday problem - Wikipedia</a>
      </header>

      <main className='center py-4'>
        <div className='flex flex-col items-center justify-center space-y-4'>
          <p>Given a group of people, what is the probability that at least two of them share the same birthday?</p>
          <div className='flex items-center space-x-2'>
            <label htmlFor='numberOfPeople'>Number of people:</label>
            <input
              id='numberOfPeople'
              className='w-20 inline-block p-2 rounded-lg'
              type="number"
              name="numberOfPeople"
              max={200}
              min={1}
              defaultValue={numberOfPeople} onChange={(e) => setNumberOfPeople(+e.target.value + 1)}
            />
          </div>
          <p>In a group of <b>{numberOfPeople}</b> people, the probability of 2 people having the same birthday is <b>{percent(data[data.length - 1]?.Probabilty)}</b></p>
          <LineChart
            width={1000}
            height={400}
            data={data}
          >
            <XAxis dataKey="Count" tickCount={10} />
            <YAxis tickCount={10} domain={[0, 1]} />
            <Tooltip content={props => {
              return (
                <div className='center border rounded-md p-2 bg-white text-slate-600'>
                  <p>Number of people: <b>{props.payload?.[0]?.payload.Count}</b></p>
                  <p>Probablilty: <b>{percent(props.payload?.[0]?.payload.Probabilty)}</b></p>
                </div>
              )
            }} />
            <Line isAnimationActive={false} type="monotone" dataKey="Probabilty" stroke="#8884d8" activeDot={false} dot={false} />
            <ReferenceLine y={0.5} stroke="red" strokeDasharray="3 3" />
            <ReferenceLine x={23} label="~50% with 23 people" stroke="red" strokeDasharray="3 3" />
            <ReferenceLine x={70} label="~99.9% with 112 people" stroke="red" strokeDasharray="3 3" />
            <ReferenceLine x={112} label="~100% with 112 people" stroke="red" strokeDasharray="3 3" />
          </LineChart>
        </div>
      </main>

      <footer>
        <a href="https://github.com/thavixt/birthday-problem" target='__blank'>thavixt @ github</a>
      </footer>
    </div>
  )
}

export default App
