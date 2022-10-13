import { Provider } from 'react-redux';

import App from './App';
import store from './data/store';

export default function ProviderWrapper() {
	return (
		<Provider store={store}>
			<App />
		</Provider>
	);
}
