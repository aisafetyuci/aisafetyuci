import { Metadata } from 'next';
import { links } from '../data/links';

const DISCORD_URL = links.discord;

export const metadata: Metadata = {
  title: 'Redirecting to Discord...',
  other: {
    'refresh': `0;url=${DISCORD_URL}`,
  },
};

export default function DiscordRedirect() {
  return (
    <meta httpEquiv="refresh" content={`0;url=${DISCORD_URL}`} />
  );
}
