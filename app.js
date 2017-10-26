'use strict';

const execute = () => {
    const target = 20;
    const populationCount = 100;
    const individualLength = 4;
    const max = 9;
    const min = 0;

    let population = createPopulation(populationCount, min, max, individualLength);
    let populationFitness = gradePopulation(population, target);
    const fittnessHistory = [populationFitness];

    for (let i=0; i<100; i++){
        population = evolve(population, target);
        cosole.log(population);
        populationFitness = gradePopulation(population, target);
        fittnessHistory.push(populationFitness);
    }
}

const getRandom = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const createIndividual = (min, max, length) => {
    //console.log("Creating a member of the population");
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
        arr.push(createIndividual(min, max, lenght))
    }
    return arr;
};

const fittnessOfIndividual = (individual, target) => {
    const sumFittnessOfIndividual = individual.reduce((sum, value) => {
        return sum + value;
    });
    return Math.abs(target - sumFittnessOfIndividual);
};

const gradePopulation = (population, target) => {
    let sum = 0;
    population.forEach((individual) => {
        sum += fittnessOfIndividual(individual, target);
    });
    return sum / population.length;
};

const evolve = (population, target, retain = 0.2, randomSelect = 0.1, mutate = 0.1) => {
    const populationOriginalCount = population.length;
    //select the parents
    population.sort((a, b) => {
        return fittnessOfIndividual(a) - fittnessOfIndividual(b);
    });
    const retainLength = Math.round(population.length * retain);
    let parents = population.slice(0, retainLength);
    population = population.slice(retainLength);
    // randomly add individuals to the parents to have genetic diversity
    population.forEach((individual) => {
        if (getRandom(0, 100) < randomSelect * 100) {
            parents.push(individual);
        }
    });

    // mutate the parents
    parents = parents.map((parent) => {
        if (getRandom(0, 100) < mutate * 100) {
            const positionToMutate = getRandom(0, parent.length);
            parent[positionToMutate] = getRandom(Math.min(...parent), Math.max(...parent));
        }
        return parent;
    });

    // create children from parents
    const parentsCount = parents.length;
    const desiredChildrenCount = populationOriginalCount - parentsCount;
    let children = [];

    for (; children.length < desiredChildrenCount;) {
        const maleIndex = getRandom(0, parentsCount - 1);
        const femaleIndex = getRandom(0, parentsCount - 1);
        if (maleIndex != femaleIndex) {
            const male = parents[maleIndex];
            const female = parents[femaleIndex];
            const half = male.length / 2;
            const child = male.slice(0, half-1).concat(female.slice(half));
            children.push(child);
        }
    }
    return parents.concat(children);
};

execute();