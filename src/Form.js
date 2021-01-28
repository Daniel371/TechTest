import React, { useState, useRef } from 'react'
import axios from 'axios'
import {
	Button,
	Dialog,
	DialogContent,
	DialogTitle,
	FormControl,
	FormHelperText,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from '@material-ui/core'

// dropdown data
const data = [
	{
		currency: 'GBP',
		symbol: '£',
	},
	{
		currency: 'USD',
		symbol: '$',
	},
	{
		currency: 'AUD',
		rate: 1.2,
		symbol: 'A$',
	},
	{
		currency: 'EUR',
		symbol: '€',
	},
]

const rates = {
	'GBP/EUR': 1.13,
	'GBP/USD': 1.37,
	'GBP/AUD': 1.79,
	'EUR/USD': 1.21,
	'EUR/AUD': 1.58,
	'USD/AUD': 1.31,
}

// items for dropdowns
const menuItems = data.map((item, i) => (
	<MenuItem key={i} value={item}>
		{item.currency}
	</MenuItem>
))

const Form = props => {
	// APP STATE
	const [open, setOpen] = useState(false)
	const [inputs, setInputs] = useState({
		convertFrom: '',
		convertTo: '',
		amount: '',
	})
	const [error, setError] = useState('')
	const [total, setTotal] = useState(0)

	const rate = useRef(0)

	// EVENT HANDLERS
	const handleClose = () => {
		setOpen(false)
		setInputs({
			convertFrom: '',
			convertTo: '',
			amount: '',
		})
	}

	const handleInputChange = event => {
		setError('')
		setInputs({
			...inputs,
			[event.target.name]: event.target.value,
		})
	}

	const handleSubmit = event => {
		event.preventDefault()
		if (inputs.convertTo.currency === inputs.convertFrom.currency) {
			setError('Convert FROM and convert TO must be different ')
			return
		}

		// add currencies into array to make it easier to flip them round
		const from = inputs.convertFrom.currency
		const to = inputs.convertTo.currency
		let currencies = [from, to]
		rate.current = rates[currencies.join('/')]

		// if no rate is found, try keyt with currencies flipped over
		if (!rate.current) {
			rate.current = 1 / rates[currencies.reverse().join('/')]
		}

		setTotal((rate.current * inputs.amount).toFixed(2))
		setOpen(true)
	}

	return (
		<>
			<form {...props} onSubmit={handleSubmit}>
				<FormControl required variant='outlined'>
					<InputLabel id='convert-from-label'>FROM</InputLabel>
					<Select
						error={Boolean(error)}
						name='convertFrom'
						label='FROM'
						labelId='convert-from-label'
						onChange={handleInputChange}
						value={inputs.convertFrom}
						style={{ minWidth: 150 }}>
						{menuItems}
					</Select>
				</FormControl>

				<FormControl required variant='outlined'>
					<InputLabel id='convert-to-label'>TO</InputLabel>
					<Select
						error={Boolean(error)}
						name='convertTo'
						label='TO'
						labelId='convert-to-label'
						onChange={handleInputChange}
						value={inputs.convertTo}
						style={{ minWidth: 150 }}>
						{menuItems}
					</Select>
				</FormControl>

				<TextField
					error={Boolean(error)}
					onChange={handleInputChange}
					label='Amount'
					required
					name='amount'
					value={inputs.amount}
					variant='outlined'
					type='number'
					inputProps={{ min: 0.01, step: '0.01' }}
				/>
				{error && <FormHelperText error={true}>{error}</FormHelperText>}

				<Button color='primary' variant='contained' type='submit'>
					CONVERT
				</Button>
			</form>
			<Dialog onClose={handleClose} aria-labelledby='dialog-title' open={open}>
				<DialogTitle id='dialog-title' color='textSecondary'>
					{`Based on exchange rate of ${rate.current.toFixed(2)}, you will get`}
				</DialogTitle>
				<DialogContent>
					<Typography align='center' variant='h1'>
						{`${inputs.convertTo.symbol} ${total}`}
					</Typography>
					<br />
					<Button
						variant='outlined'
						fullWidth
						style={{ margin: '0  auto' }}
						onClick={handleClose}>
						Close
					</Button>
				</DialogContent>
			</Dialog>
		</>
	)
}

export default Form
