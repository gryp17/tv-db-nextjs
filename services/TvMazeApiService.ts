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
	return await res.json();
}

/*
export function getRandomShows() {
	return api.get<Show[]>('/shows');
}

export function getShowById(id: ShowId) {
	return api.get<Show>(`/shows/${id}`, {
		params: {
			embed: ['episodes', 'cast', 'images']
		}
	});
}
*/
