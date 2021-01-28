import React from 'react'
import './App.css'
import { Card, CardContent, CardMedia, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import Form from './Form'

const useStyles = makeStyles({
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		gap: 24,
	},
	media: {
		maxWidth: 400,
		height: 150,
	},
})

function App() {
	const classes = useStyles()
	return (
		<div className='App'>
			<Card
				className='Root'
				style={{ backgroundColor: 'rgba(255, 255, 255, 0.85)' }}>
				<CardMedia
					className={classes.media}
					image='https://www.nationsonline.org/gallery/World/currencies.jpg'
				/>
				<CardContent>
					<Typography gutterBottom variant='h4'>
						Currency Converter
					</Typography>
					<Typography variant='h5' color='textSecondary' component='p'>
						Convert currency for <b>GBP</b>, <b>USD</b>, <b>AUD</b> and{' '}
						<b>EUR</b>
					</Typography>
					<br />
					<Form className={classes.form} />
				</CardContent>
			</Card>
		</div>
	)
}

export default App
