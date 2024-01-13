import React from 'react';
import { useRouter } from 'next/router';

export default function SearchPage() {
	const router = useRouter();
	const query = router.query.query;

	// TODO: might need to wait for the router to be ready?

	return <div>Search page {query}</div>;
}
