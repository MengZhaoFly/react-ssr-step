import React, { Component } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter, Route } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

export const render = (req, store, routes) => {
  const App = (
    <Provider store={store}>
      <StaticRouter location={req.path} context={{}}>
        <div>
          {renderRoutes(routes)}
        </div>
      </StaticRouter>
    </Provider>
  )
  console.log('App------', App, 'req.path:', req.path);
  const content = renderToString(App);
  console.log('content------', content);
  return `
			<html>
        <head>
        <title>title</title>
				</head>
				<body>
					<div id="root">${content}</div>
					<script>
						window.context = {
							state: ${JSON.stringify(store.getState())}
						}
					</script>
					<script src='/index.js'></script>
				</body>
			</html>
	  `;

}