import type { ShowActor } from '@/types/TvMaze';
import ShowActorItem from '@/components/show/ShowActor';
import './ShowCastTab.scss';

interface Props {
	cast: ShowActor[];
}

export default function ShowCastTab({ cast }: Props) {
	return (
		<section className="show-cast-tab">
			{cast.length > 0 ? (
				<div className="show-cast-tab__actors-list">
					{cast.map((actor) => (
						<ShowActorItem key={actor.person.id} actor={actor} />
					))}
				</div>
			) : (
				<h3 className="show-cast-tab__no-data">No data</h3>
			)}
		</section>
	);
}
