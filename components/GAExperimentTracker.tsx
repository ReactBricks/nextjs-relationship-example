'use client'

import { useEffect } from 'react'

interface Props {
  testName: string
  variantName: string
}

// GA4 configuration
// After deployment, to view A/B test data in GA4:
//
// 1. In GA4 → Admin → Custom definitions → Create custom dimension
//   - Name: Experiment Variant
//   - Scope: Event
//   - Event parameter: exp_variant_string
// 2. To analyze results: Explore → Create an exploration using the Experiment
//  Variant dimension as the breakdown

export default function GAExperimentTracker({ testName, variantName }: Props) {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      typeof (window as any).gtag === 'function'
    ) {
      ;(window as any).gtag('event', 'experiment_impression', {
        exp_variant_string: `RB-${testName}-${variantName}`,
      })
    }
  }, [variantName, testName])

  return null
}
