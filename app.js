'use strict';

const execute = () => {
    const target = 300;
    const populationCount = 100;
    const individualLength = 6;
    const max = 100;
    const min = 0;

    let population = createPopulation(populationCount, min, max, individualLength);
    let populationFitness = fitnessOfPopulation(population, target);
    const fittnessHistory = [populationFitness];

    for (let i = 0; i < 100; i++) {
        population = evolve(population, target);
        populationFitness = fitnessOfPopulation(population, target);
        fittnessHistory.push(populationFitness);
    }
};

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createIndividual = (min, max, length) => {
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(getRandom(min, max));
    }
    return arr;
};

const createPopulation = (count, min, max, lenght) => {
    //console.log('Creating the population');
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(createIndividual(min, max, lenght));
    }
    return arr;
};

const fitnessOfIndividual = (individual, target) => {
    const sumFitnessOfIndividual = individual.reduce((sum, value) => {
        return sum + value;
    });
    return Math.abs(target - sumFitnessOfIndividual);
};

const fitnessOfPopulation = (population, target) => {
    let sum = 0;
    population.forEach((individual) => {
        sum += fitnessOfIndividual(individual, target);
    });
    return Math.round(sum / population.length);
};

const selectParents = (population, retain = 0.2) => {
    population.sort((a, b) => {
        return fitnessOfIndividual(a) - fitnessOfIndividual(b);
    });

    const retainCount = Math.round(population.length * retain);
    let parents = population.slice(0, retainCount);
    let rejects = population.slice(retainCount);
    return {'parents': parents, 'rejects': rejects};
};

const selectSurvivors = (rejects, randomSelect = 0.1) => {
    let survivors = [];
    rejects.forEach((individual) => {
        if (getRandom(0, 100) < randomSelect * 100) {
            survivors.push(individual);
        }
    });
    return survivors;
};

const mutateIndividual = (individual) => {
    const positionToMutate = getRandom(0, individual.length);
    individual[positionToMutate] = getRandom(Math.min(...individual), Math.max(...individual));
    return individual;
};

const mutatePopulation = (population, mutation = 0.1) => {
    let mutants = [];
    population.forEach((individual) => {
        let mutant = individual;
        if (getRandom(0, 100) < mutation * 100) {
            mutant = mutateIndividual(individual);
        }
        mutants.push(mutant);
    });
    return mutants;
};


// const evolve = (population, target, mutate = 0.1) => {
//     const populationOriginalCount = population.length;
//
//     // mutate the parents
//
//
//     // create children from parents
//     const parentsCount = parents.length;
//     const desiredChildrenCount = populationOriginalCount - parentsCount;
//     let children = [];
//
//     for (; children.length < desiredChildrenCount;) {
//         const maleIndex = getRandom(0, parentsCount - 1);
//         const femaleIndex = getRandom(0, parentsCount - 1);
//         if (maleIndex != femaleIndex) {
//             const male = parents[maleIndex];
//             const female = parents[femaleIndex];
//             const half = male.length / 2;
//             const child = male.slice(0, half - 1).concat(female.slice(half));
//             children.push(child);
//         }
//     }
//     return parents.concat(children);
// };
module.exports = {
    getRandom,
    createIndividual,
    fitnessOfIndividual,
    fitnessOfPopulation,
    createPopulation,
    mutatePopulation
};