export const uniqueId = (() => {
    function* uniqueIdGenerator(): Generator<number, void, unknown> {
        let id: number = Date.now();

        while (true) {
            yield id++;
        }
    }
    const gen: Generator<number, void, unknown> = uniqueIdGenerator();

    return (): number => gen.next().value as number;
})();
