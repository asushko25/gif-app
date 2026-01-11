import { GIFData } from '../../api/giphy';
import './GIFCard.scss';

interface GIFCardProps {
  gif: GIFData;
  onClick: (gif: GIFData) => void;
}

export const GIFCard = ({ gif, onClick }: GIFCardProps) => {
  return (
    <div className="gif-card" onClick={() => onClick(gif)}>
      <div className="gif-card__image-wrapper">
        <img
          src={gif.images.fixed_height.url}
          alt={gif.title}
          className="gif-card__image"
          loading="lazy"
        />
      </div>
      <div className="gif-card__title">{gif.title || 'No Title'}</div>
    </div>
  );
};

