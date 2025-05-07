import placeholderDefault from '@/assets/img/imagesPlaceholder/placeholderDefault.webp';
import placeholderPictogram from '@/assets/img/imagesPlaceholder/placeholderPictogram.webp';
import placeholderUser from '@/assets/img/imagesPlaceholder/placeholderUser.webp';

export const IMAGE_PLACEHOLDER = {
  USER:
    process.env.NEXT_PUBLIC_DEFAULT_USER_IMAGE || placeholderUser.toString(),
  PICTOGRAM:
    process.env.NEXT_PUBLIC_DEFAULT_PICTOGRAM_IMAGE ||
    placeholderPictogram.toString(),
  DEFAULT:
    process.env.NEXT_PUBLIC_DEFAULT_IMAGE || placeholderDefault.toString(),
};
