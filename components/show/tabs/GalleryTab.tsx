import { useState, useMemo } from 'react';
import type { ShowImage } from '@/types/TvMaze';
import { ShowImageType } from '@/types/TvMaze';
import ShowImageItem from '@/components/show/ShowImage';
import HorizontalSeparator from '@/components/HorizontalSeparator';
import GalleryModal from '@/components/show/GalleryModal';
import './GalleryTab.scss';

interface Props {
	images: ShowImage[];
}

export default function GalleryTab({ images }: Props) {
	const [modalIsOpened, setModalIsOpened] = useState(false);
	const [selectedImage, setSelectedImage] = useState<ShowImage | undefined>();

	const orderedImages = useMemo(() => {
		const typesOrder = [
			ShowImageType.POSTER,
			ShowImageType.MISC,
			ShowImageType.BACKGROUND,
			ShowImageType.BANNER,
			ShowImageType.TYPOGRAPHY
		];
		return [...images].sort((a, b) => {
			return typesOrder.indexOf(a.type) - typesOrder.indexOf(b.type);
		});
	}, [images]);

	const imagesByType = useMemo(() => {
		const imagesMap: Record<string, ShowImage[]> = {};

		orderedImages.forEach((image) => {
			if (!imagesMap[image.type]) {
				imagesMap[image.type] = [];
			}
			imagesMap[image.type].push(image);
		});

		return imagesMap;
	}, [orderedImages]);

	const selectedGalleryImages = useMemo(() => {
		return selectedImage ? imagesByType[selectedImage.type] : [];
	}, [selectedImage, imagesByType]);

	function openGalleryModal(image: ShowImage) {
		setSelectedImage(image);
		setModalIsOpened(true);
	}

	function closeGalleryModal() {
		setModalIsOpened(false);
	}

	return (
		<section className="gallery-tab">
			{images.length > 0 ? (
				Object.entries(imagesByType).map(([type, images]) => (
					<div className="gallery-tab__section" key={type}>
						<h2 className="gallery-tab__image-type">{type}</h2>

						<HorizontalSeparator />

						<div className="gallery-tab__images-list">
							{images.map((image) => (
								<ShowImageItem
									key={image.id}
									image={image}
									onClick={() => openGalleryModal(image)}
								/>
							))}
						</div>
					</div>
				))
			) : (
				<h3 className="gallery-tab__no-data">No data</h3>
			)}

			{modalIsOpened && (
				<GalleryModal
					onClose={closeGalleryModal}
					selectedImage={selectedImage}
					images={selectedGalleryImages}
				/>
			)}
		</section>
	);
}
