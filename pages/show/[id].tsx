import React from 'react';
import ShowNotFound from '@/components/ShowNotFound';

import Head from 'next/head';
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
import type { Show } from '@/types/TvMaze';
import { getShowById } from '@/services/TvMazeApiService';

export const getServerSideProps = (async (context) => {
	let show: Show | null = null;

	try {
		show = await getShowById(context.query.id as string);
	} catch (e) {
		console.error(e);
	}

	return {
		props: {
			show
		}
	};
}) satisfies GetServerSideProps<{ show: Show | null }>;

export default function ShowPage({ show }: InferGetServerSidePropsType<typeof getServerSideProps>) {
	const showTitle = show?.name || 'Show not found';
	const title = `TVdb - ${showTitle}`;

	return (
		<>
			<Head>
				<title>{title}</title>
			</Head>
			<main className="show-view">{!show ? <ShowNotFound /> : 'SHOW INFO COMPONENT'}</main>
		</>
	);
}
