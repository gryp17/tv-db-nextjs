import AppHeader from '@/components/AppHeader';
import ContentWrapper from '@/components/ContentWrapper';

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<main>
			<AppHeader />
			<ContentWrapper>{children}</ContentWrapper>
		</main>
	);
}
