'use strict';

const execute = () => {
    const target = 300;
    const populationCount = 100;
    const individualLength = 6;
    const max = 100;
    const min = 0;
    const spartaRatio = 0.3;
    const survivingRatio = 0.01;
    const mutation = 1;
    const iterations = 1000;

    //create population
    let population = createPopulation(populationCount, min, max, individualLength);

    for (let generationCounter = 0; generationCounter < iterations; generationCounter++){
        //select the best
        const sparta = thisIsSparta(population, target, spartaRatio);
        const parents = sparta.parents;
        const rejects = sparta.rejects;

        //select some from rejects and add them to parents to assure genetic diversity
        const survivors = selectSurvivors(rejects, survivingRatio);
        const newParents = parents.concat(survivors);

        //create new generation
        population = breed(newParents, populationCount);

        //mutate new generation
        population = mutatePopulation(population, mutation);

        //measure fitness of new generation
        const fitnessOfNewGeneration = fitnessOfPopulation(population, target);
        console.log('Generation: ' + generationCounter + ' Fitness: ' + fitnessOfNewGeneration);
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

const createPopulation = (count, min, max, length) => {
    //console.log('Creating the population');
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(createIndividual(min, max, length));
    }
    return arr;
};

const fitnessOfIndividual = (individual, target) => {
    if(!individual){
        console.log('sige');
    }
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
const thisIsSparta = (population, target, spartaRatio) => {
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

const selectSurvivors = (rejects, survivingRatio) => {
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
    const positionToMutate = getRandom(0, mutant.length-1);
    mutant[positionToMutate] = getRandom(Math.min(...mutant), Math.max(...mutant));
    return mutant;
};

const mutatePopulation = (population, mutation) => {
    let pop = population.map((individual) => {
        if (getRandom(0, 100) < mutation * 100) {
            return mutateIndividual(individual);
        }
    });
    return pop;
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

//execute();