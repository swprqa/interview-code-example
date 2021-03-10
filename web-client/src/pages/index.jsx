import React from 'react';

import Head from 'next/head';
import Link from 'next/link';

const Home = () => {
	return (
		<div>
			<Head>
				<title>Create Next App</title>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
				<meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
			</Head>

			<main>
				<Link href="/users">Users</Link>
				Home page
			</main>
		</div>
	);
};

export default Home;
