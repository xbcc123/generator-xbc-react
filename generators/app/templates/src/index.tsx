import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducers from './store/reducers/index';
import App from './App.tsx';
import { ConfigProvider } from 'antd';

import zhCN from 'antd/es/locale/zh_CN';

let store = createStore(reducers);

// locale={zhCN}
ReactDOM.render(
	<ConfigProvider locale={zhCN}>
		<Provider store={store}>
			<App /> 
		</Provider>
	</ConfigProvider>,
	document.getElementById('root')
);
