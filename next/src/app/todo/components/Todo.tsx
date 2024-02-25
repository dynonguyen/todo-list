'use client';

import React from 'react';

export const Todo = () => {
	React.useEffect(() => {
		console.log('Ahihi');
	}, []);

	return <div>Hello todo nè má</div>;
};

export default Todo;
