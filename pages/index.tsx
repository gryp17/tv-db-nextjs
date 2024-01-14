import Head from 'next/head';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import './HomePage.scss';
import ShowsList from '@/components/ShowsList';
import type { Show } from '@/types/TvMaze';
import { getFeaturedShows } from '@/services/TvMazeApiService';

export const getServerSideProps = (async () => {
	let shows: Show[] = [];

	try {
		shows = await getFeaturedShows();
		shows = shows.splice(0, 12);
	} catch (e) {
		console.error(e);
	}

	return {
		props: {
			shows
		}
	};
}) satisfies GetServerSideProps<{ shows: Show[] }>;

export default function Home({ shows }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	return (
		<>
			<Head>
				<title>TVdb - Home</title>
			</Head>
			<main className="home-view">
				<h2 className="home-view__title">Featured shows</h2>
				{shows.length > 0 ? (
					<ShowsList shows={shows} />
				) : (
					<p className="home-view__no-data">No data</p>
				)}
			</main>
		</>
	);
}
