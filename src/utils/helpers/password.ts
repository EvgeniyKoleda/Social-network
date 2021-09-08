const AVAILABLE_CHARACTERS =
	'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_/.-';
const CHARACTERS_LENGTH = AVAILABLE_CHARACTERS.length;

export const generatePassword = (length: number) => {
	let result = '';

	for (let i = 0; i < length; i++) {
		result += AVAILABLE_CHARACTERS.charAt(
			Math.floor(Math.random() * CHARACTERS_LENGTH),
		);
	}

	return result;
};
