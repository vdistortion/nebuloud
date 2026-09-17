import type { TypeArtistSummary } from './types';

import { EnumArtist as SchwarzerEngelEnum } from './artists/schwarzer_engel/types';
import { artist as schwarzerEngelArtist } from './artists/schwarzer_engel';

import { EnumArtist as TardigradeInfernoEnum } from './artists/tardigrade_inferno/types';
import { artist as tardigradeInfernoArtist } from './artists/tardigrade_inferno';

import { EnumArtist as MasterEnum } from './artists/master/types';
import { artist as masterArtist } from './artists/master';

import { EnumArtist as ShmelyEnum } from './artists/shmely/types';
import { artist as shmelyArtist } from './artists/shmely';

import { EnumArtist as GevalEnum } from './artists/geval/types';
import { artist as gevalArtist } from './artists/geval';

import { EnumArtist as Mc18Enum } from './artists/mc18/types';
import { artist as mc18Artist } from './artists/mc18';

export const artistSummaries: TypeArtistSummary[] = [
  {
    id: TardigradeInfernoEnum.id,
    name: tardigradeInfernoArtist.name,
    image: tardigradeInfernoArtist.image,
    country: tardigradeInfernoArtist.country,
  },
  {
    id: MasterEnum.id,
    name: masterArtist.name,
    image: masterArtist.image,
    country: masterArtist.country,
  },
  {
    id: ShmelyEnum.id,
    name: shmelyArtist.name,
    image: shmelyArtist.image,
    country: shmelyArtist.country,
  },
  {
    id: Mc18Enum.id,
    name: mc18Artist.name,
    image: mc18Artist.image,
    country: mc18Artist.country,
  },
  {
    id: SchwarzerEngelEnum.id,
    name: schwarzerEngelArtist.name,
    image: schwarzerEngelArtist.image,
    country: schwarzerEngelArtist.country,
  },
  {
    id: GevalEnum.id,
    name: gevalArtist.name,
    image: gevalArtist.image,
    country: gevalArtist.country,
  },
];
