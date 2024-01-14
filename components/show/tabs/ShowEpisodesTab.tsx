import { useMemo } from 'react';
import { Accordion, AccordionItem } from '@/components/third-party/ReactAccordion';
import type { ShowEpisode } from '@/types/TvMaze';
import ShowEpisodeItem from '@/components/show/ShowEpisode';

interface Props {
	episodes: ShowEpisode[];
}

export default function ShowEpisodesTab({ episodes }: Props) {
	const episodesBySeason = useMemo(() => {
		const seasons: Record<number, ShowEpisode[]> = {};

		episodes.forEach((episode) => {
			if (!seasons[episode.season]) {
				seasons[episode.season] = [];
			}

			seasons[episode.season].push(episode);
		});

		return seasons;
	}, [episodes]);

	return (
		<Accordion allowMultiple transition transitionTimeout={250}>
			{Object.entries(episodesBySeason).map(([season, episodes]) => (
				<AccordionItem key={season} header={`Season ${season}`}>
					{episodes.map((episode) => (
						<ShowEpisodeItem key={episode.id} episode={episode} />
					))}
				</AccordionItem>
			))}
		</Accordion>
	);
}
