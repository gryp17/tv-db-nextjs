import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons/faStar';
import { faStarHalfStroke } from '@fortawesome/free-solid-svg-icons/faStarHalfStroke';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons/faStar';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import './StarsRating.scss';

interface Props {
	rating: number;
}

export default function StarsRating({ rating }: Props) {
	const maxRating = 10;

	const title = useMemo(() => {
		return `${rating} / 10`;
	}, [rating]);

	function getIconType(index: number): IconProp {
		const leftOver = index - rating;

		if (leftOver > 0 && leftOver < 1) {
			return faStarHalfStroke;
		} else if (index <= rating) {
			return faStar;
		} else {
			return faStarRegular;
		}
	}

	return (
		<span className="stars-rating" title={title}>
			{[...Array(maxRating)].map((_, index) => (
				<FontAwesomeIcon key={index} icon={getIconType(index + 1)} />
			))}
		</span>
	);
}
