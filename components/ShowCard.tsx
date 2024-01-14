import Link from 'next/link';
import './ShowCard.scss';
import type { Show } from '@/types/TvMaze';
import ShowPoster from '@/components/ShowPoster';

interface Props {
	show: Show;
}

export default function ShowCard({ show }: Props) {
	const route = `/show/${show.id}`;

	return (
		<Link href={route} className="show-card">
			<ShowPoster overlay image={show.image?.medium} title={show.name} />
		</Link>
	);
}
