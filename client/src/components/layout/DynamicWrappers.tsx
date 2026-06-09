'use client';

import dynamic from 'next/dynamic';
import { ConfiguratorSkeleton, PortfolioSkeleton, FormSkeleton } from '@/components/ui/Skeletons';

export const InteractiveConfiguratorDynamic = dynamic(
  () => import('@/components/layout/InteractiveConfigurator'),
  { ssr: false, loading: () => <ConfiguratorSkeleton /> }
);

export const PortfolioDynamic = dynamic(
  () => import('@/components/layout/Portfolio'),
  { ssr: false, loading: () => <PortfolioSkeleton /> }
);

export const EnterpriseOnboardingDynamic = dynamic(
  () => import('@/components/layout/EnterpriseOnboarding'),
  { ssr: false, loading: () => <FormSkeleton /> }
);
