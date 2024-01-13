import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image';
import { debounce } from 'lodash';
import toast from 'react-simple-toasts';
import ContentWrapper from '@/components/ContentWrapper';
import TypeaheadSearch from '@/components/TypeaheadSearch';
import './AppHeader.scss';
import logo from '@/assets/img/logo.png';

import { getShows } from '@/services/TvMazeApiService';

export default function AppHeader() {
	const router = useRouter();
	const [suggestions, setSuggestions] = useState<string[]>([]);

	// need to wait for the router to be ready before accessing the query params...
	const query = useMemo(() => {
		if (!router.isReady) {
			return '';
		}

		return (router.query.query as string) || '';
	}, [router.isReady, router.query.query]);

	async function getAutocompleteSuggestions(text: string) {
		try {
			if (text.length < 3) {
				return [];
			}

			const results = await getShows(text);
			setSuggestions(results.map((searchResult) => searchResult.show.name));
		} catch (e) {
			toast('Autocomplete failed');
		}
	}

	// debounced getAutocompleteSuggestions
	const debouncedGetSuggetions = debounce(getAutocompleteSuggestions, 500);

	function onChange(text: string) {
		debouncedGetSuggetions(text);
	}

	function onSubmit(text: string) {
		const searchQuery = encodeURIComponent(text);
		router.push(`/search/${searchQuery}`);
	}

	return (
		<header className="app-header">
			<ContentWrapper className="app-header__wrapper">
				<Link href="/">
					<Image className="app-header__logo" title="TVdb" alt="logo" src={logo} />
				</Link>

				<TypeaheadSearch
					initialValue={query}
					className="app-header__search"
					items={suggestions}
					onChange={onChange}
					onSubmit={onSubmit}
				/>
			</ContentWrapper>
		</header>
	);
}
