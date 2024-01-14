import { useMemo } from 'react';
import { Tab, Tabs, TabList, TabPanel } from '@/components/third-party/ReactTabs';
import './ShowInfo.scss';
import { Show } from '@/types/TvMaze';
import ShowInfoHeader from '@/components/show/ShowInfoHeader';
import ShowEpisodesTab from '@/components/show/tabs/ShowEpisodesTab';
import ShowCastTab from '@/components/show/tabs/ShowCastTab';
import GalleryTab from '@/components/show/tabs/GalleryTab';

interface Props {
	show: Show;
}

export default function ShowInfo({ show }: Props) {
	const showEpisodes = useMemo(() => {
		return show._embedded?.episodes ?? [];
	}, [show]);

	const showCast = useMemo(() => {
		return show._embedded?.cast ?? [];
	}, [show]);

	const showImages = useMemo(() => {
		return show._embedded?.images ?? [];
	}, [show]);

	return (
		<section className="show-info">
			<h2 className="show-info__title">{show.name}</h2>
			<ShowInfoHeader show={show} />

			<Tabs className="show-info__tabs">
				<TabList>
					<Tab>Episodes</Tab>
					<Tab>Cast</Tab>
					<Tab>Gallery</Tab>
				</TabList>

				<TabPanel>
					<ShowEpisodesTab episodes={showEpisodes} />
				</TabPanel>
				<TabPanel>
					<ShowCastTab cast={showCast} />
				</TabPanel>
				<TabPanel>
					<GalleryTab images={showImages} />
				</TabPanel>
			</Tabs>
		</section>
	);
}
