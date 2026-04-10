import { Metadata } from 'next';

const DISCORD_URL = 'https://discord.gg/uENtNdDPPb';

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
