import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * The previous site is still in Google's index. These keep its live URLs
   * out of the 404 log and pass their equity to the closest new page.
   */
  async redirects() {
    return [
      { source: "/booking", destination: "/sessions", permanent: true },
      { source: "/book", destination: "/sessions", permanent: true },
      { source: "/experiences", destination: "/the-park", permanent: true },
      { source: "/facilities", destination: "/the-park", permanent: true },
      { source: "/pet-friendly", destination: "/the-park", permanent: true },
      { source: "/organic-farm", destination: "/our-story/the-wider-farm", permanent: true },
      { source: "/sustainability", destination: "/our-story", permanent: true },
      { source: "/about", destination: "/our-story", permanent: true },
    ];
  },
};

export default nextConfig;
