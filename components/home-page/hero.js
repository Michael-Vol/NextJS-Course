import classes from './hero.module.css';

import Image from 'next/image';

function Hero() {
	return (
		<section className={classes.hero}>
			<div className={classes.image}>
				<Image
					src='/images/site/michael.png'
					alt='An image showing Michael'
					width={300}
					height={300}
				/>
			</div>
			<h1>Hi, I'm Michael</h1>
			<p>I write about Front End & Back End Web Development Frameworks</p>
		</section>
	);
}

export default Hero;
