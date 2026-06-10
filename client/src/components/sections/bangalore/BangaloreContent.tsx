'use client';

import CityHubTemplate from '@/components/templates/CityHubTemplate';
import { bangaloreData } from '@/data/cities/bangalore';

export default function BangaloreContent() {
  return <CityHubTemplate data={bangaloreData} />;
}
