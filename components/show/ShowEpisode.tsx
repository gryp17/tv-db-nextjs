import { useMemo } from 'react';
import { padStart } from 'lodash';
import Image from 'next/image';
import type { ShowEpisode } from '@/types/TvMaze';
import './ShowEpisode.scss';
import placeholderImage from '@/assets/img/image-placeholder-horizontal.png';

interface Props {
	episode: ShowEpisode;
}

export default function ShowEpisode({ episode }: Props) {
	const episodeNumber = useMemo(() => {
		const paddedNumber = padStart(episode.number + '', 2, '0');
		return `E${paddedNumber}`;
	}, [episode]);

	const rating = useMemo(() => {
		return episode.rating.average || 0;
	}, [episode]);

	const image = useMemo(() => {
		return episode.image?.medium ?? placeholderImage;
	}, [episode]);

	return (
		<div className="show-episode">
			<Image
				className="show-episode__image"
				width="120"
				height="120"
				src={image}
				title={episode.name}
				alt="episode image"
			/>
			<div className="show-episode__info">
				<h4 className="show-episode__title">
					{episodeNumber} - {episode.name}
					<span>
						{rating} <span className="show-episode__max-rating">/ 10</span>
					</span>
				</h4>
				<div className="show-episode__date">Aired on: {episode.airdate}</div>
				<div
					className="show-episode__summary"
					dangerouslySetInnerHTML={{ __html: episode.summary }}
				></div>
			</div>
		</div>
	);
}
