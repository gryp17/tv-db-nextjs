import { ReactNode } from 'react';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons/faChevronDown';
import './ReactAccordion.scss';

interface Props {
	header: ReactNode;
	children: ReactNode;
}

// higher order component that is used to customize the default AccordionItem
// https://codesandbox.io/s/react-accordion-css-module-eqvnzg?file=/src/styles.module.css:770-811
function AccordionItem({ header, children, ...rest }: Props) {
	return (
		<Item
			{...rest}
			header={
				<>
					{header}
					<FontAwesomeIcon className="szh-accordion__arrow" icon={faChevronDown} />
				</>
			}
		>
			{children}
		</Item>
	);
}

export { Accordion, AccordionItem };
