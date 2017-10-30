/* eslint-disable no-undef */
'use strict';

const app = require('./app');

test('test getRandom', () => {
    for (let i = 0; i < 100; i++) {
        const random = app.getRandom(0, 20);
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

test('test mutatePopulation', () => {
    const population = [
        [
            85,
            21,
            89,
            62,
            87,
            52
        ],
        [
            79,
            25,
            36,
            89,
            40,
            15
        ],
        [
            0,
            83,
            3,
            99,
            7,
            21
        ],
        [
            78,
            93,
            29,
            80,
            6,
            73
        ],
        [
            50,
            99,
            13,
            33,
            24,
            85
        ],
        [
            44,
            92,
            93,
            53,
            8,
            56
        ],
        [
            9,
            37,
            99,
            4,
            26,
            2
        ],
        [
            40,
            8,
            72,
            33,
            61,
            10
        ],
        [
            4,
            76,
            24,
            54,
            82,
            83
        ],
        [
            58,
            16,
            94,
            0,
            14,
            57
        ],
        [
            7,
            33,
            46,
            63,
            22,
            58
        ],
        [
            52,
            21,
            59,
            41,
            24,
            55
        ],
        [
            42,
            95,
            100,
            62,
            6,
            50
        ],
        [
            11,
            35,
            57,
            5,
            31,
            31
        ],
        [
            17,
            64,
            36,
            68,
            79,
            72
        ],
        [
            58,
            80,
            98,
            54,
            39,
            35
        ],
        [
            23,
            2,
            83,
            62,
            77,
            21
        ],
        [
            59,
            69,
            71,
            13,
            92,
            86
        ],
        [
            89,
            72,
            68,
            33,
            27,
            81
        ],
        [
            80,
            24,
            77,
            18,
            22,
            38
        ],
        [
            51,
            5,
            34,
            59,
            62,
            56
        ],
        [
            33,
            52,
            19,
            30,
            58,
            38
        ],
        [
            77,
            28,
            31,
            0,
            31,
            5
        ],
        [
            46,
            3,
            63,
            44,
            66,
            34
        ],
        [
            56,
            89,
            67,
            2,
            10,
            63
        ],
        [
            78,
            32,
            9,
            24,
            27,
            29
        ],
        [
            79,
            32,
            73,
            33,
            34,
            41
        ],
        [
            2,
            95,
            77,
            59,
            49,
            32
        ],
        [
            37,
            89,
            35,
            96,
            33,
            37
        ],
        [
            72,
            1,
            69,
            54,
            38,
            65
        ],
        [
            59,
            16,
            89,
            93,
            34,
            74
        ],
        [
            83,
            49,
            28,
            9,
            6,
            72
        ],
        [
            97,
            64,
            85,
            88,
            3,
            24
        ],
        [
            27,
            61,
            50,
            31,
            22,
            28
        ],
        [
            4,
            35,
            62,
            92,
            41,
            87
        ],
        [
            93,
            61,
            23,
            29,
            23,
            14
        ],
        [
            41,
            89,
            21,
            54,
            100,
            83
        ],
        [
            44,
            59,
            42,
            19,
            73,
            68
        ],
        [
            22,
            74,
            9,
            51,
            69,
            6
        ],
        [
            43,
            60,
            95,
            49,
            63,
            41
        ],
        [
            72,
            83,
            7,
            16,
            81,
            76
        ],
        [
            93,
            2,
            37,
            58,
            94,
            52
        ],
        [
            90,
            20,
            70,
            40,
            7,
            72
        ],
        [
            87,
            19,
            79,
            58,
            84,
            64
        ],
        [
            32,
            29,
            65,
            91,
            18,
            70
        ],
        [
            21,
            7,
            7,
            69,
            5,
            61
        ],
        [
            62,
            56,
            91,
            59,
            83,
            60
        ],
        [
            51,
            63,
            14,
            41,
            80,
            98
        ],
        [
            38,
            12,
            43,
            14,
            8,
            29
        ],
        [
            11,
            53,
            34,
            57,
            57,
            89
        ],
        [
            48,
            10,
            99,
            55,
            63,
            12
        ],
        [
            74,
            32,
            74,
            8,
            84,
            12
        ],
        [
            29,
            22,
            10,
            66,
            44,
            61
        ],
        [
            76,
            40,
            46,
            17,
            16,
            79
        ],
        [
            97,
            2,
            28,
            59,
            27,
            9
        ],
        [
            98,
            78,
            64,
            22,
            46,
            96
        ],
        [
            54,
            93,
            88,
            62,
            53,
            23
        ],
        [
            70,
            96,
            5,
            6,
            66,
            64
        ],
        [
            38,
            46,
            85,
            83,
            52,
            78
        ],
        [
            55,
            73,
            31,
            96,
            16,
            11
        ],
        [
            57,
            53,
            48,
            7,
            70,
            22
        ],
        [
            73,
            23,
            51,
            94,
            32,
            40
        ],
        [
            49,
            97,
            12,
            16,
            28,
            30
        ],
        [
            72,
            53,
            72,
            28,
            23,
            64
        ],
        [
            0,
            73,
            49,
            64,
            25,
            7
        ],
        [
            0,
            100,
            76,
            91,
            29,
            55
        ],
        [
            88,
            40,
            98,
            30,
            61,
            85
        ],
        [
            89,
            17,
            50,
            96,
            75,
            95
        ],
        [
            93,
            77,
            70,
            19,
            76,
            99
        ],
        [
            77,
            60,
            39,
            98,
            84,
            60
        ],
        [
            7,
            56,
            0,
            42,
            59,
            68
        ],
        [
            55,
            71,
            56,
            44,
            36,
            17
        ],
        [
            19,
            98,
            79,
            41,
            29,
            63
        ],
        [
            82,
            80,
            100,
            21,
            31,
            14
        ],
        [
            20,
            91,
            56,
            35,
            4,
            93
        ],
        [
            56,
            73,
            83,
            43,
            60,
            87
        ],
        [
            14,
            12,
            94,
            46,
            55,
            21
        ],
        [
            60,
            91,
            34,
            64,
            28,
            67
        ],
        [
            53,
            86,
            10,
            39,
            48,
            9
        ],
        [
            56,
            81,
            46,
            18,
            36,
            63
        ],
        [
            54,
            37,
            69,
            92,
            76,
            51
        ],
        [
            74,
            47,
            72,
            63,
            12,
            88
        ],
        [
            60,
            75,
            87,
            17,
            49,
            30
        ],
        [
            60,
            76,
            22,
            30,
            87,
            76
        ],
        [
            56,
            63,
            44,
            87,
            17,
            17
        ],
        [
            93,
            93,
            24,
            57,
            31,
            13
        ],
        [
            31,
            63,
            36,
            80,
            68,
            36
        ],
        [
            15,
            66,
            79,
            61,
            100,
            12
        ],
        [
            80,
            91,
            77,
            49,
            54,
            22
        ],
        [
            85,
            30,
            62,
            1,
            34,
            75
        ],
        [
            38,
            64,
            99,
            57,
            7,
            11
        ],
        [
            15,
            14,
            39,
            59,
            62,
            51
        ],
        [
            68,
            5,
            83,
            6,
            83,
            75
        ],
        [
            28,
            2,
            62,
            77,
            48,
            26
        ],
        [
            87,
            10,
            44,
            60,
            3,
            8
        ],
        [
            37,
            33,
            10,
            18,
            92,
            75
        ],
        [
            8,
            35,
            49,
            2,
            100,
            63
        ],
        [
            16,
            87,
            71,
            83,
            47,
            71
        ],
        [
            8,
            7,
            68,
            98,
            1,
            51
        ],
        [
            89,
            50,
            85,
            72,
            50,
            76
        ]
    ];
    const fitnessParents = app.fitnessOfPopulation(population, 100);
    const mutants = app.mutatePopulation(population, 1);
    expect(mutants.length).toEqual(100);
    expect(mutants[0].length).toEqual(6);
    expect(mutants[9].length).toEqual(6);
    const fitnessParentsAfterMutation = app.fitnessOfPopulation(population, 100);
    expect(fitnessParentsAfterMutation).toEqual(fitnessParents);
    const fitnessMutants = app.fitnessOfPopulation(mutants, 100);
    expect(fitnessParents).not.toEqual(fitnessMutants);
});

test('test thisIsSparta', () => {
    const population = [
        [10, 10, 10, 10, 10, 10], //40
        [30, 30, 10, 30, 90, 10], //100
        [30, 30, 10, 10, 10, 10]  //0
    ];
    const sparta = app.thisIsSparta(population, 100, 0.2);
    expect(sparta.parents.length).toEqual(1);
    expect(sparta.parents[0]).toEqual(population[2]);
    expect(sparta.rejects.length).toEqual(2);
});

test('test selectSurvivors', () => {
    const rejects = [
        [10, 10, 10, 10, 10, 10],
        [30, 30, 10, 30, 90, 10],
        [30, 30, 10, 30, 50, 10],
        [10, 10, 10, 10, 10, 10],
        [30, 30, 10, 30, 90, 10],
        [30, 30, 10, 30, 50, 10]
    ];
    const survivors = app.selectSurvivors(rejects, 0.3);
    expect(survivors.length).toEqual(2);
});

test('test breed', () => {
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
    const populationCount = 50;
    const newGeneration = app.breed(parents, populationCount);
    expect(newGeneration.length).toEqual(populationCount);
});




















