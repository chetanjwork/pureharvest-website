'use client';

import CityHubTemplate from '@/components/templates/CityHubTemplate';
import { puneData } from '@/data/cities/pune';

export default function PuneContent() {
  return <CityHubTemplate data={puneData} />;
}
