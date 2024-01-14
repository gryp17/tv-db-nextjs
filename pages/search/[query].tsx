import { useRouter } from 'next/router';
import Head from 'next/head';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import './SearchPage.scss';
import ShowsList from '@/components/ShowsList';
import type { Show } from '@/types/TvMaze';
import { getShows } from '@/services/TvMazeApiService';

export const getServerSideProps = (async (context) => {
	let shows: Show[] = [];

	try {
		const results = await getShows(context.query.query as string);
		shows = results.map((result) => result.show);
	} catch (e) {
		console.error(e);
	}

	return {
		props: {
			shows
		}
	};
}) satisfies GetServerSideProps<{ shows: Show[] }>;

export default function SearchPage({
	shows
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const router = useRouter();
	const query = router.query.query;
	const pageTitle = `TVdb - ${query}`;
	const hasSearchResults = shows.length > 0;
	const title = hasSearchResults
		? `Search results for "${query}"`
		: `No results found for "${query}"`;

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
			</Head>
			<main className="search-view">
				<h2 className="search-view__title">{title}</h2>
				<ShowsList shows={shows} />
			</main>
		</>
	);
}
