import { getChoices, getMatchesHistory, play } from './services';
import './style.css';
import useService from './useService';

export default function App() {
    const { data: choices } = useService(getChoices);
    const { data: history } = useService(getMatchesHistory);

    console.log(history);

    return (
        <div
            style={{
                width: 600,
                margin: 'auto',
            }}
        >
            <div></div>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {choices?.map(({ name, id }) => (
                    <button
                        onClick={() => play(id)}
                        key={id}
                        className='btn text-300'
                    >
                        {name}
                    </button>
                ))}
            </div>
        </div>
    );
}
