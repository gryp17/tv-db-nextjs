import './GenreLabel.scss';

interface Props {
	genre: string;
}

export default function GenreLabel({ genre }: Props) {
	return (
		<span className="genre-label" title={genre}>
			{genre}
		</span>
	);
}
