import { ReactNode } from 'react';
import classNames from 'classnames';
import './ContentWrapper.scss';

interface Props {
	children: ReactNode;
	className?: string;
}

export default function ContentWrapper(props: Props) {
	return <div className={classNames('content-wrapper', props.className)}>{props.children}</div>;
}
