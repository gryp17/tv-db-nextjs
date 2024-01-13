export type ShowId = string | number;

export type TvMazeImage = {
	medium: string;
	original: string;
};

export type ShowNetwork = {
	name: string;
	officialSite?: string;
};

export enum ShowImageType {
	POSTER = 'poster',
	MISC = 'misc',
	BACKGROUND = 'background',
	BANNER = 'banner',
	TYPOGRAPHY = 'typography'
}

export type ShowImage = {
	id: number;
	type: ShowImageType;
	main: boolean;
	resolutions: {
		medium?: {
			url: string;
			width: number;
			height: number;
		};
		original: {
			url: string;
			width: number;
			height: number;
		};
	};
};

export type ShowEpisode = {
	id: number;
	name: string;
	summary: string;
	season: number;
	number: number;
	airdate: string;
	runtime: number;
	image?: TvMazeImage;
	rating: {
		average: number | null;
	};
};

export type ShowActor = {
	person: {
		id: number;
		name: string;
		image?: TvMazeImage;
	};
	character: {
		id: number;
		name: string;
		image?: TvMazeImage;
	};
};

export interface Show {
	id: ShowId;
	url: string;
	name: string;
	language: string;
	summary: string;
	image?: TvMazeImage;
	genres: string[];
	status: string;
	premiered: string;
	ended: string | null;
	officialSite?: string;
	network?: ShowNetwork;
	rating: {
		average: number | null;
	};
	_embedded?: {
		episodes?: ShowEpisode[];
		cast?: ShowActor[];
		images?: ShowImage[];
	};
}

export interface ShowSearchResult {
	score: number;
	show: Show;
}
