import './ShowInfoHeader.scss';
import { Show } from '@/types/TvMaze';
import ShowPoster from '@/components/ShowPoster';
import NetworkLink from '@/components/show/NetworkLink';
import GenreLabel from '@/components/show/GenreLabel';
import StarsRating from '@/components/show/StarsRating';
import HorizontalSeparator from '@/components/HorizontalSeparator';

interface Props {
	show: Show;
}

export default function ShowInfoHeader({ show }: Props) {
	return (
		<section className="show-info-header">
			<div className="show-info-header__poster-wrapper">
				<ShowPoster image={show.image?.original} title={show.name} />
			</div>
			<div className="show-info-header__intro">
				<ul className="show-info-header__info-list">
					{show.network && (
						<li>
							Network: <NetworkLink network={show.network} />
						</li>
					)}
					{show.officialSite && (
						<li>
							Website:{' '}
							<a href={show.officialSite} title="Official website">
								{show.name}
							</a>
						</li>
					)}
					<li>Status: {show.status}</li>
					{show.genres.length > 0 && (
						<li>
							Genres:{' '}
							{show.genres.map((genre) => (
								<GenreLabel key={genre} genre={genre} />
							))}
						</li>
					)}
					<li>Language: {show.language}</li>
					{show.rating.average && (
						<li>
							Rating: <StarsRating rating={show.rating.average} />
						</li>
					)}
				</ul>
				<HorizontalSeparator />
				<div
					className="show-info-header__summary"
					dangerouslySetInnerHTML={{ __html: show.summary }}
				></div>
			</div>
		</section>
	);
}
