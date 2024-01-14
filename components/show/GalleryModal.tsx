import { useState, useRef, useMemo, useEffect, KeyboardEvent } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons/faCircleXmark';
import { faCircleChevronLeft } from '@fortawesome/free-solid-svg-icons/faCircleChevronLeft';
import { faCircleChevronRight } from '@fortawesome/free-solid-svg-icons/faCircleChevronRight';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import './GalleryModal.scss';
import type { ShowImage } from '@/types/TvMaze';

interface Props {
	onClose: () => void;
	selectedImage?: ShowImage;
	images: ShowImage[];
}

export default function GalleryModal({ onClose, selectedImage, images }: Props) {
	const elementRef = useRef<HTMLDivElement | null>(null);
	const [index, setIndex] = useState(findImageIndex);

	const currentImage = useMemo(() => {
		return images[index];
	}, [index, images]);

	const hasArrows = useMemo(() => {
		return images.length > 1;
	}, [images]);

	useEffect(() => {
		if (elementRef.current) {
			elementRef.current.focus();
		}
	}, []);

	function findImageIndex() {
		if (!selectedImage) {
			return 0;
		}

		return images.findIndex((item) => item.id === selectedImage.id);
	}

	function onKeyUp(e: KeyboardEvent) {
		switch (e.key) {
			case 'ArrowLeft':
				onPrev();
				break;
			case 'ArrowRight':
				onNext();
				break;
		}
	}

	function onNext() {
		if (index < images.length - 1) {
			setIndex((value) => {
				return value + 1;
			});
		} else {
			setIndex(0);
		}
	}

	function onPrev() {
		if (index > 0) {
			setIndex((value) => {
				return value - 1;
			});
		} else {
			setIndex(images.length - 1);
		}
	}

	return (
		<Modal
			classNames={{
				modal: 'gallery-modal'
			}}
			open={true}
			onClose={onClose}
			center
		>
			<div ref={elementRef} onKeyUp={onKeyUp}>
				<button className="gallery-modal__close-btn" onClick={onClose}>
					<FontAwesomeIcon icon={faCircleXmark} />
				</button>
				<Image
					className="gallery-modal__image"
					src={currentImage.resolutions.original.url}
					width="0"
					height="0"
					sizes="100vw"
					alt="main image"
				/>
				{hasArrows && (
					<>
						<button
							className="gallery-modal__arrow gallery-modal__arrow--left"
							onClick={onPrev}
						>
							<FontAwesomeIcon icon={faCircleChevronLeft} />
						</button>
						<button
							className="gallery-modal__arrow gallery-modal__arrow--right"
							onClick={onNext}
						>
							<FontAwesomeIcon icon={faCircleChevronRight} />
						</button>
					</>
				)}
			</div>
		</Modal>
	);
}
