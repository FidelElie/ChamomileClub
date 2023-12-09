// ! Next and React
import { useEffect, useState } from "react";

// ! Library
import {
	RedDiceOne,
	RedDiceTwo,
	RedDiceThree,
	RedDiceFour,
	RedDiceFive,
	RedDiceSix,
} from "@chamomileclub/casinojs";

const faces = [RedDiceOne, RedDiceTwo, RedDiceThree, RedDiceFour, RedDiceFive, RedDiceSix]

const BlindCalculator = () => {
	const [currentFace, setCurrentFace] = useState(0);

	const ChosenFace = faces[currentFace];

	const rollDice = () => {
		let roll = Math.floor(Math.random() * 6);

		while (roll === currentFace) { roll = Math.floor(Math.random() * 6); }

		setCurrentFace(roll);
	}

	useEffect(() => {setCurrentFace(Math.floor(Math.random() * 6))}, [])

	return (
		<div className="flex flex-col space-y-3 items items-center justify-center md:flex-row md:space-y-0">
			<p className="text-gray-100 text-xl font-light select-none"><span className="underline cursor-pointer" onClick={rollDice}>Roll</span> a </p> <ChosenFace onClick={rollDice} className="mx-5 h-16 w-16 rounded-md shadow-lg cursor-pointer" /> <p className="text-gray-100 text-xl font-light select-none"> the blind { currentFace === 0 ? "stays the same" : `is multiplied by ${currentFace + 1}`}.</p>
		</div>
	)
}

export default BlindCalculator;
