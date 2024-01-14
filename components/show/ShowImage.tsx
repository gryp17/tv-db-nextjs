import { useMemo, MouseEventHandler } from 'react';
import Image from 'next/image';
import type { ShowImage } from '@/types/TvMaze';
import './ShowImage.scss';

interface Props {
	image: ShowImage;
	onClick?: MouseEventHandler;
}

export default function ShowImageItem({ image, onClick }: Props) {
	const imageUrl = useMemo(() => {
		return image.resolutions.original.url;
	}, [image]);

	return (
		<div className="show-image" onClick={onClick}>
			<Image
				key={image.id}
				src={imageUrl}
				width="0"
				height="0"
				sizes="100vw"
				alt="Show image"
				title="Open image"
			/>
		</div>
	);
}
