import { useMemo } from 'react';
import Image from 'next/image';
import './ShowPoster.scss';
import placeholderImage from '@/assets/img/image-placeholder.png';

interface Props {
	image?: string;
	title: string;
	overlay?: boolean;
}

export default function ShowPoster({ image, title, overlay }: Props) {
	const hasPoster = useMemo(() => {
		return !!image;
	}, [image]);

	const showOverlay = useMemo(() => {
		return overlay && !hasPoster;
	}, [overlay, hasPoster]);

	const poster = useMemo(() => {
		return image ?? placeholderImage;
	}, [image]);

	return (
		<div className="show-poster">
			<Image
				className="show-poster__image"
				alt="poster"
				width="0"
				height="0"
				sizes="100vw"
				src={poster}
				title={title}
			/>
			{showOverlay && <div className="show-poster__overlay">{title}</div>}
		</div>
	);
}
