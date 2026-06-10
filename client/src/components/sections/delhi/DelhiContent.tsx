'use client';

import CityHubTemplate from '@/components/templates/CityHubTemplate';
import { delhiData } from '@/data/cities/delhi';

export default function DelhiContent() {
  return <CityHubTemplate data={delhiData} />;
}
