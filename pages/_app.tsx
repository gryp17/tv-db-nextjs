import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { Roboto } from 'next/font/google';
import { toastConfig } from 'react-simple-toasts';
import 'react-simple-toasts/dist/theme/failure.css';
import { config } from '@fortawesome/fontawesome-svg-core';

// this needs to be imported manually otherwise the icons style "flashes" for some reason
config.autoAddCss = false;
import '@fortawesome/fontawesome-svg-core/styles.css';
import Layout from '@/components/layout/Layout';

const roboto = Roboto({ weight: '400', subsets: ['latin'] });
toastConfig({ theme: 'failure', position: 'bottom-right' });

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			{/*
				setting the font family for the whole app,
				ther other way using className will only apply it to the layout and not the whole body/html
			*/}
			<style jsx global>{`
				html {
					font-family: ${roboto.style.fontFamily};
				}
			`}</style>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	);
}
