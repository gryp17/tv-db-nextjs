import React, { useState, useRef, useMemo, useEffect, ChangeEvent, KeyboardEvent } from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons/faMagnifyingGlass';
import './TypeaheadSearch.scss';

interface Props {
	className?: string;
	initialValue?: string;
	placeholder?: string;
	items: string[];
	onChange: (text: string) => void;
	onSubmit: (text: string) => void;
}

export default function TypeaheadSearch({
	className,
	initialValue = '',
	placeholder = 'Search...',
	items = [],
	onChange,
	onSubmit
}: Props) {
	const [searchText, setSearchText] = useState(initialValue);
	const [suggestionsAreVisible, setSuggestionsAreVisible] = useState(false);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const elementRef = useRef<HTMLDivElement | null>(null);

	const hasSuggestions = useMemo(() => {
		return items.length > 0;
	}, [items]);

	const selectedItem = useMemo(() => {
		return items[selectedIndex];
	}, [items, selectedIndex]);

	useEffect(() => {
		setSearchText(initialValue);
	}, [initialValue]);

	useEffect(() => {
		// on mount
		document.addEventListener('click', onDocumentClick);

		// on unmounted
		return () => {
			document.removeEventListener('click', onDocumentClick);
		};
	}, []);

	function onInput(e: ChangeEvent<HTMLInputElement>) {
		setSearchText(e.target.value);
		onChange(e.target.value);

		if (!suggestionsAreVisible) {
			showSuggestions();
		}
	}

	function onKeyUp(e: KeyboardEvent) {
		switch (e.key) {
			case 'Enter':
				onEnter();
				break;
			case 'Escape':
				hideSuggestions();
				break;
			case 'ArrowUp':
				onArrowUp();
				break;
			case 'ArrowDown':
				onArrowDown();
				break;
		}
	}

	function onDocumentClick(e: Event) {
		const target = e.target as HTMLElement;
		if (target !== elementRef.current && !elementRef.current?.contains(target)) {
			hideSuggestions();
		}
	}

	function onEnter() {
		if (hasSuggestions && selectedIndex !== -1) {
			setSearchText(selectedItem);
			onSubmit(selectedItem);
		} else {
			onSubmit(searchText);
		}

		hideSuggestions();
	}

	function onArrowDown() {
		if (!hasSuggestions) {
			return;
		}

		if (selectedIndex < items.length - 1) {
			setSelectedIndex((value) => {
				return value + 1;
			});
		} else {
			setSelectedIndex(0);
		}
	}

	function onArrowUp() {
		if (!hasSuggestions) {
			return;
		}

		if (selectedIndex > 0) {
			setSelectedIndex((value) => {
				return value - 1;
			});
		} else {
			setSelectedIndex(items.length - 1);
		}
	}

	function onItemSelected(text: string) {
		setSearchText(text);
		hideSuggestions();
		onSubmit(text);
	}

	function showSuggestions() {
		setSelectedIndex(-1);
		setSuggestionsAreVisible(true);
	}

	function hideSuggestions() {
		setSelectedIndex(-1);
		setSuggestionsAreVisible(false);
	}

	return (
		<div ref={elementRef} className={classNames('typeahead-search', className)}>
			<FontAwesomeIcon className="typeahead-search__icon" icon={faMagnifyingGlass} />

			<input
				className="typeahead-search__input"
				type="text"
				autoComplete="off"
				placeholder={placeholder}
				value={searchText}
				onChange={onInput}
				onKeyUp={onKeyUp}
			/>

			{suggestionsAreVisible && (
				<ul className="typeahead-search__suggestions">
					{items.map((item, index) => (
						<li
							key={index}
							className={classNames('typeahead-search__item', {
								'typeahead-search__item--selected': selectedIndex === index
							})}
							onClick={() => onItemSelected(item)}
						>
							{item}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}
