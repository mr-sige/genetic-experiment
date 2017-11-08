'use strict';

const genetic = require('./genetic');

const execute = () => {

    const populationCount = 1000;
    const individualLength = 50;

    const target = 1000;
    const max = 500;
    const min = 0;

    const spartaRatio = 0.1;
    const survivingRatio = 0.05;
    const mutation = 0.01;

    const maxIterations = 10000;
    //create population
    let population = genetic.createPopulation(populationCount, min, max, individualLength);

    for (let generationCounter = 0; generationCounter < maxIterations; generationCounter++) {
        //select the best
        const sparta = genetic.thisIsSparta(population, target, spartaRatio);
        const parents = sparta.parents;
        const rejects = sparta.rejects;

        //select some from rejects and add them to parents to assure genetic diversity
        const survivors = genetic.selectSurvivors(rejects, survivingRatio);
        const newParents = parents.concat(survivors);

        //create new generation
        population = genetic.breed(newParents, populationCount);

        //mutate new generation
        population = genetic.mutatePopulation(population, mutation);

        //measure fitness of new generation
        const fitnessOfNewGeneration = genetic.fitnessOfPopulation(population, target);
        console.log('Generation: ' + generationCounter + ' Fitness: ' + fitnessOfNewGeneration);

        if(fitnessOfNewGeneration === 0){
            generationCounter = maxIterations;
        }
    }
};

execute();