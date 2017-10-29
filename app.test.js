/* eslint-disable no-undef */
'use strict';

const app = require('./app');

test('test getRandom', () => {
    for (let i=0; i < 100; i++){
        const random = app.getRandom(0,20);
        expect(random).toBeGreaterThanOrEqual(0);
        expect(random).toBeLessThanOrEqual(20);
    }
});

test('test createIndividual', () => {
    const min = 0;
    const max = 100;
    const length = 10;
    const individual = app.createIndividual(min, max, length);
    expect(individual.length).toEqual(length);
    expect(Math.max(...individual)).toBeLessThanOrEqual(max);
    expect(Math.min(...individual)).toBeGreaterThanOrEqual(min);
});

test('test createPopulation', () => {
    const min = 0;
    const max = 100;
    const length = 10;
    const count = 100;
    const population = app.createPopulation(count, min, max, length);
    const individual = population[Math.floor(count * 2 / 3)];
    expect(population.length).toEqual(count);
    expect(individual.length).toEqual(length);
    expect(Math.max(...individual)).toBeLessThanOrEqual(max);
    expect(Math.min(...individual)).toBeGreaterThanOrEqual(min);
});

test('test fitness of weak individual 1', () => {
    const individual = [10, 10, 10, 10, 10, 10];
    const target = 100;
    const fitness = app.fitnessOfIndividual(individual, target);
    expect(fitness).toEqual(40);
});

test('test fitness of week individual 2', () => {
    const individual = [30, 30, 10, 30, 90, 10];
    const target = 100;
    const fitness = app.fitnessOfIndividual(individual, target);
    expect(fitness).toEqual(100);
});

test('test fitness of perfect individual', () => {
    const individual = [30, 30, 10, 10, 10, 10];
    const target = 100;
    const fitness = app.fitnessOfIndividual(individual, target);
    expect(fitness).toEqual(0);
});

test('test fitness of special individual 1', () => {
    const individual = [0];
    const target = 100;
    const fitness = app.fitnessOfIndividual(individual, target);
    expect(fitness).toEqual(100);
});

test('test fitness of special individual 2', () => {
    const individual = [100];
    const target = 100;
    const fitness = app.fitnessOfIndividual(individual, target);
    expect(fitness).toEqual(0);
});

test('test fitnessOfPopulation', () => {
    const population = [
        [10, 10, 10, 10, 10, 10], //40
        [30, 30, 10, 30, 90, 10], //100
        [30, 30, 10, 10, 10, 10]  //0
    ];
    const target = 100;
    const fitness = app.fitnessOfPopulation(population, target);
    expect(fitness).toEqual(47);
});

test('test mutate', () => {
    const parents = [
        [30, 30, 10, 30, 90, 10],
        [30, 30, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10],
        [30, 30, 10, 30, 90, 10],
        [30, 30, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10],
        [30, 30, 10, 30, 90, 10],
        [30, 30, 10, 10, 10, 10],
        [10, 10, 10, 10, 10, 10],
        [30, 30, 10, 30, 90, 10]
    ];
    const mutants = app.mutatePopulation(parents, 1);
    expect(mutants.length).toEqual(10);
    expect(mutants[0].length).toEqual(6);
    expect(mutants[9].length).toEqual(6);
    const fitnessParents = app.fitnessOfPopulation(parents, 100);
    const fitnessMutants = app.fitnessOfPopulation(mutants, 100);
    expect(fitnessParents).not.toEqual(fitnessMutants);
});





















