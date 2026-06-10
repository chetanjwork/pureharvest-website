'use client';

import dynamic from 'next/dynamic';
import { ConfiguratorSkeleton, PortfolioSkeleton, FormSkeleton } from '@/components/ui/Skeletons';

export const InteractiveConfiguratorDynamic = dynamic(
  () => import('@/components/features/InteractiveConfigurator'),
  { ssr: false, loading: () => <ConfiguratorSkeleton /> }
);

export const PortfolioDynamic = dynamic(
  () => import('@/components/sections/Portfolio'),
  { ssr: false, loading: () => <PortfolioSkeleton /> }
);

export const EnterpriseOnboardingDynamic = dynamic(
  () => import('@/components/features/EnterpriseOnboarding'),
  { ssr: false, loading: () => <FormSkeleton /> }
);
