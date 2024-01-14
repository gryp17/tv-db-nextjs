import { useMemo } from 'react';
import Image from 'next/image';
import { ShowActor } from '@/types/TvMaze';
import './ShowActor.scss';
import placeholderImage from '@/assets/img/image-placeholder.png';

interface Props {
	actor: ShowActor;
}

export default function ShowActorItem({ actor }: Props) {
	const image = useMemo(() => {
		return actor.character.image?.medium ?? placeholderImage;
	}, [actor]);

	return (
		<div className="show-actor">
			<div className="show-actor__inner-wrapper">
				<Image
					className="show-actor__image"
					width="0"
					height="0"
					sizes="100vw"
					alt="actor"
					src={image}
					title={actor.person.name}
				/>
				<div className="show-actor__info">
					{actor.person.name}
					<div className="show-actor__character-name">as {actor.character.name}</div>
				</div>
			</div>
		</div>
	);
}
