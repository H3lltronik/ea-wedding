import { HogwartsHouse, StarWarsSide } from './enums';

// Importaciones de imágenes para las casas de Harry Potter
import gryffindorImage from '@/assets/houses/gryffindor.jpg';
import slytherinImage from '@/assets/houses/slytherin.jpg';
import hufflepuffImage from '@/assets/houses/hufflepuff.jpg';
import ravenclawImage from '@/assets/houses/ravenclaw.jpg';

// Importaciones de imágenes para los lados de Star Wars
import jediImage from '@/assets/kind/jedi.jpg';
import sithImage from '@/assets/kind/sith.jpg';

export const hogwartsHouseOptions = [
  {
    value: HogwartsHouse.GRYFFINDOR,
    label: 'Gryffindor',
    imageSrc: gryffindorImage.src,
  },
  {
    value: HogwartsHouse.SLYTHERIN,
    label: 'Slytherin',
    imageSrc: slytherinImage.src,
  },
  {
    value: HogwartsHouse.HUFFLEPUFF,
    label: 'Hufflepuff',
    imageSrc: hufflepuffImage.src,
  },
  {
    value: HogwartsHouse.RAVENCLAW,
    label: 'Ravenclaw',
    imageSrc: ravenclawImage.src,
  },
];

export const starWarsSideOptions = [
  {
    value: StarWarsSide.JEDI,
    label: 'Jedi',
    imageSrc: jediImage.src,
  },
  {
    value: StarWarsSide.SITH,
    label: 'Sith',
    imageSrc: sithImage.src,
  },
]; 