import css from './ImageGalleryItem.module.css';
import { nanoid } from 'nanoid';

const ImageGalleryItem = ({ items, onClick }) => {
  return items.map(({ id, webformatURL, tags }) => (
    <li className={css.item} onClick={onClick} key={nanoid()}>
      <img className={css.image} src={webformatURL} alt={tags} id={id} />
    </li>
  ));
};

export default ImageGalleryItem;
