'use strict';

const getRandom = (min, max) => {
    if(typeof min !== 'number' || typeof max !== 'number'){
        throw new Error('Invalid parameter in getRandom!');
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createIndividual = (min, max, length) => {
    if(typeof min !== 'number' || typeof max !== 'number' || length <= 0){
        throw new Error('Parameter missing in createIndividual!');
    }
    let arr = [];
    for (let i = 0; i < length; i++) {
        arr.push(getRandom(min, max));
    }
    return arr;
};

const createPopulation = (count, min, max, length) => {
    if(count <= 0 || typeof min !== 'number' || typeof max !== 'number' || length <= 0){
        throw new Error('Parameter missing in createPopulation!');
    }
    let arr = [];
    for (let i = 0; i < count; i++) {
        arr.push(createIndividual(min, max, length));
    }
    return arr;
};

const fitnessOfIndividual = (individual, target) => {
    if(!individual || !target){
        throw new Error('Parameter missing in fitnessOfIndividual!');
    }
    if(individual.length === 0){
        throw new Error('Empty array passed to fitnessOfIndividual');
    }
    const sumFitnessOfIndividual = individual.reduce((sum, value) => {
        return sum + value;
    });
    return Math.abs(target - sumFitnessOfIndividual);
};

const fitnessOfPopulation = (population, target) => {
    if(!population || !target){
        throw new Error('Parameter missing in fitnessOfPopulation!');
    }
    let sum = 0;
    population.forEach((individual) => {
        sum += fitnessOfIndividual(individual, target);
    });
    return Math.round(sum / population.length);
};

// split population into future parents and rejects
const thisIsSparta = (population, target, spartaRatio) => {
    if(!population || !target || !spartaRatio){
        throw new Error('Parameter missing in thisIsSparta!');
    }
    let pop = population.slice(0);
    pop.sort((a, b) => {
        const fitA = fitnessOfIndividual(a, target);
        const fitB = fitnessOfIndividual(b, target);
        return fitA - fitB;
    });

    const retainCount = Math.round(pop.length * spartaRatio);
    let parents = pop.slice(0, retainCount);
    let rejects = pop.slice(retainCount);
    return { 'parents': parents, 'rejects': rejects };
};

const selectSurvivors = (rejects, survivingRatio) => {
    if(!rejects || !survivingRatio){
        throw new Error('Parameter missing in selectSurvivors!');
    }
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
    if(!individual){
        throw new Error('Parameter missing in mutateIndividual!');
    }
    let mutant = individual.slice(0);
    const positionToMutate = getRandom(0, mutant.length - 1);
    mutant[positionToMutate] = getRandom(Math.min(...mutant), Math.max(...mutant));
    return mutant;
};

const mutatePopulation = (population, mutation) => {
    if(!population || !mutation){
        throw new Error('Parameter missing in mutatePopulation!');
    }
    let pop = population.map((individual) => {
        if (getRandom(0, 100) <= mutation * 100) {
            return mutateIndividual(individual);
        }
        return individual;
    });
    return pop;
};

const breed = (parents, originalPopulationCount) => {
    if(!parents || !originalPopulationCount){
        throw new Error('Parameter missing in breed!');
    }
    const parentsCount = parents.length;
    const desiredChildrenCount = originalPopulationCount - parentsCount;
    let children = [];

    while (children.length < desiredChildrenCount) {
        const maleIndex = getRandom(0, parentsCount - 1);
        const femaleIndex = getRandom(0, parentsCount - 1);
        if (maleIndex != femaleIndex) {
            const male = parents[maleIndex];
            const female = parents[femaleIndex];
            const half = male.length / 2;
            const child = male.slice(0, half).concat(female.slice(half));
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
    breed,
    mutateIndividual
};