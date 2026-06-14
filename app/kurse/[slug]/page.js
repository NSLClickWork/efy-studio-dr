import { notFound } from 'next/navigation';
import { classes } from '@/app/data/content';
import ClassDetailClient from './ClassDetailClient';

export async function generateStaticParams() {
  return classes.map((cls) => ({ slug: cls.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const cls = classes.find((c) => c.slug === slug);
  if (!cls) return {};
  return {
    title: cls.de.title,
    description: cls.de.longDesc.slice(0, 160),
  };
}

export default async function ClassDetailPage({ params }) {
  const { slug } = await params;
  const cls = classes.find((c) => c.slug === slug);
  if (!cls) notFound();

  return <ClassDetailClient slug={slug} />;
}
