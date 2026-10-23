'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { OwnerShell } from '@/components/owner/owner-shell';

export default function OwnerRoutePage() {
  const params = useParams();
  const rawPath = params?.path;
  const section = Array.isArray(rawPath) ? rawPath[0] : (rawPath as string) || 'overview';

  return <OwnerShell initialSection={section} />;
}
