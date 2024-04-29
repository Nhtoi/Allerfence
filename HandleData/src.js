const fs = require('fs')
const { parse } = require('csv-parse')

function readCSVFile(filePath) {
    return new Promise((resolve, reject) => {
        const results = []
        fs.createReadStream(filePath)
            .pipe(parse({ columns: true }))
            .on('data', (row) => {
                const food = row.Food
                const allergy = row.Allergy

                // Add food and allergy to results array
                results.push({ food, allergy })
            })
            .on('end', () => resolve(results))
            .on('error', (err) => reject(err))
    })
}

function createAllergyMapping(data) {
    const allergyMap = {}

    // Iterate over the data array
    data.forEach(item => {
        const { food, allergy } = item
        
        // If allergy is not in the map, add it with an empty Set
        if (!allergyMap[allergy]) {
            allergyMap[allergy] = new Set()
        }

        // Add the food to the Set for the allergy
        allergyMap[allergy].add(food)
    })

    // Convert each Set to an array and return the map
    Object.keys(allergyMap).forEach(allergy => {
        allergyMap[allergy] = Array.from(allergyMap[allergy])
    })

    return allergyMap
}
// Function to get a list of all unique allergies
function getAllergiesList(allergyMap) {
    return Object.keys(allergyMap);
}
const filePath = './Data/FoodData.csv'

// Read the CSV file and create the allergy mapping
readCSVFile(filePath)
    .then(data => {
        const allergyMapping = createAllergyMapping(data)
        console.log(allergyMapping)
    })
    .catch(err => console.error('Error reading CSV file:', err))

module.exports = {createAllergyMapping, readCSVFile, getAllergiesList}
