import type { Show, ShowSearchResult, ShowId } from '@/types/TvMaze';

function apiUrl(url: string) {
	const baseUrl = 'https://api.tvmaze.com';
	return `${baseUrl}${url}`;
}

export async function getShows(query: string): Promise<ShowSearchResult[]> {
	const params = new URLSearchParams({
		q: query
	});

	const res = await fetch(apiUrl('/search/shows?') + params);

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}

	return res.json();
}

export async function getFeaturedShows(): Promise<Show[]> {
	const res = await fetch(apiUrl('/shows'));

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}

	return res.json();
}

export async function getShowById(id: ShowId) {
	const params = new URLSearchParams([
		['embed[]', 'episodes'],
		['embed[]', 'cast'],
		['embed[]', 'images']
	]);

	const res = await fetch(apiUrl(`/shows/${id}?`) + params);

	if (!res.ok) {
		throw new Error(`${res.status} ${res.statusText}`);
	}

	return res.json();
}
