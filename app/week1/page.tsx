import { Metadata } from 'next';

// Short link for this quarter's Week 1 handout (Google Doc).
const WEEK1_URL = 'https://docs.google.com/document/d/1rig4CRIK2EWrydUZBrr2R-TREgE-1BFO/edit?usp=sharing&ouid=113205237117319516235&rtpof=true&sd=true';

export const metadata: Metadata = {
  title: 'Redirecting to Week 1...',
  other: {
    'refresh': `0;url=${WEEK1_URL}`,
  },
};

export default function Week1Redirect() {
  return (
    <meta httpEquiv="refresh" content={`0;url=${WEEK1_URL}`} />
  );
}
