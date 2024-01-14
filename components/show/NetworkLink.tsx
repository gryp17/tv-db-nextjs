import { useMemo } from 'react';
import type { ShowNetwork } from '@/types/TvMaze';

interface Props {
	network?: ShowNetwork;
}

export default function NetworkLink({ network }: Props) {
	const networkName = useMemo(() => {
		return network?.name;
	}, [network]);

	const networkLink = useMemo(() => {
		return network?.officialSite;
	}, [network]);

	if (networkLink) {
		return (
			<a href={networkLink} title={networkName} target="_blank">
				{networkName}
			</a>
		);
	}

	return networkName;
}
