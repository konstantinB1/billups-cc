import { Match } from '../../../common';
import { getImageById } from '../utils';

export type ResultListProps = {
    matches: Match[];
};

export default function ResultList({ matches }: ResultListProps) {
    getImageById(1);
    return <div>123</div>;
}
