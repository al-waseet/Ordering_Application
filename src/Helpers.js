const Hexadecimal_to_Decimal_Conversion_Table =
{
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"A": 10,
	"B": 11,
	"C": 12,
	"D": 13,
	"E": 14,
	"F": 15
}

export const Convert_HEX_to_RGB = (Hexadecimal_Color_Code) => (Hexadecimal_to_Decimal_Conversion_Table [Hexadecimal_Color_Code [1]] * 16 + Hexadecimal_to_Decimal_Conversion_Table [Hexadecimal_Color_Code [2]]) + ', ' + (Hexadecimal_to_Decimal_Conversion_Table [Hexadecimal_Color_Code [3]] * 16 + Hexadecimal_to_Decimal_Conversion_Table [Hexadecimal_Color_Code [4]]) + ', ' + (Hexadecimal_to_Decimal_Conversion_Table [Hexadecimal_Color_Code [5]] * 16 + Hexadecimal_to_Decimal_Conversion_Table [Hexadecimal_Color_Code [6]]);