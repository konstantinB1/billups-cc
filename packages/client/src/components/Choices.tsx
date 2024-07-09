import { Choice } from '../../../common';

export type ChoicesProps = {
    choices: Choice[];
    current: Choice | null;
    onStart: (choice: Choice) => void;
    onSelect: (choice: Choice | null) => void;
};

export default function Choices({
    current,
    choices,
    onStart,
    onSelect
}: ChoicesProps) {
    return (
        <div>
            <div className='flex-center'>
                {choices?.map((choice) => (
                    <button
                        onFocus={() => onSelect(choice)}
                        onBlur={() => onSelect(null)}
                        style={{
                            background: choice?.losesTo.includes(current?.name)
                                ? 'var(--danger-color)'
                                : choice?.beats.includes(current?.name)
                                  ? 'var(--success-color)'
                                  : 'transparent',
                            fontWeight:
                                current?.name === choice.name ? 200 : 100
                        }}
                        onMouseOver={() => onSelect(choice)}
                        onMouseOut={() => onSelect(null)}
                        onClick={() => onStart(choice)}
                        key={choice.id}
                        className='btn size-xl text-100'
                    >
                        {choice.name}
                    </button>
                ))}
            </div>
            {current && (
                <div
                    className='flex-center text-center'
                    style={{
                        marginTop: 30
                    }}
                >
                    <p className='text-100 size-xl'>
                        {current.name} beats {current.beats.join(', ')}, and
                        loses to {current.losesTo.join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
}
