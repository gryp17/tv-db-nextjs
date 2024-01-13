import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons/faTriangleExclamation';
import './404.scss';

export default function NotFoundPage() {
	return (
		<main className="not-found-view">
			<FontAwesomeIcon className="not-found-view__icon" icon={faTriangleExclamation} />
			<h2 className="not-found-view__title">Page not found</h2>
		</main>
	);
}
