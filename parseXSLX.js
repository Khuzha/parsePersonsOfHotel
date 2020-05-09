const readExcel = require('read-excel-file/node')
fs = require('fs')

const arrOfRegina = [
	'08', '10', '11', '11а', '11б', '12',
	'13а', '13б', '14', '15', '16', '17',
	'18', '19а', '19б', '20', '22', '24', '26'
]

const parseTable = async (table) => {
	try {
		const persons = await readExcel(table) // считываем таблицу
	
		// Создаем папки этажей:
		for (let i = 1; i <= 5; i++) {
			if (!fs.existsSync(`floor_${i}`)) {
				fs.mkdirSync(`floor_${i}`)
			}
			if (!fs.existsSync(`floor_${i}_regina`)) {
				fs.mkdirSync(`floor_${i}_regina`)
			}
		}
		
		// создаем папки людей в папках:

		for (const person of persons) {
			console.log(person)
			const room = person[0].toString()
			const name = person[1]
			let fold = `floor_${room.charAt(0)}`
			if (arrOfRegina.includes((+room.substr(0, 3) % 100).toString())) {
				fold += '_regina'
			}

			if (
				typeof name == 'string' &&
				!fs.existsSync(`${fold}/${name}`)
			) {
				fs.mkdirSync(`${fold}/${name}`)
			}
		}
	} catch (err) {
		console.log(err)
	}
}

parseTable('./hostel.xlsx') // название таблицы
