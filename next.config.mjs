/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com',
            port: '',
            //pathname: '/account123/**',
          },
        ],
      },
      /*webpack: (
        config,
        { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
      ) => {
        //Below is from: https://www.reddit.com/r/nextjs/comments/1hu7j67/people_who_are_using_nextjs_with_css_modules_and/
        //doesn't seem to help
        /*config.plugins = [
          ...(config.plugins ?? []),
          new webpack.BannerPlugin({
            banner: '@layer reset, pallete, layout, components, overrides;',
            test: /\.s?css$/,
            raw: true,
            entryOnly: false,
          }),
        ];*//*
        // Important: return the modified config
        //console.log('does the webpack part of config fire during error?')
        //console.log(JSON.stringify(defaultLoaders, null, 2));
        return config
      },*/
};

export default nextConfig;
