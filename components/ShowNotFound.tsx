import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceMeh } from '@fortawesome/free-solid-svg-icons/faFaceMeh';
import './ShowNotFound.scss';

export default function ShowNotFound() {
	return (
		<div className="show-not-found">
			<FontAwesomeIcon className="show-not-found__icon" icon={faFaceMeh} />
			<h2 className="show-not-found__title">Show not found</h2>
		</div>
	);
}
