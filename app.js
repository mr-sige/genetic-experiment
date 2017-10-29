'use strict';

const execute = () => {
    const target = 300;
    const populationCount = 100;
    const individualLength = 6;
    const max = 100;
    const min = 0;

    let population = createPopulation(populationCount, min, max, individualLength);

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

const createPopulation = (count, min, max, length) => {
    //console.log('Creating the population');
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(createIndividual(min, max, length));
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

// split population into future parents and rejects
const thisIsSparta = (population, target, spartaRatio = 0.2) => {
    let pop = population.slice(0);
    pop.sort((a, b) => {
        const fitA = fitnessOfIndividual(a, target);
        const fitB = fitnessOfIndividual(b, target);
        return fitA - fitB;
    });

    const retainCount = Math.round(pop.length * spartaRatio);
    let parents = pop.slice(0, retainCount);
    let rejects = pop.slice(retainCount);
    return {'parents': parents, 'rejects': rejects};
};

const selectSurvivors = (rejects, survivingRatio = 0.1) => {
    let n = Math.round(rejects.length * survivingRatio);
    const arr = rejects.slice(0);

    let result = new Array(n),
        len = arr.length,
        taken = new Array(len);
    if (n > len)
        console.log('getRandom: more elements taken than available');
    while (n--) {
        var x = Math.floor(Math.random() * len);
        result[n] = arr[x in taken ? taken[x] : x];
        taken[x] = --len;
    }
    return result;

};

const mutateIndividual = (individual) => {
    let mutant = individual.slice(0);
    const positionToMutate = getRandom(0, mutant.length);
    mutant[positionToMutate] = getRandom(Math.min(...mutant), Math.max(...mutant));
    return mutant;
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

const breed = (parents, originalPopulationCount) => {
    const parentsCount = parents.length;
    const desiredChildrenCount = originalPopulationCount - parentsCount;
    let children = [];

    while(children.length < desiredChildrenCount){
        const maleIndex = getRandom(0, parentsCount - 1);
        const femaleIndex = getRandom(0, parentsCount - 1);
        if (maleIndex != femaleIndex) {
            const male = parents[maleIndex];
            const female = parents[femaleIndex];
            const half = male.length / 2;
            const child = male.slice(0, half - 1).concat(female.slice(half));
            children.push(child);
        }
    }
    return parents.concat(children);
};

module.exports = {
    getRandom,
    createIndividual,
    fitnessOfIndividual,
    fitnessOfPopulation,
    createPopulation,
    mutatePopulation,
    thisIsSparta,
    selectSurvivors,
    breed
};