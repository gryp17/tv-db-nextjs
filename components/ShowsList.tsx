import type { Show } from '@/types/TvMaze';
import './ShowsList.scss';
import ShowCard from '@/components/ShowCard';

interface Props {
	shows: Show[];
}

export default function ShowsList({ shows }: Props) {
	return (
		<section className="shows-list">
			{shows.map((show) => (
				<ShowCard key={show.id} show={show} />
			))}
		</section>
	);
}
