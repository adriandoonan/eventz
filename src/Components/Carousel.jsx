import { useEffect, useState } from "react";

const Carousel = ({ images }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const updateIndex = (newIndex) => {
		if (newIndex >= images.length || newIndex < 0) {
			newIndex = 0;
		}
		setActiveIndex(newIndex);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			updateIndex(activeIndex + 1);
		}, 2000);
		return () => {
			if (interval) {
				clearInterval(interval);
			}
		};
	}, [activeIndex]);

	return (
		<div className="carousel">
			<div
				className="inner"
				style={{ transform: `translateX(-${activeIndex * 160}%)` }}
			>
				{images.map((image, index) => {
					return (
						<div key={index} className="carousel-item">
							<img src={image} alt="an event" className="carousel-image" />
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default Carousel;
